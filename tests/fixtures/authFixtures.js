
export const initialState = {
  status: 'checking', // 'checking' 'authenticated'
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
}

export const authenticatedState = {
  status: 'authenticated', // 'checking' 'authenticated'
  uid: 'aBc123',
  email: 'test@test.com',
  displayName: 'Test User',
  photoURL: 'https://test.jpg',
  errorMessage: null,
}

export const notAuthenticatedState = {
  status: 'not-authenticated', // 'checking' 'authenticated'
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
}

export const demoUser = {
  uid: 'aBc123',
  email: 'test@test.com',
  displayName: 'Test User',
  photoURL: 'https://test.jpg',
}