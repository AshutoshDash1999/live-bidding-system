import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { rtkStore } from './utils/reduxStore'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={rtkStore}>
      <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
)
