/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import { AppProps } from 'next/app';
import '../index.scss';
import { Provider } from 'react-redux';
import { store } from '../store/store';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/react.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React Journey</title>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
