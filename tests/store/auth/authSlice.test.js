import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Pruebas en authSlice', () => { 
  test('debe regresar el estado inicial y llamarse "auth"', () => { 
    const state = authSlice.reducer(initialState, {});

    expect(authSlice.name).toBe('auth');
    expect(state).toEqual(initialState);
  })

  test('debe realizar la autenticacion', () => { 
    const state = authSlice.reducer(initialState, login(demoUser));

    expect(state).toEqual({
      status: 'authenticated', 
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null,
    })
  })

  test('debe realizar el logout sin argumentos', () => { 
    const state = authSlice.reducer(authenticatedState, logout());
    
    expect(state).toEqual({
      status: 'not-authenticated', // 'checking' 'authenticated'
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: undefined
    })
  })

  test('debe realizar el logout y mostrar un mensaje de error', () => { 
    const errorMessage = 'Credenciales no son correctas';
    const state = authSlice.reducer(authenticatedState, logout({errorMessage}));
    
    expect(state).toEqual({
      status: 'not-authenticated', // 'checking' 'authenticated'
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage
    })
  })
  
  test('debe cambiar el estado a checking', () => { 
    const state = authSlice.reducer(authenticatedState, checkingCredentials());
    expect(state.status).toBe('checking');
  })

})