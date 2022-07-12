import { configureStore } from "@reduxjs/toolkit"
import { fireEvent, render, screen } from "@testing-library/react"
import { scryRenderedComponentsWithType } from "react-dom/test-utils"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { LoginPage } from "../../../src/auth/pages/LoginPage"
import { authSlice } from "../../../src/store/auth"
import { notAuthenticatedState } from "../../fixtures/authFixtures"

const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  preloadedState: {
    auth: notAuthenticatedState
  }
})

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailAndPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLogInWithEmailPassword: ({email, password}) => {
    return () => mockStartLoginWithEmailAndPassword({email, password})
  },
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn(),
}));

describe('Pruebas en <LoginPage />', () => { 

  beforeAll(() => jest.clearAllMocks());

  test('debe mostrar el componente correctamente', () => { 
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>

    )

    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
  })

  test('boton de google debe llamar el startGoogleSignIn', () => { 
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    const googleBtn = screen.getByLabelText('google-btn');
    fireEvent.click(googleBtn);
    expect(mockStartGoogleSignIn).toHaveBeenCalled();
  })

  test('submit debe llamar startLoginWithEmailPassword', () => { 

    const email = 'smf-mena@hotmail.com'
    const password = '123123'
    
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    const emailField = screen.getByRole('textbox', {name: 'Correo'})
    fireEvent.change(emailField, {target: {name: 'email', value: email}})

    const passwordField = screen.getByTestId('password');
    fireEvent.change(passwordField, {target: {name: 'password', value: password}})

    const loginForm = screen.getByLabelText('submit-form');
    fireEvent.submit(loginForm);

    expect(mockStartLoginWithEmailAndPassword).toHaveBeenCalledWith({
      email,
      password
    })

  })
})