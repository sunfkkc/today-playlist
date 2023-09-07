import { Playlist } from '@/apis/getPlaylist';
import { atom } from 'recoil';

export const form = atom<Form>({
  key: 'updatePlaylistForm',
  default: { songs: [], hashtag: [] },
});

export interface Form extends Playlist {
  image?: File | null;
}
