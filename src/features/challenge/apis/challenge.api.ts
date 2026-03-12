import { httpClient } from "@/app/services/httpClient";
import type { ReactNode } from "react";

export interface Challenge {
  level?: string;
  topic?: ReactNode;
  language: ReactNode;
  score?: ReactNode;
  id: number;
  title: string;
  description?: string;
  author?: string;
  date?: Date;
}

export type ChallengeDto = {
  title: string;
  description: string;
  starterCode: string;
  language: string;
};


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