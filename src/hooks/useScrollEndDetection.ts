import throttle from '@/utils/throttle';
import { useEffect, useState } from 'react';

const useScrollEndDetection = (ref: React.RefObject<HTMLDivElement>) => {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (ref.current) {
        const { scrollTop, scrollHeight, clientHeight } = ref.current;

        if (clientHeight + scrollTop >= scrollHeight) {
          setIsBottom(true);
        } else {
          setIsBottom(false);
        }
      }
    }, 1000);
    const currentRef = ref.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, [ref]);

  return isBottom;
};

export default useScrollEndDetection;
