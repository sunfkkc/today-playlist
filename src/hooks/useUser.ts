import http from '@/http';
import queryKeys from '@/constants/queryKeys';
import { useQuery, useQueryClient } from 'react-query';

const getUser = async () => {
  const { data } = await http.get('/auth');
  return data;
};

const useUser = () => {
  const queryClient = useQueryClient();
  const methods = useQuery<{ nickname: string; profileImgUrl: string }>(
    queryKeys.user,
    getUser,
    {
      retry: false,
    }
  );
  const logout = async () => {
    await http.delete('/auth/logout');
    queryClient.removeQueries(queryKeys.user);
    queryClient.removeQueries(queryKeys.playlists);
    queryClient.removeQueries(queryKeys.playlist);
    methods.refetch();
  };
  return { ...methods, logout };
};

export default useUser;
