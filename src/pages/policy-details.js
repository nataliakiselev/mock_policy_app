import React, { useContext } from 'react';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { PolicyContext } from '../context/policy-context';
import { AuthContext } from '../context/auth-context';
import PageFrame from '../components/page-frame';
import { ErrorMessage, LoadingSpinner } from '../components/lib';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    width: '100%',
    marginBottom: theme.spacing(8),
  },
}));

export default function Policydetails() {
  const classes = useStyles();
  const { loading, error, policyDetails } = useContext(PolicyContext);
  const { logout } = useContext(AuthContext);
  return (
    <PageFrame>
      <Button variant="contained" color="primary" onClick={logout}>
        Logout
      </Button>
      <div className={classes.paper}>
        <Box className={classes.header} borderBottom={1}>
          <Typography variant="h5" gutterBottom>
            My Policy
          </Typography>
        </Box>
        {loading ? <LoadingSpinner open={loading} /> : null}
        {!loading && error ? <ErrorMessage error={error} /> : null}
        {policyDetails && (
          <div>
            <Typography variant="h6">Policy reference</Typography>
            <Typography variant="subtitle1" gutterBottom>
              {policyDetails?.policy.policy_ref}
            </Typography>
            <Typography variant="h6">Cover type</Typography>
            <Typography variant="subtitle1" gutterBottom>
              {policyDetails?.policy.cover}
            </Typography>
            <Typography variant="h6">Car</Typography>
            <Typography
              variant="subtitle1"
              style={{ textTransform: 'capitalize' }}
              gutterBottom
            >
              {`${policyDetails?.vehicle.make} ${policyDetails.vehicle.model}
            ${policyDetails?.vehicle.colour} ${policyDetails.vehicle.reg}`}
            </Typography>
            <Typography variant="h6">Address</Typography>
            <Typography variant="subtitle1" gutterBottom>
              {`${policyDetails.policy.address.line_1} ${policyDetails.policy.address.line_2} ${policyDetails.policy.address.postcode}`}
            </Typography>
          </div>
        )}
      </div>
    </PageFrame>
  );
}
