import { atom } from 'recoil';

export const form = atom<Form>({
  key: 'updatePlaylistForm',
  default: { songs: [], hashtag: [] },
});

export interface Form {
  title?: string;
  songs?: { id?: string; title?: string; time?: string; length?: string }[];
  hashtag?: string[];
  image?: File | null;
  thumbnailUrl?: string;
}
