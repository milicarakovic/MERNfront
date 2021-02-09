import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  createStyles,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Order } from '../models/Order';
import { OrderItem } from '../models/OrderItem';
import { ordersActions } from '../reducers/orders';
import { updateActions } from '../reducers/update';

interface Props {
  orders: Order[];
  setOrder: (order: Order) => void;
}

function MyOrders(props: Props) {
  const classes = useStyles();
  const [ordersToShow, setOrdersToShow] = useState<Order[]>([]);

  //reducer
  const dispatch = useDispatch();
  const update = useSelector((state: any) => state.update);

  useEffect(() => {
    setOrdersToShow(props.orders.slice(0, 6));
  }, [props.orders]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setOrdersToShow(props.orders.slice((value - 1) * 6, value * 6));
  };

  const handleSumPrice2 = (orderItems: OrderItem[]) => {
    let sum: number = 0;
    if (orderItems && orderItems.length !== 0) {
      orderItems.forEach((element) => {
        sum = sum + element.quantity * element.product.price;
      });
      return sum;
    } else return 0;
  };

  return (
    <div className={classes.div}>
      <Grid
        container
        style={{
          flex: 1,
          padding: 10,
          justifyContent: 'space-around',
        }}
      >
        {props.orders.length !== 0 ? (
          ordersToShow.map((element: Order, index) => {
            return (
              <Grid item xs={5} key={index} className={classes.gridItem}>
                <Card className={classes.root} variant="outlined">
                  <CardActionArea>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className={classes.title}
                      >
                        {element._id}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Datum kreiranja:{' '}
                        {moment(element.date).format('DD-MM-YYYY')}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Napomena: {element.about}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Ukupna cena: {handleSumPrice2(element.orderItems)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      className={classes.button}
                      onClick={() => {
                        const o: Order = new Order(
                          element._id,
                          element.date,
                          element.about,
                          element.orderItems
                        );
                        props.setOrder(o);
                        dispatch(updateActions.setUpdate() as any);
                      }}
                      component={Link}
                      to={'/home/mojakorpa'}
                    >
                      Izmeni
                    </Button>
                    <Button
                      size="small"
                      className={classes.button}
                      onClick={() => {
                        const o: Order = new Order(
                          element._id,
                          element.date,
                          element.about,
                          element.orderItems
                        );
                        dispatch(
                          ordersActions.deleteOrdersAsyncAction(o) as any
                        );
                      }}
                    >
                      Obrisi
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })
        ) : (
          <label>Nema kreiranih porudzbina...</label>
        )}
        <Grid container className={classes.pagination}>
          <Grid item style={{ margin: 'auto' }}>
            <Pagination
              count={Math.ceil(props.orders.length / 4)}
              color="primary"
              onChange={handleChangePage}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    div: {
      flex: 1,
      overflow: 'hidden',
      margin: 'auto',
      justifyContent: 'space-around',
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 10,
    },
    gridItem: {
      maxHeight: 250,
    },
    root: {
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#005691',
      marginTop: 5,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 20,
      color: '#005691',
    },
    subtitle: {
      alignSelf: 'center',
      fontSize: 15,
      fontWeight: 'bold',
    },
    button: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#005691',
      alignContent: 'center',
      justifyContent: 'center',
      width: 200,
      color: 'white',
    },
    pagination: {
      // marginLeft: 'auto',
      // marginRight: 'auto',
      // marginTop: '15',
      position: 'fixed',
      bottom: '0%',
      padding: 0,
      height: '8vh !important',
    },
    //table
    table: {
      maxHeight: '400px',
      minHeight: '200px',
      // display: 'block',
      overflowX: 'hidden',
      overflowY: 'auto',
      // height: '250px',
      // minWidth: 400,
      backgroundColor: '#E1E2EB',
      boxShadow: '5px  5px  5px',
      marginBottom: '2%',
      backgroundColoe: 'red',
    },
    thead: {
      display: 'table',
      width: '100%',
      tableLayout: 'fixed',
      borderBottom: 'inset',
      backgroundColor: '#222431',
      color: 'white !important',
    },
    tbody: {
      display: 'table',
      overflow: 'auto',
      tableLayout: 'fixed',
      maxHeight: ' 250px',
      width: ' 100%',
    },
    trow: {
      width: '100%',
    },
  })
);

export default MyOrders;
