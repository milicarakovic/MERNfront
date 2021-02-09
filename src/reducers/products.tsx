import { Dispatch } from 'redux';
import { Product } from '../models/Product';
import { GetAllProducts } from '../service/api';

// type ProductAction = { type: 'GET_PRODUCTS'; data: Product[] | null };

export const productsReducer = (state = [], action: any) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return [...action.data];
    default:
      return state;
  }
};

const getProductsAction = (products: Product[] | null) => {
  return {
    type: 'GET_PRODUCTS',
    data: products,
  };
};

const getProductsAsyncAction = () => async (dispatch: Dispatch) => {
  const products: Product[] | null = await GetAllProducts();
  dispatch(getProductsAction(products));
};

export const productsActions = {
  getProductsAsyncAction,
};
