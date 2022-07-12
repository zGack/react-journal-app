import { signInWithEmailAndPassword } from "firebase/auth";
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLogInWithEmailPassword, startLogout } from "../../../src/store/auth/thunks"
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers');

describe('Pruebas en AuthThunks', () => { 

  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('debe invocar el ckeckingCredentials', async() => { 
    await checkingAuthentication()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  })

  test('startGoogleSignIn debe llamar checkingCredentials y login - Exito', async() => { 
    const loginData = {ok: true, ...demoUser}
    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  })

  test('startGoogleSignIn debe llamar checkingCredentials y logout - Error', async() => { 
    const loginData = {ok: false, errorMessage: 'Error en el servidor'};
    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData));
  })


  test('startLoginWithEmailPassword debe llamar checkingCredentials y login - Exito', async() => { 
    const loginData = {ok: true, ...demoUser};
    const formData = {email: demoUser.email, password: '123123'};

    await loginWithEmailPassword.mockResolvedValue(loginData);

    await startLogInWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  })

  test('startLoginWithEmailPassword debe llamar checkingCredentials y logout - Error', async() => { 
    const loginData = {ok: false, errorMessage: 'Password incorrecta'};
    const formData = {email: demoUser.email, password: '123123'};

    await loginWithEmailPassword.mockResolvedValue(loginData);

    await startLogInWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData));
  })

  test('startCreatingUserWithEmailPassword debe llamar checkingCredentials y login - Exito', async() => { 
    const loginData = {ok: true, ...demoUser};
    const formData = {email: demoUser.email, password: '123123',displayName: demoUser.displayName};

    await registerUserWithEmailPassword.mockResolvedValue(loginData);

    await startCreatingUserWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  })

  test('startCreatingUserWithEmailPassword debe llamar checkingCredentials y logout - Error', async() => { 
    const loginData = {ok: false, errorMessage: 'Usuario ya existe'};
    const formData = {email: demoUser.email, password: '123123',displayName: demoUser.displayName};

    await registerUserWithEmailPassword.mockResolvedValue(loginData);

    await startCreatingUserWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData));
  })

  test('startLogout debe llamar logoutFirebase, clearNotes y logout', async() => { 
    await startLogout()(dispatch);

    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout());
  })

})