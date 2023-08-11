import useGoogleLogin from '@/hooks/useGoogleLogin';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

function Page() {
  const router = useRouter();
  const { mutateAsync } = useGoogleLogin();

  useEffect(() => {
    if (router.isReady) {
      const { state, ...rest } = router.query;
      (async () => {
        try {
          await mutateAsync(rest);
          router.replace(state as string);
        } catch (err) {
          alert('로그인 실패');
          router.replace('/my');
        }
      })();
    }
  }, [mutateAsync, router]);
  return <div></div>;
}

export default Page;
