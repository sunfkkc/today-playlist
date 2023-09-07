import http from '@/http';
import { Form } from '@/domain/update-playlist/atoms/form';

export const edit = async (form: Form & { playlistId: string }) => {
  const formData = new FormData();

  formData.append('file', form.image ?? '');
  formData.append('thumbnailUrl', form.thumbnailUrl ?? '');
  formData.append('title', form.title!);
  formData.append('hashtag', JSON.stringify(form.hashtag));
  formData.append('videoId', JSON.stringify(form.songs?.map((v) => v.id)));

  await http.patch(`/playlists/modify/${form.playlistId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
