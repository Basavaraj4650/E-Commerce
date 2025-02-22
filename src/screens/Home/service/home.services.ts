import {get} from '../../../services/axios.service';

export const getCatagaryList = async (): Promise<any> => {
  try {
    const response = await get<any>('/products/categories');
    return response;
  } catch (error) {
    throw error;
  }
};
