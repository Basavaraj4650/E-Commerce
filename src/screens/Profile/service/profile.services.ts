import {get} from '../../../services/axios.service';
import {UserData} from './profile.interface';

export const getUserData = async (): Promise<UserData> => {
  try {
    const user = await get<UserData>('users/1');
    return user;
  } catch (error) {
    throw error;
  }
};
