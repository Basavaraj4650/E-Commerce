import {get} from '../../../services/axios.service';

export const getUserData = async (): Promise<any> => {
  try {
    const user = await get('users/1');
    return user;
  } catch (error) {
    throw error;
  }
};
