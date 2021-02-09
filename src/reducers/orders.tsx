import { Dispatch } from 'redux';
import { Order } from '../models/Order';
import { AddOrder, DeleteOrder, GetAllOrder } from '../service/api';

// type ProductAction = { type: 'GET_PRODUCTS'; data: Product[] | null };

export const ordersReducer = (state = [], action: any) => {
  switch (action.type) {
    case 'GET_ORDERS':
      return [...action.data];
    case 'ADD_ORDER':
      return [...state, action.data];
    case 'DELETE_ORDER':
      const index = returnIndex(state, action.data._id);
      return [...state.slice(0, index), ...state.slice(index + 1)];
    default:
      return state;
  }
};

function returnIndex(array: Order[], item: string): number {
  return array.findIndex((x) => x._id === item);
}

const getOrdersAction = (orders: Order[] | null) => {
  return {
    type: 'GET_ORDERS',
    data: orders,
  };
};

const addOrderAction = (order: Order | null) => {
  return {
    type: 'ADD_ORDER',
    data: order,
  };
};

const deleteOrderAction = (order: Order | null) => {
  return {
    type: 'DELETE_ORDER',
    data: order,
  };
};

const getOrdersAsyncAction = () => async (dispatch: Dispatch) => {
  const orders: Order[] | null = await GetAllOrder();
  dispatch(getOrdersAction(orders));
};

const addOrderAsyncAction = (order: Order) => async (dispatch: Dispatch) => {
  let res = await AddOrder(order);
  if (res) {
    order._id = res.order;
    dispatch(addOrderAction(order));
    return true;
  }
  return false;
};

const deleteOrdersAsyncAction = (order: Order) => async (
  dispatch: Dispatch
) => {
  const res = await DeleteOrder(order._id);
  if (res) {
    dispatch(deleteOrderAction(order));
    return true;
  }
  return false;
};

export const ordersActions = {
  getOrdersAsyncAction,
  addOrderAsyncAction,
  deleteOrdersAsyncAction,
};
