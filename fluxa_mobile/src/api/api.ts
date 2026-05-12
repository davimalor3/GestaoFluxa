/* eslint-disable import/no-named-as-default-member */
import axios from "axios";
import { getToken } from "../storage/token.storage";

export const api = axios.create({
  //  android emulator: "http://10.0.0.2:3000",
  //  ios simulator: "http://{ip}:3000",
  //  web: "http://localhost:3000",
  baseURL: "http://192.168.0.10:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
