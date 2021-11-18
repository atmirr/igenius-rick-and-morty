import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockedInitialState = {
  characters: { items: [], nextPage: null, error: null, isLoading: false },
  episodes: { items: [], nextPage: null, error: null, isLoading: false },
  locations: { items: [], error: null, isLoading: false },
};

function render(
  ui,
  {
    initialState = mockedInitialState,
    store = configureStore()(initialState),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
