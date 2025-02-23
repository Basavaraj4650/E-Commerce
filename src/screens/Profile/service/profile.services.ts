import {get, put} from '../../../services/axios.service';
import {UserSignupData} from '../../Login/service/login.interface';
import {UserData} from './profile.interface';

export const getUserData = async (): Promise<UserData> => {
  try {
    const user = await get<UserData>('users/1');
    return user;
  } catch (error) {
    throw error;
  }
};

export const upadteProfile = async (
  userData: UserSignupData,
): Promise<UserData> => {
  try {
    const user = await put<UserData>('users/1', {userData});
    return user;
  } catch (error) {
    throw error;
  }
};
