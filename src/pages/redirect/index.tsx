import http from '@/http';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

function Page() {
  const router = useRouter();
  const { state, ...rest } = router.query;

  useEffect(() => {
    if (state && rest) {
      const params = { ...rest, redirect: state as string };

      const queryString = new URLSearchParams(params).toString();
      window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URI}/redirect?${queryString}`;
    }
  }, [state, rest]);
  return <div></div>;
}

export default Page;
