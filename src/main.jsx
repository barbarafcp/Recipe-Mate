// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './routes';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <AppRoutes />
    </ChakraProvider>
  </React.StrictMode>
);
