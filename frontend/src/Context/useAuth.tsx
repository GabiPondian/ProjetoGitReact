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
  loginUser: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = {
  children: React.ReactNode;
};

const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
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

      if (res?.data) {
        const userObj: UserProfile = {
          userName: res.data.userName,
          email: res.data.email,
        };

        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(userObj)
        );

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;

        setToken(res.data.token);
        setUser(userObj);

        toast.success("Cadastro realizado com sucesso!");
        navigate("/search");
      }
    } catch (error) {
      toast.error("Erro ao realizar cadastro.");
      console.error(error);
    }
  };

  const loginUser = async (
    username: string,
    password: string
  ): Promise<void> => {
    try {
      const res = await loginAPI(username, password);

      if (res?.data) {
        const userObj: UserProfile = {
          userName: res.data.userName,
          email: res.data.email,
        };

        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(userObj)
        );

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;

        setToken(res.data.token);
        setUser(userObj);

        toast.success("Login realizado com sucesso!");
        navigate("/search");
      }
    } catch (error) {
      toast.error("Usuário ou senha inválidos.");
      console.error(error);
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