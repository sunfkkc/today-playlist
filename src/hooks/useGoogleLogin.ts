import http from '@/http';
import { useMutation } from 'react-query';

const googleLogin = async (token: any) => {
  const { data } = await http.post('/auth/google', { token });
  return data;
};

const useGoogleLogin = () => {
  return useMutation(googleLogin);
};

export default useGoogleLogin;
