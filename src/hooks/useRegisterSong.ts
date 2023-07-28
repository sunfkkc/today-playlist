import http from '@/http';
import { useMutation } from 'react-query';

const registerSong = async (params: Params) => {
  await http.post('/playlists/register/song', params);
};

const useRegisterSong = () => {
  return useMutation(registerSong);
};
export default useRegisterSong;

interface Params {
  videoId?: string;
  title?: string;
}
