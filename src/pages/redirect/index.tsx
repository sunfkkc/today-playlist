import http from '@/http';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

function Page() {
  const router = useRouter();
  const { state, ...rest } = router.query;

  console.log(rest.code, state);
  useEffect(() => {
    (async () => {
      const res = await http.get('/auth/google/redirect', { params: rest });
      console.log(res);
    })();
  }, [rest]);
  return <div></div>;
}

export default Page;
