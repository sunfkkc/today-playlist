import http from '@/http';
import { useMutation } from 'react-query';

interface Params {
  code?: string;
  scope?: string;
  authuser?: string;
  prompt?: string;
}

const googleLogin = async (params: Params) => {
  const { data } = await http.get('/auth/google/redirect', { params: params });
  return data;
};

const useGoogleLogin = () => {
  return useMutation(googleLogin);
};

export default useGoogleLogin;
