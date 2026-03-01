import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { challengesApi, type Challenge, type ChallengeDto } from "../apis/challenge.api";

// Query keys
export const QUERY_KEYS = {
  CHALLENGES: ["challenges"] as const,
  CHALLENGE: (id: number) => ["challenge", id] as const,
};

// Get all challenges
export const useChallenges = () => {
  return useQuery<Challenge[], Error>({
    queryKey: QUERY_KEYS.CHALLENGES,
    queryFn: challengesApi.getChallenges,
  });
};

// Get a single challenge
export const useChallenge = (id: number | null) => {
  return useQuery<Challenge, Error>({
    queryKey: id ? QUERY_KEYS.CHALLENGE(id) : ["challenge", "none"],
    queryFn: () => {
      if (!id) throw new Error("No challenge ID provided");
      return challengesApi.getChallengeById(id);
    },
  });
};

// Create a challenge
export const useCreateChallenge = () => {
  const queryClient = useQueryClient();

  return useMutation<Challenge, Error, ChallengeDto>({
    mutationFn: challengesApi.createChallenge,
    onSuccess: (newChallenge) => {
      queryClient.setQueryData<Challenge[]>(QUERY_KEYS.CHALLENGES, (old = []) => [...old, newChallenge]);
      queryClient.setQueryData(QUERY_KEYS.CHALLENGE(newChallenge.id), newChallenge);
    },
  });
};

// Update a challenge
export const useUpdateChallenge = () => {
  const queryClient = useQueryClient();

  return useMutation<Challenge, Error, { id: number; dto: ChallengeDto }>({
    mutationFn: ({ id, dto }) => challengesApi.updateChallenge(id, dto),
    onSuccess: (updatedChallenge) => {
      queryClient.setQueryData(QUERY_KEYS.CHALLENGE(updatedChallenge.id), updatedChallenge);
      queryClient.setQueryData<Challenge[]>(QUERY_KEYS.CHALLENGES, (old = []) =>
        old.map((c) => (c.id === updatedChallenge.id ? updatedChallenge : c))
      );
    },
  });
};

// Delete a challenge
export const useDeleteChallenge = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: challengesApi.deleteChallenge,
    onSuccess: (_, id) => {
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.CHALLENGE(id),
        exact: true,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.CHALLENGES,
      });
    },
  });
};