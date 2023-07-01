import queryKeys from '@/constants/queryKeys';
import http from '@/http';
import { useInfiniteQuery } from 'react-query';

const getPlaylist = async (params: any) => {
  const { data } = await http.get<{
    playlists: Playlist[];
    currentPage: number;
    totalPage: number;
  }>('/playlist', { params });
  return data;
};

const usePlaylists = ({ size }: { size?: number }) => {
  const { data, fetchNextPage } = useInfiniteQuery(
    [queryKeys.playlists],
    ({ pageParam = 1 }) => getPlaylist({ page: pageParam, size }),
    {
      getNextPageParam: ({ currentPage, totalPage }) =>
        currentPage === totalPage ? undefined : currentPage + 1,
      enabled: Boolean(size),
    }
  );
  const playlists = data?.pages.flatMap((page) => page.playlists);

  return { playlists, fetchNextPage };
};

export default usePlaylists;

export interface Playlist {
  playlistId: string;
  thumbnailUrl: string;
  title: string;
  viewCount: number;
  likeCount: number;
  isLiked: boolean;
  hashtag: string[];
  songs: Song[];
}

export interface Song {
  videoId: string;
  title: string;
  length: string;
}
