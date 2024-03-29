import queryKeys from '@/constants/queryKeys';
import http from '@/http';
import { RefObject, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import useScrollEndDetection from './useScrollEndDetection';
import useLayoutHeight from './useLayoutHeight';

const getPlaylist = async ({
  url,
  ...params
}: Omit<Params, 'ref' | 'itemHeight'>) => {
  const { data } = await http.get<{
    playlists: Playlist[];
    currentPage: number;
    totalPage: number;
  }>(url ?? '/playlists', { params });
  return data;
};

const usePlaylists = ({ ref, itemHeight, ...params }: Params) => {
  const height = useLayoutHeight();

  const isBottom = useScrollEndDetection(ref);

  const size = height && itemHeight && Math.ceil(height / itemHeight) * 2;

  const { data, fetchNextPage, ...rest } = useInfiniteQuery(
    [queryKeys.playlists, params],
    ({ pageParam = 1 }) => getPlaylist({ ...params, page: pageParam, size }),
    {
      getNextPageParam: ({ currentPage, totalPage }) =>
        currentPage === totalPage ? undefined : currentPage + 1,
      enabled: Boolean(size),
    }
  );
  const playlists = data?.pages.flatMap((page) => page.playlists);

  useEffect(() => {
    if (isBottom) {
      fetchNextPage();
    }
  }, [isBottom, fetchNextPage]);

  return { playlists, fetchNextPage, ...rest };
};

export default usePlaylists;

interface Params {
  size?: number;
  isLiked?: boolean;
  searchWord?: string;
  page?: number;
  ref?: RefObject<HTMLDivElement>;
  itemHeight?: number;
  url?: string;
}

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
