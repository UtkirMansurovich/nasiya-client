import { api } from "./api";

export const authService = {
  login: (data: { username: string; password: string }) =>
    api("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
