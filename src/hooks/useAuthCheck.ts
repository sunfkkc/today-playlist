import http from '@/http';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useAuthCheck = () => {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      try {
        await http.get('/auth');
      } catch (err) {
        router.replace(`/my?redirect=${encodeURIComponent(router.pathname)}`);
      }
    })();
  }, [router]);
};
