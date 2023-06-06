import classNames from 'classnames';
import React, { useState } from 'react';
import Text from './Text';
import { Icons } from '.';
import { colors } from '@/constants/colors';
import { GlobalPortal } from '@/GlobalPortal';
import { css } from '@emotion/react';
//TODO: 모바일에서 탭 선택시 backdrop이 남아있는 문제

const menus = [
  { title: '홈', icon: 'Home24' },
  { title: '플리등록', icon: 'PlusList24' },
  { title: '찜한플리', icon: 'Heart24' },
  { title: '마이', icon: 'My24' },
] as const;

type Menu = (typeof menus)[number];
type Titles = Menu['title'];

function BottomTab() {
  const [selected, setSelected] = useState<Titles>('홈');

  return (
    <GlobalPortal.Consumer>
      <div
        css={css`
          position: fixed;
          bottom: 0;
          width: 100%;
          max-width: 350px;
          @media (max-width: 500px) {
            max-width: none;
          }
        `}
      >
        <div className={classNames('bottom-tab')}>
          {menus.map((menu) => {
            const Icon = Icons[menu.icon];
            return (
              <div
                key={menu.title}
                className={classNames('bottom-tab__item')}
                onClick={() => {
                  setSelected(menu.title);
                }}
              >
                {selected === menu.title && (
                  <div
                    className={classNames('bottom-tab__item__backdrop')}
                  ></div>
                )}
                <div
                  className={classNames('bottom-tab__item__icon', {
                    'bottom-tab-selected': selected === menu.title,
                  })}
                >
                  <Icon
                    width={24}
                    height={24}
                    stroke={
                      selected === menu.title ? colors.blue600 : colors.white
                    }
                  />
                </div>

                <div className={classNames('bottom-tab__item__title')}>
                  <Text
                    typography="cp"
                    color={
                      selected === menu.title ? colors.blue600 : colors.white
                    }
                  >
                    {menu.title}
                  </Text>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </GlobalPortal.Consumer>
  );
}

export default BottomTab;
