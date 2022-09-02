import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react';
import { Provider as StoreProvider } from 'react-redux'
import { useStore } from '../client-store'

function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <StoreProvider store={store}>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </StoreProvider>
  );
}

export default App;
