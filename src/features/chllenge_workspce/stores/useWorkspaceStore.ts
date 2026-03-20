import { create } from "zustand";
import { persist } from "zustand/middleware";

type WorkspaceState = {
    codes: Record<number, string>;
    starterCodes: Record<number, string>;
    currentChallengeId: number | null;

    setCurrentChallenge: (id: number) => void;
    setStarterCode: (challengeId: number, code: string) => void;
    setCode: (challengeId: number, code: string) => void;
    resetCode: (challengeId: number) => void;
};

export const useWorkspaceStore = create<WorkspaceState>()(
    persist(
        (set) => ({
            codes: {},
            starterCodes: {},
            currentChallengeId: null,

            setCurrentChallenge: (id) =>
                set({ currentChallengeId: id }),

            setStarterCode: (challengeId, code) =>
                set((state) => {
                    // prevent overwriting existing student code
                    if (state.codes[challengeId]) return state;

                    return {
                        starterCodes: {
                            ...state.starterCodes,
                            [challengeId]: code,
                        },
                        codes: {
                            ...state.codes,
                            [challengeId]: code,
                        },
                    };
                }),

            setCode: (challengeId, code) =>
                set((state) => ({
                    codes: {
                        ...state.codes,
                        [challengeId]: code,
                    },
                })),

            resetCode: (challengeId) =>
                set((state) => ({
                    codes: {
                        ...state.codes,
                        [challengeId]: state.starterCodes[challengeId] ?? "",
                    },
                })),
        }),
        {
            name: "codify-workspace",
        }
    )
);