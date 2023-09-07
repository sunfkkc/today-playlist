import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import { useResetEnrollPlaylistForm } from './atoms/enrollPlaylistForm';

let before = '';

function AppProvider({ children }: { children: ReactElement }) {
  const router = useRouter();
  const reset = useResetEnrollPlaylistForm();
  useEffect(() => {
    const cur = router.pathname;

    if (cur !== '/add' && before === '/update') {
      reset();
    }
    return () => {
      before = cur;
    };
  }, [router.pathname, reset]);
  return children;
}

export default AppProvider;
