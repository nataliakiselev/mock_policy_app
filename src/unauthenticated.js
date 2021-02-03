import React, { useContext } from 'react';
import { useToasts } from 'react-toast-notifications';
import { AuthContext } from './context/auth-context';
// import LoginForm from './components/login-form';

import { Typography, Button, TextField, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';

import PageFrame from './components/page-frame';
import { ErrorMessage } from './components/lib';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    [theme.breakpoints.up('sm')]: {
      width: '60%',
    },
  },
  form: {
    [theme.breakpoints.up('sm')]: {
      width: '60%',
    },
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginForm({ authSubmit }) {
  const classes = useStyles();
  const { error } = useContext(AuthContext);

  const { handleSubmit, control, errors: fieldsErrors } = useForm();

  const onSubmit = creds => {
    console.log(creds);
    const data = {
      ...creds,
      type: 'USER_PASSWORD_AUTH',
    };
    authSubmit(data);
  };

  return (
    <PageFrame>
      <div className={classes.paper}>
        <Box className={classes.header} borderBottom={1}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </Box>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            as={
              <TextField
                id="username"
                label="Username"
                helperText="Must be 6 to 20 characters"
                error={Boolean(fieldsErrors.username)}
              />
            }
            variant="outlined"
            margin="normal"
            control={control}
            fullWidth
            autoComplete="username"
            defaultValue=""
            name="username"
            rules={{
              required: true,
              minLength: 6,
              maxLength: 30,
            }}
          />

          <Controller
            name="password"
            as={
              <TextField
                helperText="Must be 8 to 20 characters"
                id="password"
                label="Password"
                error={Boolean(fieldsErrors.password)}
              />
            }
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            autoComplete="current-password"
            defaultValue=""
            control={control}
            rules={{
              required: 'required',
              minLength: 8,
              maxLength: 20,
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
        {error && <ErrorMessage error={error} />}
      </div>
    </PageFrame>
  );
}

function Unauthenticated() {
  const { login } = useContext(AuthContext);
  const { addToast } = useToasts();

  const headers = {
    environment: 'mock',
    'Content-type': 'application/json',
  };
  const AUTH_URL = 'https://api.bybits.co.uk/auth/token';

  async function auth(data) {
    try {
      // console.log(data, 'data');
      const response = await fetch(AUTH_URL, {
        method: 'post',
        headers,
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { access_token } = await response.json();
        // console.log('access_token', access_token);
        if (!access_token) {
          throw new Error('No access token in response');
        } else {
          login(access_token);
        }
      } else {
        throw response;
      }
    } catch (err) {
      console.log('error in auth call', err);

      addToast(`${err.message || err.statusText || 'Failed to login'}`, {
        appearance: 'error',
      });
    }
  }
  return <LoginForm authSubmit={auth} />;
}

export default Unauthenticated;
