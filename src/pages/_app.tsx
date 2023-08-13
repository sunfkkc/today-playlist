import '@/styles/globals.css';
import '@/sass/app.scss';
import type { AppProps } from 'next/app';
import { Layout } from '@/components';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider, QueryClient } from 'react-query';
import AppProvider from '@/AppProvider';
import Head from 'next/head';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <AppProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AppProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}
