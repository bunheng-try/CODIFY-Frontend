import { create } from "zustand";
import { persist } from "zustand/middleware";

type WorkspaceState = {
    codes: Record<number, string>;
    starterCodes: Record<number, string>;
    currentChallengeId: number | null;
    dirtyChallenges: number[]; // store as array for persistence

    setCurrentChallenge: (id: number) => void;
    setStarterCode: (challengeId: number, code: string) => void;
    setCode: (challengeId: number, code: string) => void;
    resetCode: (challengeId: number) => void;
    markDirty: (challengeId: number) => void;
    clearDirty: () => void;
};

export const useWorkspaceStore = create<WorkspaceState>()(
    persist(
        (set, get) => ({
            codes: {},
            starterCodes: {},
            currentChallengeId: null,
            dirtyChallenges: [],

            setCurrentChallenge: (id) => set({ currentChallengeId: id }),

            setStarterCode: (challengeId, code) =>
                set((state) => {
                    if (state.codes[challengeId]) return state;
                    return {
                        starterCodes: { ...state.starterCodes, [challengeId]: code },
                        codes: { ...state.codes, [challengeId]: code },
                    };
                }),

            setCode: (challengeId, code) =>
                set((state) => ({
                    codes: { ...state.codes, [challengeId]: code },
                    dirtyChallenges: state.dirtyChallenges.includes(challengeId)
                        ? state.dirtyChallenges
                        : [...state.dirtyChallenges, challengeId],
                })),

            resetCode: (challengeId) =>
                set((state) => ({
                    codes: {
                        ...state.codes,
                        [challengeId]: state.starterCodes[challengeId] ?? "",
                    },
                    dirtyChallenges: state.dirtyChallenges.filter((id) => id !== challengeId),
                })),

            markDirty: (challengeId) =>
                set((state) => ({
                    dirtyChallenges: state.dirtyChallenges.includes(challengeId)
                        ? state.dirtyChallenges
                        : [...state.dirtyChallenges, challengeId],
                })),

            clearDirty: () => set({ dirtyChallenges: [] }),
        }),
        {
            name: "codify-workspace" ,
            partialize: (state) => ({
                codes: state.codes,
                currentChallengeId: state.currentChallengeId,
                dirtyChallenges: state.dirtyChallenges,
            }),
        }
    )
);