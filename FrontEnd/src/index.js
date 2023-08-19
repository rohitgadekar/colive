import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { NextUIProvider } from "@nextui-org/react";
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { fetchProperties } from './redux/slice/propslice'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
store.dispatch(fetchProperties())

let persistor  = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
    <NextUIProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <App />
        </PersistGate>
    </Provider>
    </NextUIProvider>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
