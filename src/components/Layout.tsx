import { css } from '@emotion/react';
import React, { ReactNode } from 'react';

function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      css={css`
        width: 350px;
        height: 100vh;
        background-image: url('/images/Rectangle\ 30.png');
        background-repeat: no-repeat;
        background-size: cover;
        margin: 0 auto;

        @media (max-width: 400px) {
          width: 100%;
        }
      `}
    >
      {children}
    </div>
  );
}

export default Layout;
