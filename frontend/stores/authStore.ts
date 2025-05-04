import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

enum Position {
  USER,
  AUDITOR,
  ADMIN,
}

type User = { id: string; username: string; name: string; position: Position };

interface AuthState {
  user: User | null;
  setAuth: (user: User) => Promise<void>;
  clearAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setAuth: async (user) => {
        set({ user });
      },
      clearAuth: async () => {
        set({ user: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
