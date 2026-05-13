// validações e regras de negócio relacionadas à autenticação, como login, registro e gerenciamento de sessão
import { z } from "zod";
import { loginRequest, registerRequest } from "../api/auth.api";
import { LoginDTO, RegisterDTO, UserRole } from "../types/auth.types";

const authResponseSchema = z.object({
  access_token: z.string(),

  user: z.object({
    id: z.string(),
    nomeRestaurante: z.string(),
    email: z.string().email("Email inválido"),
    role: z.enum(UserRole),
    restaurantId: z.string(),
  }),
});
// padronização dos campos conforme backend
const authRegisterSchema = z.object({
  restaurantName: z.string().min(1, "O nome é obrigatório"),
  cnpj: z.string().max(20, "CNPJ inválido"),
  endereco: z.string().min(1, "Endereço Inválido"),
  nameManager: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
});

export async function login(data: LoginDTO) {
  const response = await loginRequest(data);

  return authResponseSchema.parse(response);
}

export async function register(data: RegisterDTO) {
  const response = await registerRequest(data);

  return authRegisterSchema.parse(response);
}
