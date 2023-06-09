import { GlobalPortal } from '@/GlobalPortal';
import { css } from '@emotion/react';
import React, { ReactNode } from 'react';

function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      css={css`
        box-sizing: border-box;
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
        overflow-y: hidden;
        padding: 0 16px;
      `}
    >
      <GlobalPortal.Provider>{children}</GlobalPortal.Provider>
    </div>
  );
}

export default Layout;
