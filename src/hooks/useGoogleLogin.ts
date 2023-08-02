import http from '@/http';
import axios from 'axios';
import { useMutation } from 'react-query';

const googleLogin = async () => {
  const client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const redirect_uri = 'https://api.todayplaylist.site/auth/google/redirect';
  const response_type = 'code';
  const scope = 'openid profile email';
  const { data } = await axios.get(
    'https://accounts.google.com/o/oauth2/v2/auth',
    {
      params: { client_id, redirect_uri, response_type, scope },
    }
  );
  return data;
};

const useGoogleLogin = () => {
  return useMutation(googleLogin);
};

export default useGoogleLogin;
