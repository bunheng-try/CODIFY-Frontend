export type Languages = "c" | "python" | "javascript";

export type Challenge = {
  id: number;
  title: string;
  description: string;
  starterCode: string;
  language: Languages;
  difficulty: ChallengeLevel;
  tagId?: number;
  tag?: string;
  createdAt: string;
  updatedAt: string;
};



export type ChallengeLevel = "EASY" | "MEDIUM" | "HARD";

export type ChallengeDto = {
  title: string;
  description: string;
  starterCode: string;
  language: string;
  difficulty: ChallengeLevel;
  tagId?: number;
};

import { httpClient } from "@/app/services/httpClient";

export const challengesApi = {
  // Get all challenges
  getChallenges: () => httpClient.get<Challenge[]>(`/challenges`),

  // Get challenge by ID
  getChallengeById: (id: number) => httpClient.get<Challenge>(`/challenges/${id}`),

  // Create a challenge
  createChallenge: (dto: ChallengeDto) => httpClient.post<Challenge, ChallengeDto>(`/challenges`, dto),

  // Update a challenge
  updateChallenge: (id: number, dto: ChallengeDto) => httpClient.patch<Challenge, ChallengeDto>(`/challenges/${id}`, dto),

  // Delete a challenge
  deleteChallenge: (id: number) => httpClient.delete<void>(`/challenges/${id}`),
};