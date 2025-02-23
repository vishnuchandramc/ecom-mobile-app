import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: number;
  email: string;
  name: string;
}
interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (tokens: { access_token: string; refresh_token: string }) => void;
  setUserData: (userData: User) => void;
  clearAuth: () => void;
  userData: User | null;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      userData: null,
      setAuth: (tokens) =>
        set({
          isAuthenticated: true,
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
        }),
      clearAuth: () =>
        set({
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
        }),
      setUserData: (userData: User) => set({ userData }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
