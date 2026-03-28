export interface LoginResponse {
  success: boolean;
  message: string;
  data?: User;
}

export type User = {
  id: string;
  name: string;
  email: string;
  role?: "admin" | "viewer" | "ops";
};
