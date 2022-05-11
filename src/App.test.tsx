import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router';
import { IntlProvider } from 'react-intl';
import { LOCALES } from './lang/locales';
import { messages } from './lang/messages';

test('renders learn react link', () => {
  const locale = LOCALES.ENGLISH;
  render(
    <MemoryRouter initialEntries={['/']}>
      <IntlProvider messages={messages[locale]} locale={locale} defaultLocale={LOCALES.ENGLISH}>
        <App />
      </IntlProvider>
    </MemoryRouter>
  );
  const linkElement = screen.getByText('Log out');
  expect(linkElement).toBeInTheDocument();
});
