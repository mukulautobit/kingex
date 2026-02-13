import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/Store.ts'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Client_id } from './Utils/constants/app.constants.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={Client_id}>
    <Provider store={store}>
    <App />
    </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
