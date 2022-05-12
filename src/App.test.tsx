import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router';
import { IntlProvider } from 'react-intl';
import { LOCALES } from './lang/locales';
import { messages } from './lang/messages';
import { Provider } from 'react-redux';
import { store } from './store';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    </Provider>
  );
  const linkElement = screen.getByText('Log out');
  expect(linkElement).toBeInTheDocument();
});
