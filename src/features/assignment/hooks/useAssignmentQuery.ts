import {useQuery ,useQueryClient,useMutation} from "@tanstack/react-query";
import { assignmentsApi, type Assignment, type CreateAssignmentDto, type UpdateAssignmentDto } from "../apis/assignment.api";
import { useNavigate } from "react-router-dom";

export const QUERY_KEYS = {
  ASSIGNMENTS: (classroomId: number) =>
    ["assignments", classroomId] as const,

  ASSIGNMENT: (classroomId: number, assignmentId: number) =>
    ["assignment", classroomId, assignmentId] as const,
  CHALLENGES: (assignmentId: number) =>
    ["challenges",assignmentId] as const
};


export const useAssignmentClassrooms = (classroomId: number | null) => {
  return useQuery<Assignment[]>({
    queryKey: classroomId
      ? QUERY_KEYS.ASSIGNMENTS(classroomId)
      : ["assignments", "none"],

    enabled: !!classroomId,

    queryFn: () => {
      if (!classroomId) throw new Error("No classroom selected");
      return assignmentsApi.getByClassroomId(classroomId);
    },
  });
};

export const useAssignment = (
  classroomId: number | null,
  assignmentId: number | null
) => {
  return useQuery<Assignment>({
    queryKey:
      classroomId && assignmentId
        ? QUERY_KEYS.ASSIGNMENT(classroomId, assignmentId)
        : ["assignment", "none"],

    enabled: !!classroomId && !!assignmentId,

    queryFn: () => {
      if (!classroomId || !assignmentId)
        throw new Error("Missing ids");

      return assignmentsApi.getById(classroomId, assignmentId);
    },
  });
};


export const usePublishAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      classroomId,
      assignmentId,
    }: {
      classroomId: number;
      assignmentId: number;
    }) =>
      assignmentsApi.publish(classroomId, assignmentId),

    onSuccess: (updatedAssignment: Assignment,) => {
      queryClient.setQueryData(
        QUERY_KEYS.ASSIGNMENT(
          updatedAssignment.classroomId,
          updatedAssignment.id
        ),
        updatedAssignment
      );

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ASSIGNMENTS(
          updatedAssignment.classroomId
        ),
      });
    },
  });
};

export const useUnPublishAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      classroomId,
      assignmentId,
    }: {
      classroomId: number;
      assignmentId: number;
    }) =>
      assignmentsApi.unPublish(classroomId, assignmentId),

    onSuccess: (updatedAssignment: Assignment) => {
      queryClient.setQueryData(
        QUERY_KEYS.ASSIGNMENT(
          updatedAssignment.classroomId,
          updatedAssignment.id
        ),
        updatedAssignment
      );

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ASSIGNMENTS(
          updatedAssignment.classroomId
        ),
      });
    },
  });
};

export const useCreateAssignment = (classroomId: number | null) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (dto: CreateAssignmentDto) => {
      if (!classroomId) throw new Error("No classroom selected");

      return assignmentsApi.create(classroomId, dto);
    },

    onSuccess: (newAssignment: Assignment) => {
      if (!classroomId) return;

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ASSIGNMENTS(classroomId),
      });

      navigate(
        `/classrooms/${classroomId}/assignments/${newAssignment.id}`,
        { state:{ autoFocusTitle: true } }
      );
    },
  });
};

export const useUpdateAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      classroomId,
      assignmentId,
      dto,
    }: {
      classroomId: number;
      assignmentId: number;
      dto: UpdateAssignmentDto;
    }) =>
      assignmentsApi.update(classroomId, assignmentId, dto),

    onSuccess: (updatedAssignment) => {
      queryClient.setQueryData(
        QUERY_KEYS.ASSIGNMENT(
          updatedAssignment.classroomId,
          updatedAssignment.id
        ),
        updatedAssignment
      );

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ASSIGNMENTS(
          updatedAssignment.classroomId
        ),
      });
    },
  });
};

export const useDeleteAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      classroomId,
      assignmentId,
    }: {
      classroomId: number;
      assignmentId: number;
    }) =>
      assignmentsApi.delete(classroomId, assignmentId),

    onSuccess: (_, variables) => {
      const { classroomId, assignmentId } = variables;

      queryClient.removeQueries({
        queryKey: QUERY_KEYS.ASSIGNMENT(
          classroomId,
          assignmentId
        ),
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ASSIGNMENTS(classroomId),
      });
    },
  });
};

export const useAssignmentAddChallenge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      classroomId,
      assignmentId,
      challengeIds,
    }: {
      classroomId: number;
      assignmentId: number;
      challengeIds: number[];
    }) => assignmentsApi.addChallenge(classroomId, assignmentId, challengeIds),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ASSIGNMENT(variables.classroomId, variables.assignmentId),
      });
    },
  });
};