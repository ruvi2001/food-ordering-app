import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import CartProvider from './hooks/useCart';
import './axiosConfig';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <CartProvider>  {/*to make cartprovider acssible to everywhere*/}
    <App />
    </CartProvider>
    </BrowserRouter>
    </React.StrictMode>
);

