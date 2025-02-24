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

export const getProductsByCategory = async (
  name: string,
): Promise<Products> => {
  try {
    const response = await get<Products>(`/products/category/${name}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCatagaryList = async (): Promise<any> => {
  try {
    // const response = await get<any>('/products/categories');

    const response = [
      {
        category: 'electronics',
        image: 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg',
      },
      {
        category: 'jewelery',
        image:
          'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
      },
      {
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
      },
      {
        category: "women's clothing",
        image: 'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg',
      },
    ];
    return response;
  } catch (error) {
    throw error;
  }
};
