import queryKeys from '@/constants/queryKeys';
import http from '@/http';
import { useQuery } from 'react-query';
import { Playlist } from './usePlaylists';

export const getPlaylist = async (playlistId: string) => {
  const { data } = await http.get<Playlist>(`/playlists/view/${playlistId}`);
  return data;
};

const usePlaylist = (playlistId?: string) => {
  return useQuery(
    [queryKeys.playlist, playlistId],
    () => getPlaylist(playlistId!),
    {
      enabled: Boolean(playlistId),
    }
  );
};
export default usePlaylist;
