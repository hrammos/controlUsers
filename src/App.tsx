import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppProvider from './hooks';

import GlobalStyle from './styles/global';
import Routes from './routes';

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>
    </BrowserRouter>
    <GlobalStyle />
    <ToastContainer autoClose={3000} />
  </>
);

export default App;
