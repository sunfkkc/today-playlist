import http from '@/http';
import { useMutation } from 'react-query';

const googleLogin = async () => {
  const { data } = await http.get('/auth/google');
  return data;
};

const useGoogleLogin = () => {
  return useMutation(googleLogin);
};

export default useGoogleLogin;
