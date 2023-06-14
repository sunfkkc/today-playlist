import { GlobalPortal } from '@/GlobalPortal';
import useScrollEndDetection from '@/hooks/useScrollEndDetection';
import { css } from '@emotion/react';
import React, { ReactNode, useRef, createContext } from 'react';

export const ScrollContext = createContext({
  isBottom: false,
});

function Layout({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isBottom = useScrollEndDetection(ref);

  return (
    <div
      ref={ref}
      css={css`
        position: relative;
        width: 350px;
        height: 100vh;
        background-image: url('/images/Rectangle\ 30.png');
        background-repeat: no-repeat;
        background-size: cover;
        margin: 0 auto;

        @media (max-width: 425px) {
          width: 100%;
        }
        overflow-y: scroll;
        padding: 0 16px;
      `}
    >
      <ScrollContext.Provider value={{ isBottom }}>
        <GlobalPortal.Provider>{children}</GlobalPortal.Provider>
      </ScrollContext.Provider>
    </div>
  );
}

export default Layout;
