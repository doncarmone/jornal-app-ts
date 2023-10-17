import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  TextField,
  Typography,
  Button,
  Link,
  Alert,
} from '@mui/material';
import { Google } from '@mui/icons-material';
import { Authlayout } from '../layout/Authlayout';
import { useForm } from '../../hooks/useForm';
import { FormValidations, authForms } from '../../interfaces/';
import {
  checkingAuthentication,
  startGoogleSignIn,
  startLoginUserWithEmailPassword,
} from '../../store/auth';
import { useMemo } from 'react';

const LoginFormState: authForms = {
  email: '',
  password: '',
};

const formValidations: FormValidations = {
  email: [(value: string) => value.includes('@'), 'El correo debe tener una @'],
  password: [
    (value: string) => value.length >= 6,
    'El password debe de tener mas de 6 letras',
  ],
};

export const LoginPage = () => {
  const { email, password, onChange } = useForm(
    LoginFormState,
    formValidations
  );

  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(startLoginUserWithEmailPassword({ email, password }));
    console.log({ email, password });
  };

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
    console.log('google');
  };

  const onEmailAndPasswordSignIn = () => {};

  return (
    <Authlayout title='Login'>
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <TextField
              label='Correo'
              type='email'
              placeholder='email@example.com'
              fullWidth
              name='email'
              value={email}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <TextField
              label='Contraseña'
              type='password'
              fullWidth
              name='password'
              value={password}
              onChange={onChange}
            />
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{ mt: 2 }}
            display={!!errorMessage ? '' : 'none'}
            justifyContent='center'
          >
            <Alert severity='error'>{errorMessage}</Alert>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Button
                disabled={isAuthenticating}
                type='submit'
                variant='contained'
                fullWidth
              >
                Login {!!errorMessage ? '' : 'none'}
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 2 }}>
              <Button
                disabled={isAuthenticating}
                variant='contained'
                onClick={onGoogleSignIn}
                fullWidth
              >
                <Google /> <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to='/auth/register'>
              Crear una Cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </Authlayout>
  );
};
