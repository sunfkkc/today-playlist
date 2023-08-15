import throttle from '@/utils/throttle';
import { useEffect, useState } from 'react';

const OFFSET = 80;

/**
 * @param {React.RefObject<HTMLDivElement>} ref 이 매개변수는 deprecated 되었습니다.
 */

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

      if (scrollTop + clientHeight >= scrollHeight - OFFSET) {
        setIsBottom(true);
      }
    }, 500);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isBottom;
};

export default useScrollEndDetection;
