import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

const enrollPlaylistForm = atom<EnrollPlaylistForm>({
  key: 'enrollPlaylistForm',
  default: { songs: [], hashtag: [] },
});

export const useEnrollPlaylistForm = (): TUseEnrollPlaylistFormReturn => {
  const form = useRecoilValue(enrollPlaylistForm);
  const setForm = useSetRecoilState(enrollPlaylistForm);
  return [form, setForm];
};

export type TUseEnrollPlaylistFormReturn = [
  EnrollPlaylistForm,
  React.Dispatch<React.SetStateAction<EnrollPlaylistForm>>
];

export interface EnrollPlaylistForm {
  title?: string;
  songs?: { id?: string; title?: string }[];
  hashtag?: string[];
  image?: File | null;
  thumbnailUrl?: string;
}
