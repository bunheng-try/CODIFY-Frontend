import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthState = {
    user: { id: number; name: string; email: string } | null;
    token: string | null;
    setAuth: (user: AuthState["user"], token: string) => void;
    clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,

            setAuth: (user, token) => set({ user, token }),
            clearAuth: () => set({ user: null, token: null }),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export const getAuthToken = () => useAuthStore.getState().token;