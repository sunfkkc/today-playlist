import queryKeys from '@/constants/queryKeys';
import http from '@/http';
import { useQuery } from 'react-query';
import { Playlist } from './usePlaylists';

export const getPlaylist = async (playlistId: string, config?: Config) => {
  const usage = config?.usage ?? 'view';
  const { data } = await http.get<Playlist>(
    `/playlists/${usage}/${playlistId}`
  );
  return data;
};

const usePlaylist = (playlistId?: string, config?: Config) => {
  return useQuery(
    [queryKeys.playlist, playlistId],
    () => getPlaylist(playlistId!, config),
    {
      enabled: Boolean(playlistId),
      initialData: config?.initialData,
      keepPreviousData: true,
      staleTime: 2000,
    }
  );
};
export default usePlaylist;

interface Config {
  usage?: 'view' | 'modify';
  initialData?: Playlist;
}
