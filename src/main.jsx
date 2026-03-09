import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { AlertProvider } from './context/AlertContext'
import { ConfirmProvider } from './context/ConfirmContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AlertProvider>
        <ConfirmProvider>
          <App />
        </ConfirmProvider>
      </AlertProvider>
    </Provider>
  </StrictMode>,
)
