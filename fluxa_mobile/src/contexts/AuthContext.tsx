import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { LoginDTO, User } from "../types/auth.types";

import { login } from "../services/auth.sevice";

import { getToken, removeToken, saveToken } from "../storage/token.storage";

type AuthContextType = {
  // user representa o usuário autenticado, ou null se não houver nengum usuário logado
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: string;

  login: (data: LoginDTO) => Promise<void>;
  logout: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadToken() {
      const storedToken = await getToken();
      if (storedToken) {
        // chama o endpoint /auth/me para obter as informações do usuário com base no token armazenado
        // const userData = await meRequest();
        // setUser(userData);
        //     setUser({} as User);
        //   } else {
        //     setUser(null);
        //     setError("Usuário não autenticado");
        //     return;
      }
      setLoading(false);
    }
    loadToken();
  }, []);

  async function handleLogin(data: LoginDTO) {
    try {
      const response = await login(data);
      setUser(response.user);
      await saveToken(response.access_token);
    } catch (err: unknown) {
      setError((err as Error).message);
    }
  }

  async function handleLogout() {
    setUser(null);
    await removeToken();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login: handleLogin,
        logout: handleLogout,
        isAuthenticated: !!user,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
