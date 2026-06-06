import axios from "axios";
import { UserProfileToken } from "../Models/User";

const API_URL = "http://localhost:5052/api/";

export const loginAPI = async (
  username: string,
  password: string
) => {
  const response = await axios.post<UserProfileToken>(
    `${API_URL}account/login`,
    {
      username,
      password,
    }
  );

  return response;
};

export const registerAPI = async (
  email: string,
  username: string,
  password: string
) => {
  const response = await axios.post<UserProfileToken>(
    `${API_URL}account/register`,
    {
      email,
      username,
      password,
    }
  );

  return response;
};