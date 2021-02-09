import { createContext } from 'react';
import { Order } from '../models/Order';
import { OrderItem } from '../models/OrderItem';
import { Product } from '../models/Product';
import { UserLogIn } from '../models/UserLogIn';

export const baseUrl = 'http://localhost:3000';

//TOKEN
export type IToken = {
  token: string | null;
  setToken: (value: string | null) => void;
};
const TokenDefault: IToken = {
  token: null,
  setToken: () => null,
};

export const TokenContext = createContext<IToken>(TokenDefault);

//ORDER ITEM
export type IOrderItem = {
  orderItem: OrderItem[] | null;
  setOrderItem: (value: OrderItem[] | null) => void;
};
const OrderItemDefault: IOrderItem = {
  orderItem: null,
  setOrderItem: () => null,
};

// export const OrderItemsContext = createContext<IOrderItem>(OrderItemDefault);

//ORDER
export type IOrder = {
  order: Order | null;
  setOrder: (value: Order | null) => void;
};
const OrderDefault: IOrder = {
  order: null,
  setOrder: () => null,
};

export const OrderContext = createContext<IOrder>(OrderDefault);

//PRODUCT
export type IProduct = {
  products: Product[] | null;
  setProducts: (value: Product[] | null) => void;
};
const ProductDefault: IProduct = {
  products: null,
  setProducts: () => null,
};
export const ProductContext = createContext<IProduct>(ProductDefault);

//ORDER
export type IUpdateOrAdd = {
  update: boolean;
  setUpdate: (value: boolean) => void;
};
const UpdateOrAddDefault: IUpdateOrAdd = {
  update: false,
  setUpdate: () => null,
};

export const UpdateContext = createContext<IUpdateOrAdd>(UpdateOrAddDefault);

//FUNCTIONS
export async function LogInUser(email: string, pass: string): Promise<any> {
  try {
    let user = new UserLogIn(email, pass);
    let response = await fetch(baseUrl + '/user/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
      },
    });
    return await response.json();
  } catch (err) {
    console.log('Error, ', err);
    return null;
  }
}

export async function GetAllProducts(): Promise<Product[] | null> {
  try {
    const value = await localStorage.getItem('token');
    if (value !== null) {
      const res = await fetch(baseUrl + '/product', {
        method: 'GET',
        headers: new Headers({
          'auth-token': value,
        }),
      });
      return await res.json();
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function AddOrder(
  order: Order
): Promise<{ order: string } | null> {
  try {
    const value = await localStorage.getItem('token');
    console.log('Order', order);
    const res = await fetch(baseUrl + '/orders', {
      method: 'POST',
      body: JSON.stringify(order),
      headers: new Headers({
        'Content-Type': 'application/json',
        'auth-token': value!,
      }),
    });

    var newOrder = await res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
  return newOrder;
}

export async function UpdateOrder(order: Order): Promise<Order | null> {
  try {
    console.log(order);
    const value = await localStorage.getItem('token');
    const res = await fetch(baseUrl + '/orders', {
      method: 'PUT',
      body: JSON.stringify(order),
      headers: new Headers({
        'Content-Type': 'application/json',
        'auth-token': value!,
      }),
    });

    var newOrder = await res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
  return newOrder;
}

export async function DeleteOrder(orderId: string): Promise<Order | null> {
  try {
    const value = await localStorage.getItem('token');
    const res = await fetch(baseUrl + `/orders/${orderId}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'auth-token': value!,
      }),
    });
    console.log(res);
    var deleted = await res.json();
  } catch (err) {
    return null;
  }
  return deleted;
}

export async function GetAllOrder(): Promise<Order[] | null> {
  try {
    const token = await localStorage.getItem('token');
    if (token) {
      const res = await fetch(baseUrl + '/orders', {
        method: 'GET',
        headers: new Headers({
          'auth-token': token,
        }),
      });
      return await res.json();
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
}
