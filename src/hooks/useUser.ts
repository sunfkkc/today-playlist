import http from '@/http';
import queryKeys from '@/constants/queryKeys';
import { useQuery } from 'react-query';

const getUser = async () => {
  const { data } = await http.get('/auth');
  return data;
};

const useUser = () => {
  const methods = useQuery<{ nickname: string; profileImgUrl: string }>(
    queryKeys.user,
    getUser
  );
  const logout = async () => {
    await http.delete('/auth/logout');
    methods.refetch();
  };
  return { ...methods, logout };
};

export default useUser;
