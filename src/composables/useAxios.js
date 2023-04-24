import axios from "axios";
import { getJwtToken } from "../apis/auth";
import { ElMessage } from "element-plus";

function useAxios() {
  const instance = axios.create({
    baseURL: "http://127.0.0.1:3000",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getJwtToken()}`,
    },
  });

  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      ElMessage.error(error.response.data.message);
      return Promise.reject(error);
    }
  );
  return instance;
}

export default useAxios;
