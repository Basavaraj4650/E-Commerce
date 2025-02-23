import {get} from '../../../services/axios.service';
import {Product} from './product.interface';

export const getProductDetails = async (id: number): Promise<Product> => {
  try {
    const response = await get<Product>(`/products/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
