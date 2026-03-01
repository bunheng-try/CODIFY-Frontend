// hooks/useMemberQuery.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { memberApi, type Member, type AddMemberDto, type MemberRoleDto } from "../apis/member.api";

// Query keys
export const QUERY_KEYS = {
  MEMBERS: (classroomId: number) => ["members", classroomId] as const,
  MEMBER: (classroomId: number, memberId: number) => ["member", classroomId, memberId] as const,
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
    mutationFn: (dto: AddMemberDto) => {
      if (!classroomId) throw new Error("No classroom selected");
      return memberApi.addMember(classroomId, dto);
    },
    onSuccess: () => {
      if (!classroomId) return;
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.MEMBERS(classroomId)});
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
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.MEMBERS(classroomId)});
      queryClient.removeQueries({queryKey: QUERY_KEYS.MEMBER(classroomId, userId)});
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
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.MEMBERS(classroomId)});
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.MEMBER(classroomId, userId)});
    },
  });
};