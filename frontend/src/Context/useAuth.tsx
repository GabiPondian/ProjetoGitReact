import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { UserProfile } from "../Models/User";
import { loginAPI, registerAPI } from "../Services/AuthService";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (
    email: string,
    username: string,
    password: string
  ) => Promise<void>;
  loginUser: (
    username: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = {
  children: React.ReactNode;
};

const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = ({
  children,
}: Props) => {
  const navigate = useNavigate();

  const [user, setUser] =
    useState<UserProfile | null>(null);

  const [token, setToken] =
    useState<string | null>(null);

  const [isReady, setIsReady] =
    useState(false);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    const storedToken =
      localStorage.getItem("token");

    if (storedUser && storedToken) {
      const userObj =
        JSON.parse(storedUser);

      setUser(userObj);
      setToken(storedToken);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storedToken}`;
    }

    setIsReady(true);
  }, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ): Promise<void> => {
    try {
      const res = await registerAPI(
        email,
        username,
        password
      );

      if (!res?.data) {
        toast.error(
          "A API não retornou dados."
        );
        return;
      }

      const userObj: UserProfile = {
        userName: res.data.userName,
        email: res.data.email,
      };

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(userObj)
      );

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;

      setToken(res.data.token);
      setUser(userObj);

      toast.success(
        "Cadastro realizado com sucesso!"
      );

      navigate("/search");
    } catch (error: any) {
      console.error(
        "ERRO NO CADASTRO:",
        error
      );

      if (error.response) {
        console.log(
          "STATUS:",
          error.response.status
        );

        console.log(
          "DATA:",
          error.response.data
        );

        if (
          Array.isArray(
            error.response.data
          )
        ) {
          const mensagem =
            error.response.data
              .map(
                (x: any) =>
                  x.description
              )
              .join(" | ");

          toast.error(mensagem);
        } else if (
          typeof error.response.data ===
          "string"
        ) {
          toast.error(
            error.response.data
          );
        } else {
          toast.error(
            JSON.stringify(
              error.response.data
            )
          );
        }
      } else {
        toast.error(
          "Erro ao realizar cadastro."
        );
      }
    }
  };

  const loginUser = async (
    username: string,
    password: string
  ): Promise<void> => {
    try {
      const res = await loginAPI(
        username,
        password
      );

      if (!res?.data) {
        toast.error(
          "A API não retornou dados."
        );
        return;
      }

      const userObj: UserProfile = {
        userName: res.data.userName,
        email: res.data.email,
      };

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(userObj)
      );

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;

      setToken(res.data.token);
      setUser(userObj);

      toast.success(
        "Login realizado com sucesso!"
      );

      navigate("/search");
    } catch (error: any) {
      console.error(
        "ERRO NO LOGIN:",
        error
      );

      if (error.response) {
        console.log(
          "STATUS:",
          error.response.status
        );

        console.log(
          "DATA:",
          error.response.data
        );

        if (
          typeof error.response.data ===
          "string"
        ) {
          toast.error(
            error.response.data
          );
        } else {
          toast.error(
            "Usuário ou senha inválidos."
          );
        }
      } else {
        toast.error(
          "Erro ao realizar login."
        );
      }
    }
  };

  const logout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    delete axios.defaults.headers.common[
      "Authorization"
    ];

    setUser(null);
    setToken(null);

    navigate("/");
  };

  const isLoggedIn = (): boolean => {
    return !!user;
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        registerUser,
        loginUser,
        logout,
        isLoggedIn,
      }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(UserContext);
};