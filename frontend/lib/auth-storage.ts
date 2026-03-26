export type AuthUser = {
  id: number;
  email: string;
  role: string;
  name: string;
};

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function setUser(user: AuthUser) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser(): AuthUser | null {
  const userJson = localStorage.getItem(USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
}

export function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export function clearAuth() {
  removeToken();
  removeUser();
}
