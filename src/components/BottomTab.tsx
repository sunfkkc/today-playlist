import classNames from 'classnames';
import React, { useState } from 'react';
import Text from './Text';
import { Icon } from '.';
import { colors } from '@/constants/colors';
import { GlobalPortal } from '@/GlobalPortal';
import { useRouter } from 'next/router';
import Link from 'next/link';

function BottomTab() {
  const router = useRouter();
  const [selected, setSelected] = useState<string>(router.pathname);

  const menus = [
    {
      title: '홈',
      icon: 'Home24',
      path: '/',
    },
    {
      title: '플리등록',
      icon: 'PlusList24',
      path: '/update',
    },
    {
      title: '찜한플리',
      icon: 'Heart24',
      path: '/like',
    },
    {
      title: '마이',
      icon: 'My24',
      path: '/my',
    },
  ] as const;

  return (
    <GlobalPortal.Consumer>
      <div className={classNames('bottom-tab')}>
        {menus.map((menu) => {
          return (
            <div key={menu.title} className={classNames('bottom-tab__item')}>
              <Link href={menu.path} key={menu.title}>
                {selected === menu.path && (
                  <div className={classNames('bottom-tab__item__backdrop')} />
                )}
                <div
                  className={classNames('bottom-tab__item__icon', {
                    'bottom-tab-selected': selected === menu.path,
                  })}
                >
                  <Icon
                    name={menu.icon}
                    color={selected === menu.path ? 'blue600' : 'white'}
                  />
                </div>

                <div className={classNames('bottom-tab__item__title')}>
                  <Text
                    typography="cp"
                    color={
                      selected === menu.path ? colors.blue600 : colors.white
                    }
                  >
                    {menu.title}
                  </Text>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </GlobalPortal.Consumer>
  );
}

export default BottomTab;
