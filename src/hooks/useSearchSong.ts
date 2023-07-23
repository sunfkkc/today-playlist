import http from '@/http';
import { useMutation } from 'react-query';

async function searchSong(searchWord: string) {
  const { data } = await http.get<SearchSongResponse>(
    '/playlists/register/song/search',
    {
      params: {
        searchWord: encodeURIComponent(searchWord),
      },
    }
  );
  return data;
}
function useSearchSong() {
  const { mutateAsync } = useMutation(searchSong);

  const search = mutateAsync;
  return { search };
}

export default useSearchSong;

export interface SearchSongResponse {
  searchResults?: {
    videoId?: string;
    title?: string;
    thumbnailUrl?: string;
  }[];
}
