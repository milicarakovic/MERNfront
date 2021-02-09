import {
  Button,
  Container,
  createStyles,
  makeStyles,
  TextField,
} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { LogInUser, TokenContext } from '../service/api';
import Alerts from './Alerts';

export default function Login() {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const styles = useStyles();
  let { setToken } = useContext(TokenContext);

  useEffect(() => {
    console.log('Login');
  }, []);

  const handleLogIn = async () => {
    if (username && password) {
      const res: any = await LogInUser(username, password);
      if (res !== null) {
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        setToken(res.token);
      } else {
        setOpenAlert(true);
      }
    }
  };

  return (
    <div className={styles.loginBackground}>
      <Container className={styles.loginContainer}>
        <label className={styles.loginLabel}>Dobrodosli!</label>
        <TextField
          id="outlined-basic-username"
          label="Korisnicko ime"
          variant="outlined"
          className={styles.loginElements}
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="outlined-basic-password"
          label="Lozinka"
          variant="outlined"
          className={styles.loginElements}
          type="password"
          value={password || ''}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          className={styles.loginButton}
          onClick={handleLogIn}
        >
          Prijavi se
        </Button>
        {openAlert ? (
          <Alerts
            text="Ne postoji korisnik sa unetim korisnickim imenom i lozinkom."
            type="error"
            setText={() => setOpenAlert(false)}
            setType={() => setOpenAlert(false)}
          />
        ) : null}
      </Container>
      {loggedIn ? <Redirect to="home" /> : null}
    </div>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    loginBackground: {
      backgroundColor: '#222431',
      height: '100vh',
      // flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      backgroundImage: `url(
      ${'https://www.transparenttextures.com/patterns/asfalt-dark.png'}
    )`,
    },
    loginContainer: {
      maxWidth: '40%',
      borderRadius: '10px',
      position: 'relative',
      padding: '3%',
      boxShadow: '10px  10px  5px',
      background: '#e1e2eb',
      flexDirection: 'column',
      justifyContent: 'center',
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'center',
      flex: 0.6,
    },
    loginElements: {
      marginBottom: '2%',
      borderRadius: '10px',
    },
    loginButton: {
      flex: 1,
      borderRadius: '10px',
      marginTop: '2%',
      backgroundColor: '#4EB8CE',
      color: '#222431',
    },
    loginLabel: {
      marginBottom: '7%',
      alignSelf: 'center',
      fontSize: '3vh',
      fontWeight: 'bold',
      color: '#222431',
    },
  })
);
