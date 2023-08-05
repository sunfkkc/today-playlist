import {
  EnrollPlaylistForm,
  useEnrollPlaylistForm,
} from '@/atoms/enrollPlaylistForm';
import http from '@/http';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

const edit = async ({ playlistId, ...form }: EditPlaylistParams) => {
  const formData = new FormData();

  formData.append('file', form.image!);
  formData.append('title', form.title!);
  formData.append('hashtag', JSON.stringify(form.hashtag));
  formData.append('videoId', JSON.stringify(form.songs?.map((v) => v.id)));

  await http.patch(`/playlists/modify/${playlistId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const useEditPlaylist = () => {
  const router = useRouter();
  const [_, setForm] = useEnrollPlaylistForm();

  return useMutation(edit, {
    onSuccess: () => {
      router.push('/');
      setForm({ hashtag: [], songs: [] });
    },
  });
};

export default useEditPlaylist;

export interface EditPlaylistParams extends EnrollPlaylistForm {
  playlistId: string;
}
