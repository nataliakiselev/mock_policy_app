import React, { useContext } from 'react';
import { Typography, Button, TextField, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
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
export default function LoginForm({ authSubmit }) {
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
                helperText="must be 6 to 20 characters"
                error={Boolean(fieldsErrors.username)}
              />
            }
            variant="outlined"
            margin="normal"
            control={control}
            defaultValue=""
            fullWidth
            name="username"
            autoFocus
            autoComplete="username"
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
                helperText="must be 8 to 20 characters"
                id="password"
                label="Password"
                error={Boolean(fieldsErrors.password)}
              />
            }
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            autoComplete="current-password"
            control={control}
            defaultValue=""
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
