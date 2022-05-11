import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { messages } from './lang/messages';
import { LOCALES } from './lang/locales';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const locale = LOCALES.ENGLISH;
// перенести язык в глобал стейт
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <IntlProvider messages={messages[locale]} locale={locale} defaultLocale={LOCALES.ENGLISH}>
        <App />
      </IntlProvider>
    </BrowserRouter>
  </React.StrictMode>
);
