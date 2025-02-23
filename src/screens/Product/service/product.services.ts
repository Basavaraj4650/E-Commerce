import {get} from '../../../services/axios.service';
import {Products} from './product.interface';

export const getProductDetails = async (id: number): Promise<Products> => {
  try {
    const response = await get<Products>(`/products/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProductList = async (): Promise<Products> => {
  try {
    const response = await get<Products>('/products');
    return response;
  } catch (error) {
    throw error;
  }
};
