import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  GridList,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import React, { useEffect, useState } from 'react';
import { OrderItem } from '../models/OrderItem';
import { Product } from '../models/Product';

interface Props {
  products: Product[];
  addOrderItem: (item: OrderItem) => void;
}
function Catalogue(props: Props) {
  const classes = useStyles();
  const [productToSHow, setProductToShow] = useState<Product[]>([]);
  const [productToAdd, setProductToAdd] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log('Catalogue');
    setProductToShow(props.products.slice(0, 4));
  }, [props.products]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setProductToShow(props.products.slice((value - 1) * 4, value * 4));
  };

  function makeid(length: number) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const handleAddOrderItem = () => {
    if (productToAdd) {
      props.addOrderItem(new OrderItem(makeid(8), quantity, productToAdd));
      setProductToAdd(null);
      setQuantity(1);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setProductToAdd(null);
    setQuantity(1);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          id="dialog-titile"
          className={classes.title}
          style={{ fontWeight: 'bold' }}
        >
          {productToAdd?.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid item className={classes.subtitle}>
              Cena: {productToAdd?.price}
            </Grid>
            <Grid item>
              Kolicina:
              <TextField
                id="standard-number"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Odbaci
          </Button>
          <Button onClick={handleAddOrderItem} color="primary">
            Potvrdi
          </Button>
        </DialogActions>
      </Dialog>
      <GridList
        style={{
          flex: 1,
          padding: 10,
          height: '95vh',
          justifyContent: 'space-around',
        }}
        cols={2}
      >
        {productToSHow.map((item: Product, index) => {
          return (
            <Grid item xs={5} key={index} className={classes.gridItem}>
              <Card className={classes.root} variant="outlined">
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="productPicture"
                    height="140"
                    image={item.image}
                    title="productPicture"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      className={classes.title}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Cena: {item.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    className={classes.button}
                    onClick={() => {
                      setProductToAdd(item);
                      handleClickOpen();
                    }}
                  >
                    Ubaci u korpu
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}

        <Grid container className={classes.pagination}>
          <Grid item style={{ margin: 'auto' }}>
            <Pagination
              //Math.ceil(props.products.length / 4)
              count={Math.floor(props.products.length / 4 + 1)}
              color="primary"
              onChange={handleChangePage}
            />
          </Grid>
        </Grid>
      </GridList>
    </>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridItem: {
      // flex: 1,
      maxHeight: 250,
    },
    root: {
      // maxHeight: '300px !important',
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#005691',
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
  })
);

export default Catalogue;
