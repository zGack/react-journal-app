import { registerUserWithEmailPassword, signInWithGoogle, loginWithEmailPassword, logoutFirebase } from '../../firebase/providers';
import { clearNotesLogout } from '../journal';
import { checkingCredentials, login, logout } from './authSlice';

export const checkingAuthentication = (email, password) => {
  return async(dispatch) => {
    dispatch(checkingCredentials());
  }
}

export const startGoogleSignIn = () => {
  return async(dispatch) => {

    dispatch(checkingCredentials());

    const result = await signInWithGoogle();

    if (!result.ok) return dispatch(logout(result));

    dispatch(login(result));
  }
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
  return async(dispatch) => {

    dispatch(checkingCredentials());

    const result = await registerUserWithEmailPassword({email, password, displayName});

    if (!result.ok) return dispatch(logout(result));

    dispatch(login(result));
  };
}

export const startLogInWithEmailPassword = ({email, password}) => {
  return async(dispatch) => {

    dispatch(checkingCredentials());

    const result = await loginWithEmailPassword({email, password});

    if (!result.ok) return dispatch(logout(result));

    dispatch(login(result));
  }
}

export const startLogout = () => {
  return async(dispatch) => {
    await logoutFirebase();
    dispatch(clearNotesLogout());
    dispatch(logout());
  }
}