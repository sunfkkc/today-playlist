import throttle from '@/utils/throttle';
import { useEffect, useState } from 'react';

const useScrollEndDetection = (ref?: React.RefObject<HTMLDivElement>) => {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;

      if (scrollTop + clientHeight === scrollHeight) {
        setIsBottom(true);
      }
    }, 500);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isBottom;
};

export default useScrollEndDetection;
