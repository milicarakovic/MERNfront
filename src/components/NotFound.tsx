import { createStyles, makeStyles } from '@material-ui/core';
import React from 'react';
function NotFound() {
  const classes = useStyles();

  const image = 'http://i.giphy.com/l117HrgEinjIA.gif';
  return (
    <div className={classes.fourOhFour}>
      <div
        className={classes.bg}
        style={{ backgroundImage: 'url(' + image + ')' }}
      ></div>
      <div className={classes.code}>Ooops</div>
    </div>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    fourOhFour: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: '#121212',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    bg: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundSize: 'cover',
      mixBlendMode: 'overlay',
    },
    code: {
      // font-family: 'Alfa Slab One', cursive;
      fontSize: ' 144px',
      height: '100vh',
      color: 'white',
      width: ' 100%',
      display: 'flex',
      backgorundPosition: ' center',
      alignItems: 'center',
      backgroundSize: 'cover',
      justifyContent: 'center',
    },
  })
);

export default NotFound;
