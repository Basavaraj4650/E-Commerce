import {post} from '../../../services/axios.service';
import {
  LoginResponse,
  SignupResponse,
  UserLoginData,
  UserSignupData,
} from './login.interface';

export const LoginUser = async (
  userData: UserLoginData,
): Promise<LoginResponse> => {
  try {
    const loginUser = await post<LoginResponse>('/auth/login', userData);
    return loginUser;
  } catch (error) {
    throw error;
  }
};

export const signup = async (
  userData: UserSignupData,
): Promise<SignupResponse> => {
  try {
    const createUser = await post<SignupResponse>('/users', userData);
    return createUser;
  } catch (error) {
    throw error;
  }
};
