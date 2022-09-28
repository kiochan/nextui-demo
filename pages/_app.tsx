import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react';
import { Provider as StoreProvider } from 'react-redux'
import { useStore } from '../client-store'
import { PersistGate } from 'redux-persist/integration/react'

// redux toolkit: see https://redux-toolkit.js.org/usage/usage-with-typescript

function App({ Component, pageProps }: AppProps) {
  const { store, persistor } = useStore(pageProps.initialReduxState)

  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </PersistGate>
    </StoreProvider>
  );
}

export default App;
