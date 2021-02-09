import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Order } from '../models/Order';
import { OrderItem } from '../models/OrderItem';
import { ordersActions } from '../reducers/orders';
import { productsActions } from '../reducers/products';
import Catalogue from './Catalogue ';
import MyCart from './MyCart';
import MyOrders from './MyOrders';
import Navigation from './Navigation';

export default function Home() {
  let match = useRouteMatch();
  let [order, setOrder] = useState<Order | null>(null);

  //reducer
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products);
  const orders = useSelector((state: any) => state.orders);

  useEffect(() => {
    const FetchData = () => {
      dispatch(productsActions.getProductsAsyncAction() as any);
      dispatch(ordersActions.getOrdersAsyncAction() as any);
    };
    FetchData();
    console.log('Home');
  }, []);

  function addOrderItem(orderItem: OrderItem) {
    if (order === null) {
      order = new Order('0', new Date(), '', []);
    }
    const existingItem = order.orderItems.find(
      (i) => i.product._id === orderItem.product._id
    );

    if (existingItem) {
      setOrder(
        new Order(
          order._id,
          order?.date,
          order?.about,
          order.orderItems.map((item) =>
            item._id === existingItem._id
              ? new OrderItem(
                  item._id,
                  item.quantity + orderItem.quantity,
                  item.product
                )
              : item
          )
        )
      );
    } else
      setOrder(
        new Order(order._id, order?.date, order?.about, [
          ...order.orderItems,
          orderItem,
        ])
      );
  }

  function removeOrderItem(item: OrderItem) {
    if (order === null) return;
    setOrder(
      new Order(order._id, order?.date, order?.about, [
        ...order.orderItems.filter((order) => order !== item),
      ])
    );
  }

  function changeItemQuantity(id: string, quantity: number) {
    if (order === null) return;
    setOrder(
      new Order(
        order._id,
        order?.date,
        order?.about,
        order.orderItems.map((item) =>
          item._id === id ? new OrderItem(id, quantity, item.product) : item
        )
      )
    );
  }

  return (
    <>
      <BrowserRouter>
        <Navigation orderItems={order?.orderItems ?? null} />
        <Switch>
          <Route
            path={`${match.path}/katalog`}
            component={() => (
              <Catalogue
                products={products}
                addOrderItem={(item: OrderItem) => addOrderItem(item)}
              />
            )}
          />
          <Route
            path={`${match.path}/mojakorpa`}
            component={() => (
              <MyCart
                order={order}
                setOrder={(o: Order | null) => setOrder(o)}
                setOrderItemQuantity={changeItemQuantity}
                removeOrderItem={removeOrderItem}
              />
            )}
          />
          <Route
            path={`${match.path}/porudzbine`}
            component={() => (
              <MyOrders orders={orders} setOrder={(o: Order) => setOrder(o)} />
            )}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
}
