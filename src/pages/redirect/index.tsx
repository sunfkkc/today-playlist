import http from '@/http';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

function Page() {
  const router = useRouter();
  const { state, ...rest } = router.query;

  const redirect = encodeURIComponent(state as string);
  console.log(rest.code, state);
  useEffect(() => {
    (async () => {
      const res = await http.get('/auth/google/redirect', {
        params: { ...rest, redirect },
      });
      console.log(res);
    })();
  }, [rest, redirect]);
  return <div></div>;
}

export default Page;
