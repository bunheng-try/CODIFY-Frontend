// hooks/useMemberQuery.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { memberApi, type Member, type MemberRoleDto, type AddMembersRequest, type UserFromApi } from "../apis/member.api";

// Query keys
export const QUERY_KEYS = {
  MEMBERS: (classroomId: number) => ["members", classroomId] as const,
  MEMBER: (classroomId: number, memberId: number) => ["member", classroomId, memberId] as const,
  USER_BY_EMAIL: (email: string) => ["userByEmail", email] as const,
};


// Get user by email
export const useUserByEmail = (email: string | null) => {
  return useQuery<UserFromApi[]>({
    queryKey: email ? QUERY_KEYS.USER_BY_EMAIL(email) : ["userByEmail", "none"],
    enabled: !!email, // only fetch if email exists
    queryFn: () => {
      if (!email) throw new Error("No email provided");
      return memberApi.getUserByEmail(email);
    },
  });
};

// Get all members
export const useMembers = (classroomId: number | null) =>
  useQuery<Member[]>({
    queryKey: classroomId ? QUERY_KEYS.MEMBERS(classroomId) : ["members", "none"],
    enabled: !!classroomId,
    queryFn: () => {
      if (!classroomId) throw new Error("No classroom selected");
      return memberApi.getMembers(classroomId);
    },
  });

// Add a member
export const useAddMember = (classroomId: number | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: AddMembersRequest) => {
      if (!classroomId) throw new Error("No classroom selected");
      return memberApi.addMember(classroomId, dto);
    },
    onSuccess: () => {
      if (!classroomId) return;
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MEMBERS(classroomId) });
    },
  });
};

// Remove a member
export const useRemoveMember = (classroomId: number | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: number) => {
      if (!classroomId) throw new Error("No classroom selected");
      return memberApi.removeMember(classroomId, userId);
    },
    onSuccess: (_, userId) => {
      if (!classroomId) return;
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MEMBERS(classroomId) });
      queryClient.removeQueries({ queryKey: QUERY_KEYS.MEMBER(classroomId, userId) });
    },
  });
};

// Change member role
export const useChangeMemberRole = (classroomId: number | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, dto }: { userId: number; dto: MemberRoleDto }) => {
      if (!classroomId) throw new Error("No classroom selected");
      return memberApi.changeRole(classroomId, userId, dto);
    },
    onSuccess: (_, { userId }) => {
      if (!classroomId) return;
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MEMBERS(classroomId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MEMBER(classroomId, userId) });
    },
  });
};

// Leave classroom
export const useLeaveClassroom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (classroomId: number) => {
      return memberApi.leaveClassroom(classroomId);
    },
    onSuccess: (_, classroomId) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MEMBERS(classroomId) });
    },
  });
};