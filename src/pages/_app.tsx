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
        <meta property="og:title" content="오늘의 플리" />
        <meta
          property="og:description"
          content="오늘의 무드에 맞는, 당신만을 위한 플레이리스트"
        />
        <meta
          property="og:image"
          content={`https://www.todayplaylist.site/ogimage.png`}
        />
        <meta
          name="description"
          content="오늘의 무드에 맞는, 당신만을 위한 플레이리스트"
        />
        <title>오늘의 플리</title>
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
