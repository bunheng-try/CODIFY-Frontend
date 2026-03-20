import { httpClient } from "@/app/services/httpClient";
import { useAuthStore } from "@/app/store/autStore";


type User = { id: number; name: string; email: string };
type AuthResponse = { access_token: string; user: User };

export const authApi = {

  login: async (email: string, password: string) => {
    try {
      console.log("Logging in:", { email, password });
      const data = await httpClient.post<AuthResponse, { email: string; password: string }>(
        "/auth/login",
        { email, password }
      );
      useAuthStore.getState().setAuth(null, data.access_token);

      const user = await httpClient.get<User>("/users/me");

      useAuthStore.getState().setAuth(user, data.access_token);

      return user;
    } catch (err: any) {
      console.error("Login failed:", err.message);
      throw err;
    }
  },

  signup: async (name: string, email: string, password: string) => {
    try {
      const data = await httpClient.post<AuthResponse, { name: string; email: string; password: string }>(
        "/auth/signup",
        { name, email, password }
      );
      useAuthStore.getState().setAuth(null, data.access_token);

      const user = await httpClient.get<User>("/users/me");

      useAuthStore.getState().setAuth(user, data.access_token);

      return user;
    } catch (err: any) {
      console.error("Signup failed:", err.message);
      throw err;
    }
  },

  logout: () => {
    useAuthStore.getState().clearAuth();
    window.location.href = "/signin";
  },
};
