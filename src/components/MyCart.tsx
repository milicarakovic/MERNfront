import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Index } from '../models/IIndex';
import { Order } from '../models/Order';
import { OrderItem } from '../models/OrderItem';
import { ordersActions } from '../reducers/orders';
import { updateActions } from '../reducers/update';
import { UpdateOrder } from '../service/api';
import Alerts from './Alerts';

interface Props {
  order: Order | null;
  setOrder: (order: Order | null) => void;
  setOrderItemQuantity: (id: string, nq: number) => void;
  removeOrderItem: (orderItem: OrderItem) => void;
}
function MyCart(props: Props) {
  const classes = useStyles();
  const [newQuantity, setNewQuantity] = useState<number | null>(null);
  const [about, setAbout] = useState<string>('');
  const [indexes, setIndexes] = useState<Index[]>([]);
  const [sumPrice, setSumPrice] = useState<number>(0);

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [textAlert, setTextAlert] = useState<string | null>(null);
  const [typeAlert, setTypeAlert] = useState<string | null>(null);

  useEffect(() => {
    console.log('MyCart');
    if (props.order) {
      setAbout(props.order.about);
    }
    if (
      props.order?.orderItems !== null &&
      props.order?.orderItems.length !== 0
    ) {
      let indexes: any = props.order?.orderItems.map((item: OrderItem) => {
        return new Index(item._id, false);
      });
      setIndexes(indexes);
    }
    handleSumPrice();
  }, [props.order]);

  const handleSumPrice = () => {
    let sum: number = 0;
    if (
      props.order &&
      props.order.orderItems &&
      props.order.orderItems.length !== 0
    ) {
      props.order.orderItems.forEach((element) => {
        sum = sum + element.quantity * element.product.price;
      });
      setSumPrice(sum);
    } else setSumPrice(0);
  };

  const handleCancelOrder = () => {
    setAbout('');
    setSumPrice(0);
    props.setOrder(null);
    dispatch(updateActions.setCreate() as any);
  };

  const handleChangeQuantity = (itemID: string, nq: number) => {
    if (
      props.order &&
      props.order.orderItems !== null &&
      props.order.orderItems.length !== 0 &&
      nq !== 0
    ) {
      props.setOrderItemQuantity(itemID, nq);
      handleSumPrice();
    }
  };

  const handleModifyQuantity = (nq: number) => {
    setNewQuantity(nq);
  };

  const handleModifyIndexes = (id: string) => {
    let indexes2: Index[] = [...indexes];
    let i = indexes2.findIndex((x) => x.id === id);
    indexes2[i].editable = true;
    setIndexes(indexes2);
  };

  const dispatch = useDispatch();
  const orders = useSelector((state: any) => state.order);
  const update = useSelector((state: any) => state.update);

  const handleAddOrder = async () => {
    if (props.order?.orderItems && props.order.orderItems.length !== 0) {
      let ok: boolean;

      dispatch(
        (ok = ordersActions.addOrderAsyncAction(
          new Order(
            props.order._id,
            props.order.date,
            about,
            props.order.orderItems
          )
        ) as any)
      );

      if (ok) {
        setTextAlert('Uspesno kreirana porudzbina');
        setTypeAlert('success');
        setOpenAlert(true);
        setTimeout(() => {
          handleCancelOrder();
        }, 1000);
      } else {
        setTextAlert('Greska prilikom kreiranja porudzbine');
        setTypeAlert('error');
        setOpenAlert(true);
      }
    }
  };

  const handleUpdateOrder = async () => {
    console.log('update order');
    if (
      props.order &&
      props.order.orderItems &&
      props.order.orderItems.length !== 0
    ) {
      let res = await UpdateOrder(
        new Order(
          props.order._id,
          props.order.date,
          about,
          props.order.orderItems
        )
      );
      if (res) {
        setTextAlert('Uspesno izmenjena porudzbina');
        setTypeAlert('success');
        setOpenAlert(true);
        setTimeout(() => {
          handleCancelOrder();
        }, 1000);
        dispatch(ordersActions.getOrdersAsyncAction() as any);
      } else {
        setTextAlert('Greska prilikom izmene porudzbine');
        setTypeAlert('error');
        setOpenAlert(true);
      }
    }
  };

  return (
    <div
      style={{
        flex: 1,
        overflow: 'hidden',
        margin: 'auto',
        justifyContent: 'space-around',
        paddingTop: 100,
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      <Grid
        item
        xs={12}
        style={{
          textAlign: 'center',
          marginBottom: 10,
        }}
      >
        <label>Ukupan iznos: </label>
        <TextField id="standard-sum-price" disabled value={sumPrice} />
      </Grid>
      <Grid item>
        <TableContainer className={classes.table}>
          <Table size="medium">
            <TableHead className={classes.thead}>
              <TableRow>
                <TableCell style={{ color: 'white' }}>Indeks</TableCell>
                <TableCell style={{ color: 'white' }}>
                  Naziv proizvoda
                </TableCell>
                <TableCell style={{ color: 'white' }}>Jedinicna cena</TableCell>
                <TableCell style={{ color: 'white' }}>Kolicina</TableCell>
                <TableCell style={{ color: 'white' }}>
                  Izmeni/Obrisi stavku
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.tbody}>
              {props.order?.orderItems.map((row: OrderItem, index) => {
                return (
                  <TableRow
                    key={index}
                    className={classes.trow}
                    style={{ color: 'white' }}
                  >
                    <TableCell>{row._id}</TableCell>
                    <TableCell>{row.product.name}</TableCell>
                    <TableCell>{row.product.price}</TableCell>
                    <TableCell>
                      <TextField
                        id="standard-number"
                        value={
                          !indexes.find((x) => x.id === row._id)?.editable
                            ? row.quantity
                            : newQuantity
                        }
                        onChange={(e) => {
                          handleModifyQuantity(Number(e.target.value));
                        }}
                        type="number"
                        InputProps={{
                          readOnly: !indexes.find((x) => x.id === row._id)
                            ?.editable,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {indexes.find((x) => x.id === row._id)?.editable ===
                      false ? (
                        <Grid>
                          <Button
                            startIcon={<CreateIcon />}
                            onClick={() => {
                              setNewQuantity(row.quantity);
                              handleModifyIndexes(row._id);
                            }}
                          />
                          <Button
                            startIcon={<DeleteIcon />}
                            onClick={() => {
                              props.removeOrderItem(row);
                              handleSumPrice();
                              setNewQuantity(null);
                            }}
                          />
                        </Grid>
                      ) : (
                        <Grid>
                          <Button
                            startIcon={<CloseIcon />}
                            onClick={() => {
                              handleChangeQuantity(row._id, row.quantity!);
                            }}
                          />
                          <Button
                            startIcon={<CheckIcon />}
                            onClick={() =>
                              handleChangeQuantity(row._id, newQuantity!)
                            }
                          />
                        </Grid>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid container>
        <Grid item xs={4} style={{ textAlign: 'left' }}>
          <Button className={classes.btnReject} onClick={handleCancelOrder}>
            Odustani
          </Button>
        </Grid>
        <Grid
          item
          xs={4}
          style={{
            textAlign: 'center',
          }}
        >
          <TextField
            id="outlined-multiline-static"
            label="Napomena"
            multiline
            rows={3}
            variant="outlined"
            style={{ width: '100%' }}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </Grid>
        <Grid item xs={4} style={{ textAlign: 'right' }}>
          <Button
            className={classes.btnConfirm}
            onClick={() => {
              update ? handleUpdateOrder() : handleAddOrder();
            }}
          >
            Potvrdi
          </Button>
          {openAlert ? (
            <Alerts
              text={textAlert}
              type={typeAlert}
              setText={() => setOpenAlert(false)}
              setType={() => setOpenAlert(false)}
            />
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    table: {
      maxHeight: '400px',
      minHeight: '200px',
      overflowX: 'hidden',
      overflowY: 'auto',
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
    btnConfirm: {
      color: '#e1e2eb',
      background: '#222431',
      backgroundImage: `url(
        ${'https://www.transparenttextures.com/patterns/asfalt-dark.png'}
      )`,
      width: '200px',
    },
    btnReject: {
      background: '#e1e2eb',
      color: '#222431',
      border: '1px',
      borderStyle: 'solid',
      width: '200px',
    },
  })
);
export default MyCart;
