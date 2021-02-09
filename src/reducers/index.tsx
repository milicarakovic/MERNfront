import { combineReducers } from 'redux';
import { ordersReducer } from './orders';
import { productsReducer } from './products';
import { updateReducer } from './update';

const allReducers = combineReducers({
  products: productsReducer,
  orders: ordersReducer,
  update: updateReducer,
});

export type RootState = ReturnType<typeof allReducers>;

export default allReducers;
