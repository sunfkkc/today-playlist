import { Config, getPlaylist } from '@/apis/getPlaylist';
import queryKeys from '@/constants/queryKeys';
import { useQuery } from 'react-query';

const usePlaylist = (playlistId?: string, config?: Config) => {
  return useQuery(
    [queryKeys.playlist, playlistId],
    () => getPlaylist(playlistId!, config),
    {
      enabled: Boolean(playlistId),
      keepPreviousData: true,
      staleTime: Infinity,
    }
  );
};
export default usePlaylist;
