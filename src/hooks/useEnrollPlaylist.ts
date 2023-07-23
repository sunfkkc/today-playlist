import {
  EnrollPlaylistForm,
  useEnrollPlaylistForm,
} from '@/atoms/enrollPlaylistForm';
import http from '@/http';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

const enrollPlaylist = async (form: EnrollPlaylistForm) => {
  const formData = new FormData();

  formData.append('file', form.image!);
  formData.append('title', form.title!);
  formData.append('hashtag', JSON.stringify(form.hashtag));
  formData.append('videoId', JSON.stringify(form.videoId?.map((v) => v.id)));

  await http.post('/playlists/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const useEnrollPlaylist = () => {
  const router = useRouter();
  const [_, setForm] = useEnrollPlaylistForm();

  return useMutation(enrollPlaylist, {
    onSuccess: () => {
      router.push('/');
      setForm({ hashtag: [], videoId: [] });
    },
  });
};

export default useEnrollPlaylist;
