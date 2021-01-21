import React, { useContext, useState } from 'react';
import { Typography, Button, TextField, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useForm, Controller } from 'react-hook-form';
// import * as yup from 'yup';
import { AuthContext } from '../context/auth-context';
import PageFrame from './page-frame';
import { ErrorMessage } from './lib';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    width: '100%',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginForm({ onSubmit }) {
  const classes = useStyles();
  const { error } = useContext(AuthContext);
  const [invalid, setInvalid] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    const { username, password } = event.target.elements;
    const data = {
      username: username.value,
      password: password.value,
      type: 'USER_PASSWORD_AUTH',
    };
    onSubmit(data);
  }

  const handleChange = event => {
    const { value } = event.target;
    const isValid = value.length > 5 && value.length < 11;
    setInvalid(isValid ? null : 'Must be 6 to 10 charachters');
  };

  return (
    <PageFrame>
      <div className={classes.paper}>
        <Box className={classes.header} borderBottom={1}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </Box>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            autoComplete="username"
            onChange={handleChange}
            helperText={invalid}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            helperText={invalid}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={Boolean(invalid)}
          >
            Sign In
          </Button>
        </form>
      </div>
      {error && <ErrorMessage error={error} />}
    </PageFrame>
  );
}
