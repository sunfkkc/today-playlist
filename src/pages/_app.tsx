import '@/styles/globals.css';
import '@/sass/app.scss';
import type { AppProps } from 'next/app';
import { Layout } from '@/components';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GoogleOAuthProvider>
  );
}
