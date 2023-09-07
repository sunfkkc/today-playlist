import { useRouter } from 'next/router';
import { useForm } from '@/domain/update-playlist/hooks/useForm';
import { useMutation } from 'react-query';
import { enroll } from '@/domain/update-playlist/apis/enroll';

export const useEnroll = () => {
  const router = useRouter();
  const [_, setForm] = useForm();

  const { mutate } = useMutation(enroll, {
    onSuccess: () => {
      router.push('/');
      setForm({ hashtag: [], songs: [] });
    },
  });

  return { enroll: mutate };
};
