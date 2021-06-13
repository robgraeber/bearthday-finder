import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'src/styles/globals.css';

// Currently the store is only client-side.
// More work is needed for SSR support or consider using next-redux-wrapper.
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </MuiPickersUtilsProvider>
  );
}

export default MyApp;
