import http from '@/http';

export const getPlaylist = async (playlistId: string, config?: Config) => {
  const usage = config?.usage ?? 'view';
  const { data } = await http.get<Playlist>(
    `/playlists/${usage}/${playlistId}`
  );
  return data;
};

export interface Playlist {
  playlistId?: string;
  thumbnailUrl?: string;
  title?: string;
  viewCount?: number;
  likeCount?: number;
  isLiked?: boolean;
  hashtag?: string[];
  songs?: Song[];
}

export interface Song {
  videoId?: string;
  title?: string;
  length?: string;
  time?: string;
}

export interface Config {
  usage?: 'view' | 'modify';
}
