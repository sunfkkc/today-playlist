import { EnrollPlaylistForm } from '@/atoms/enrollPlaylistForm';
import http from '@/http';
import { useMutation } from 'react-query';

const enrollPlaylist = async (form: EnrollPlaylistForm) => {
  const formData = new FormData();

  formData.append('file', form.image!);
  formData.append('title', form.title!);
  formData.append('hashtag', JSON.stringify(form.hashtag));
  formData.append('videoId', JSON.stringify(form.videoId));

  await http.post('/playlists/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const useEnrollPlaylist = () => {
  return useMutation(enrollPlaylist);
};

export default useEnrollPlaylist;
