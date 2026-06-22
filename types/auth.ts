export interface AuthUser {
  id: number;
  username: string;
  displayName?: string | null;
  defaultDatabase?: string | null;
}

export interface LoginRequest {
  username: string;
  password: string;
  database?: string;
}

export interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}
