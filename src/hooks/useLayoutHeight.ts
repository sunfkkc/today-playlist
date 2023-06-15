import { useEffect, useState } from 'react';

const useLayoutHeight = () => {
  const [height, setHeight] = useState<undefined | number>(undefined);
  useEffect(() => {
    setHeight(window.visualViewport?.height);

    return () => setHeight(undefined);
  }, []);

  return height;
};

export default useLayoutHeight;
