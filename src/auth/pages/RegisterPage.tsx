import { Link as RouterLink } from 'react-router-dom';
import {
  Grid,
  TextField,
  Typography,
  Button,
  Link,
  Alert,
} from '@mui/material';
import { Authlayout } from '../layout/Authlayout';
import { FormValidations, authForms } from '../../interfaces';
import { useForm } from '../../hooks';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth';

const registerFormState: authForms = {
  email: '',
  password: '',
  displayName: '',
};
const formValidations: FormValidations = {
  email: [(value: string) => value.includes('@'), 'El correo debe tener una @'],
  password: [
    (value: string) => value.length >= 6,
    'El password debe de tener mas de 6 letras',
  ],
  displayName: [
    (value: string) => value.length >= 1,
    'El nombre es obligatorio',
  ],
};

export const RegisterPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    displayName,
    email,
    password,
    onChange,
    passwordValid,
    displayNameValid,
    emailValid,
    isFormValid,
  } = useForm(registerFormState, formValidations);

  const { status, errorMessage } = useSelector((state) => state.auth);
  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    dispatch(
      startCreatingUserWithEmailPassword({ email, password, displayName })
    );
  };

  const dispatch = useDispatch();

  return (
    <Authlayout title='Crear Cuenta'>
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <TextField
              label='Nombre Completo'
              type='text'
              placeholder='Tu nombre'
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <TextField
              label='Correo'
              type='email'
              placeholder='email@example.com'
              fullWidth
              name='email'
              value={email}
              onChange={onChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
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
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid
            container
            spacing={2}
            sx={{ mt: 1 }}
            display={!!errorMessage ? '' : 'none'}
            justifyContent='center'
          >
            <Alert severity='error'>{errorMessage}</Alert>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sx={{ marginTop: 2 }}>
              <Button
                disabled={isAuthenticating}
                type='submit'
                variant='contained'
                fullWidth
              >
                Crear Cuenta
              </Button>
            </Grid>
          </Grid>
          <Grid container direction='row' justifyContent='end' sx={{ mt: 1 }}>
            <Typography sx={{ mr: 1 }}> Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </Authlayout>
  );
};
