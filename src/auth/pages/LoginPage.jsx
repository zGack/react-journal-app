import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink} from 'react-router-dom'

import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"

import { AuthLayout } from '../layout/AuthLayout'
import { userForm } from '../../hooks'
import { startGoogleSignIn, startLogInWithEmailPassword, startLogout } from '../../store/auth'
import { useMemo, useState } from 'react'

const formData = {
    email: '',
    password: '',
};

const formValidations = {
  email: [(value) => value.includes('@'), 'Debe ingresar el correo'],
  password: [(value) => value.length >= 1, 'Debe ingresar la password'],
}

export const LoginPage = () => {

  const dispatch = useDispatch();

  const {status, errorMessage} = useSelector(state => state.auth);
  const isAuthenticating = useMemo(() => status === 'checking', [status]);
  const [formSubmited, setFormSubmited] = useState(false);

  const { 
    formState, emailValid, passwordValid, onInputChange, 
    isFormValid, email, password 
  } = userForm(formData, formValidations);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmited(true);

    if (!isFormValid) return;

    dispatch(startLogInWithEmailPassword(formState));
  }

  const handleGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  }

  const handleSwitchPage = () => {
    dispatch(startLogout());
  }


  return (
    <AuthLayout title='Login'>
      <form 
      aria-label='submit-form'
      onSubmit={handleSubmit} 
      className='animate__animated animate__fadeIn animate__faster' >
      
        <Grid container>
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField 
              label='Correo'
              type='email'
              placeholder="correo@gmail.com"
              name='email'
              value={email}
              onChange={onInputChange}
              fullWidth
              error={!!emailValid && formSubmited}
              helperText={formSubmited && emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField 
              label='Password'
              type='password'
              placeholder="Password"
              name='password'
              inputProps={{
                'data-testid': 'password'
              }}
              value={password}
              onChange={onInputChange}
              fullWidth
              error={!!passwordValid && formSubmited}
              helperText={formSubmited && passwordValid}
            />
          </Grid>
          <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
            <Grid 
              item 
              xs={12}
              display={!!errorMessage ? '': 'none'}
            >
              <Alert severity='error'>
                {errorMessage}
              </Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button 
                disabled={isAuthenticating}
                type='submit'
                variant='contained' 
                fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button 
                disabled={isAuthenticating}
                onClick={handleGoogleSignIn}
                variant='contained'
                aria-label='google-btn'
                fullWidth>
                <Google />
                <Typography sx={{ml:1}}>Google</Typography>
              </Button>
            </Grid>
            <Grid container direction="row" justifyContent='end' sx={{mt: 1}}>
              <Link 
                component={RouterLink} 
                color="inherit" 
                to="/auth/register"
                onClick={handleSwitchPage}
              >
                Crear un cuenta
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
