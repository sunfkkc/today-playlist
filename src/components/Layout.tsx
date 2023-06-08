import { GlobalPortal } from '@/GlobalPortal';
import { css } from '@emotion/react';
import React, { ReactNode } from 'react';

function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      css={css`
        position: relative;
        width: 350px;
        height: 100vh;
        background-image: url('/images/Rectangle\ 30.png');
        background-repeat: no-repeat;
        background-size: cover;
        margin: 0 auto;
        //TODO: 글로벌 패딩 값을 주면 바텀 탭이 영역을 넘어감
        //padding: 0 16px;

        @media (max-width: 425px) {
          width: 100%;
        }
      `}
    >
      <GlobalPortal.Provider>{children}</GlobalPortal.Provider>
    </div>
  );
}

export default Layout;
