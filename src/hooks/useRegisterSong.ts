import http from '@/http';
import { useMutation } from 'react-query';

const registerSong = async (params: Params) => {
  const { data } = await http.post<Response>(
    '/playlists/register/song',
    params
  );
  return data;
};

const useRegisterSong = () => {
  return useMutation(registerSong);
};
export default useRegisterSong;

interface Params {
  videoId?: string;
  title?: string;
}

interface Response {
  videoId?: string;
  title?: string;
  time?: string;
}
