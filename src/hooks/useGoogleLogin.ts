import http from '@/http';
import { useMutation } from 'react-query';

const googleLogin = async (token: any) => {
  const { data } = await http.get(`/auth/google/redirect?code=${token.code}`);
  return data;
};

const useGoogleLogin = () => {
  return useMutation(googleLogin);
};

export default useGoogleLogin;
