import {post} from '../../../services/axios.service';

export const LoginUser = async (userData: Partial<any>): Promise<any> => {
  try {
    const loginUser = await post<any>('/auth/login', userData);
    return loginUser;
  } catch (error) {
    throw error;
  }
};

export const signup = async (userData: Partial<any>): Promise<any> => {
  try {
    const createUser = await post<any>('/users', userData);
    return createUser;
  } catch (error) {
    throw error;
  }
};
