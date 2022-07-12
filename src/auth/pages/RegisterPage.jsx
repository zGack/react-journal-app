import { Link as RouterLink } from "react-router-dom"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { userForm } from "../../hooks/useForm"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startCreatingUserWithEmailPassword, startLogout } from "../../store/auth"
import { useMemo } from "react"

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), 'Debe ingresar un correo valido'],
  password: [(value) => value.length >= 6, 'La password debe tener mas de 6 caracteres'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmited, setFormSubmited] = useState(false);

  const {status, errorMessage} = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const { 
    formState, displayNameValid, emailValid, passwordValid,
    isFormValid, displayName,email, password, onInputChange, 
  } = userForm(formData, formValidations);

  
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmited(true);

    if(!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  }

  const handleSwitchPage = () => {
    dispatch(startLogout());
  }

  return (
    <AuthLayout title='Crear Cuenta'>
      <form onSubmit={handleSubmit} className='animate__animated animate__fadeIn animate__faster' >
        <Grid container>
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField 
              label='Nombre completo'
              type='text'
              placeholder="Nombre completo"
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              fullWidth
              error={!!displayNameValid && formSubmited}
              helperText={formSubmited && displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField 
              label='Email'
              type='email'
              placeholder="Email"
              name="email"
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
              name="password"
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
            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant='contained' 
                fullWidth
                disabled={isCheckingAuthentication}
                >
                Crear Cuenta
              </Button>
            </Grid>
          </Grid>
          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{mr:1}} >Ya tienes una cuenta?</Typography>
            <Link 
            component={RouterLink} 
            color='inherit' 
            to="/auth/login"
            onClick={handleSwitchPage}
            >
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}