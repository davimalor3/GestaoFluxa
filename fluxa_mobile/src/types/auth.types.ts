// aqui fica as interfaces e tipos relacionados à autenticação, como login, registro e informações do usuário
export enum UserRole {
  GERENTE = "GERENTE",
  GARCOM = "GARCOM",
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  restaurantId: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}
