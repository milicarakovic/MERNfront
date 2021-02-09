import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import React from 'react';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Props {
  setText: (value: string | null) => void;
  setType: (value: string | null) => void;

  text: string | null;
  type: string | null;
}

export default function Alerts(props: Props) {
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    props.setType(null);
    props.setText(null);
  };

  // useEffect(() => {}, [props.text !== null && props.type !== null]);
  return (
    <Snackbar
      open={props.text !== null && props.type !== null}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      {props.type === 'success' ? (
        <Alert onClose={handleClose} variant="filled" severity="success">
          {props.text}
        </Alert>
      ) : props.type === 'error' ? (
        <Alert onClose={handleClose} variant="filled" severity="error">
          {props.text}
        </Alert>
      ) : (
        <Alert onClose={handleClose} variant="filled" severity="info">
          {props.text}
        </Alert>
      )}
    </Snackbar>
  );
}
