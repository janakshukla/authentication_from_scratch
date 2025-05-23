import { User } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserAuth {
  user: User | null;
  login(email: string, password: string): Promise<any>;
  signup(username: string, email: string, password: string): Promise<any>;
  setUserById: (id: string) => Promise<void>;
}

export const useUser = create<UserAuth>()(
  persist(
    (set) => ({
      user: null,
      async login(email, password) {
        try {
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
          const data = await response.json();
          set({ user: data.user });
          return data;
        } catch (error) {
          console.log(error);
          return error;
        }
      },
      async signup(username, email, password) {
        try {
          const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, username }),
          });

          const data = await response.json();
          set({ user: data.user });
          return data;
        } catch (error) {
          console.log(error);
          return error;
        }
      },

      async setUserById(id) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}`
          );

          if (!response.ok) {
            throw new Error("User not found");
          }
          const user = await response.json();
          set({ user });
        } catch (error) {
          console.error(error);
        }
      },
    }),
    {
      name: "authentication",
    }
  )
);
