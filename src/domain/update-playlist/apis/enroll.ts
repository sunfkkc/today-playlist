import http from '@/http';
import { Form } from '@/domain/update-playlist/atoms/form';

export const enroll = async (form: Form) => {
  const formData = new FormData();

  formData.append('file', form.image!);
  formData.append('title', form.title!);
  formData.append('hashtag', JSON.stringify(form.hashtag));
  formData.append('videoId', JSON.stringify(form.songs?.map((v) => v.id)));

  await http.post('/playlists/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
