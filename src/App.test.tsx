import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store';

test('renders learn react link', () => {
  const { getAllByText } = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    </Provider>
  );
});
