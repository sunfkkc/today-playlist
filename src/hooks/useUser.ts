import http from '@/http';
import queryKeys from '@/constants/queryKeys';
import { useQuery, useQueryClient } from 'react-query';

const getUser = async () => {
  const { data } = await http.get('/auth/user');
  return data;
};

const useUser = () => {
  const queryClient = useQueryClient();
  const methods = useQuery<{ name: string; picture: string }>(
    queryKeys.user,
    getUser
  );
  const logout = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.user],
    });
  };
  return { ...methods, logout };
};

export default useUser;
