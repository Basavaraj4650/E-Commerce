import axios, {AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import {API_BASE_URL} from '../constants/config';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    const customError = {
      message: error.message,
      response: error.response
        ? {
            status: error.response.status,
            data: error.response.data,
          }
        : null,
      config: error.config,
      isAxiosError: true,
    };
    return Promise.reject(customError);
  },
);

export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.get<T>(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.post<T>(
      url,
      data,
      config,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const put = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.put<T>(
      url,
      data,
      config,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const del = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.delete<T>(
      url,
      config,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
