import { useRouter } from 'next/router';
import { useForm } from '@/domain/update-playlist/hooks/useForm';
import { useMutation } from 'react-query';
import { edit } from '@/domain/update-playlist/apis/edit';

export const useEdit = () => {
  const router = useRouter();
  const [_, setForm] = useForm();

  const { mutate } = useMutation(edit, {
    onSuccess: () => {
      router.push('/');
      setForm({ hashtag: [], songs: [] });
    },
  });

  return { edit: mutate };
};
