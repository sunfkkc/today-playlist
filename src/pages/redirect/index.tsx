import http from '@/http';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

function Page() {
  const router = useRouter();
  const { state, ...rest } = router.query;

  useEffect(() => {
    (async () => {
      if (rest && state !== 'undefined') {
        const res = await http.get('/auth/google/redirect', {
          params: { ...rest, redirect: state },
        });
        console.log(res);
      }
    })();
  }, [rest, state]);
  return <div></div>;
}

export default Page;
