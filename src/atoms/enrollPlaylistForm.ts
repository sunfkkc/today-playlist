import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

const enrollPlaylistForm = atom<EnrollPlaylistForm>({
  key: 'enrollPlaylistForm',
  default: { videoId: [], hashtag: [] },
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
  videoId?: { id?: string; title?: string }[];
  hashtag?: string[];
  image?: File | null;
}
