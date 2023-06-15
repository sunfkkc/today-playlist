import '@/styles/globals.css';
import '@/sass/app.scss';
import type { AppProps } from 'next/app';
import { Layout } from '@/components';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </GoogleOAuthProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
