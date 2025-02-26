import { User } from "@prisma/client";
import { create } from "zustand";

interface UserAuth {
  user: User | null;
  login(email: string, password: string): Promise<any>;
  signup(username: string, email: string, password: string): Promise<any>;
  setuserbyid(user: User): void;
}

export const useUser = create<UserAuth>()((set) => ({
  user: null,
  async login(email, password) {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      return response;
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
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  setuserbyid(user: User) {
    set({ user });
  },
}));
