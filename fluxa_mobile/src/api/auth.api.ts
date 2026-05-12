// chamadas relacionadas à autenticação, como login, registro, logout e obtenção de informações do usuário
// métodos HTTP que fazem requisições para o backend e retornam os dados

import { AuthResponse, LoginDTO, RegisterDTO, User } from "../types/auth.types";
import { api } from "./api";

export async function loginRequest(data: LoginDTO) {
  const response = await api.post<AuthResponse>("/auth/login", data);

  return response.data;
}

export async function registerRequest(data: RegisterDTO) {
  const response = await api.post<AuthResponse>("/auth/register", data);

  return response.data;
}

export async function logoutRequest() {
  const response = await api.post("/auth/logout");

  return response.data;
}

export async function meRequest() {
  const response = await api.get<User>("/auth/me");

  return response.data;
}

// Funções adicionais para gerenciamento de autenticação e perfil do usuário
// implementação conforme desenvolvimento do backend e necessidades do aplicativo

// export async function refreshTokenRequest() {
//   const response = await api.post("/auth/refresh-token");

//   return response.data;
// }

// export async function forgotPasswordRequest(email: string) {
//   const response = await api.post("/auth/forgot-password", { email });

//   return response.data;
// }

// export async function resetPasswordRequest(token: string, newPassword: string) {
//   const response = await api.post("/auth/reset-password", { token, newPassword });

//   return response.data;
// }

// export async function changePasswordRequest(oldPassword: string, newPassword: string) {
//   const response = await api.post("/auth/change-password", { oldPassword, newPassword });

//   return response.data;
// }
