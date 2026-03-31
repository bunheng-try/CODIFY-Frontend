import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { submissionsApi, type FeedbackDto } from "../apis/submission.api";

interface FeedbackParams {
  classroomId: number;
  assignmentId: number;
  submissionId: number;
  dto: FeedbackDto;
}

interface FeedbackQueryParams {
  classroomId: number;
  assignmentId: number;
  submissionId: number;
}

export const useFeedbackQuery = ({
  classroomId,
  assignmentId,
  submissionId,
}: FeedbackQueryParams) => {
  return useQuery<FeedbackDto>({
    queryKey: [
      "feedback",
      classroomId,
      assignmentId,
      submissionId,
    ],
    queryFn: () =>
      submissionsApi.getFeedback(
        classroomId,
        assignmentId,
        submissionId
      ),
    enabled: !!classroomId && !!assignmentId && !!submissionId,
  });
};

export const useFeedbackMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ classroomId, assignmentId, submissionId, dto }: FeedbackParams) =>
      submissionsApi.applyFeedback(classroomId, assignmentId, submissionId, dto),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "feedback",
          variables.classroomId,
          variables.assignmentId,
          variables.submissionId,
        ],
      });
    },
  });
};