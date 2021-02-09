import {
  Badge,
  Button,
  createStyles,
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
  withStyles,
} from '@material-ui/core';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ViewListIcon from '@material-ui/icons/ViewList';
import React, { useContext } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { OrderItem } from '../models/OrderItem';
import { TokenContext } from '../service/api';
const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: 9,
      border: `2px solid ${theme.palette.background.paper}`,
    },
  })
)(Badge);
interface Props {
  orderItems: OrderItem[] | null;
}
function Navigation(props: Props) {
  let { setToken } = useContext(TokenContext);
  let classes = useStyles();
  let match = useRouteMatch();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Drawer
      variant="permanent"
      open
      classes={{ paper: classes.sidenav }}
      ModalProps={{
        keepMounted: true,
      }}
      className={classes.sidenav}
    >
      <>
        <List>
          <ListItem button component={Link} to={`${match.url}home/katalog`}>
            <ImportContactsIcon
              style={{ paddingRight: '10px', color: '#222431' }}
            />
            <ListItemText>Katalog</ListItemText>
          </ListItem>
          <ListItem button component={Link} to={`${match.url}home/mojakorpa`}>
            <StyledBadge
              badgeContent={props.orderItems ? props.orderItems.length : 0}
              color="primary"
            >
              <ShoppingCartIcon
                style={{ paddingRight: '10px', color: '#222431' }}
              />
            </StyledBadge>
            <ListItemText>Moja korpa</ListItemText>
          </ListItem>
          <ListItem button component={Link} to={`${match.url}home/porudzbine`}>
            <ViewListIcon style={{ paddingRight: '10px', color: '#222431' }} />
            <ListItemText>Porudzbine</ListItemText>
          </ListItem>
          <ListItem>
            <Link to="/">
              <Button onClick={handleLogOut}>Odjavi se</Button>
            </Link>
          </ListItem>
        </List>
      </>
    </Drawer>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    sidenav: {
      position: 'relative',
      height: '100vh',
      float: 'left',
      backgroundColor: '#E1E2EB',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
);
export default Navigation;
