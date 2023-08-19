import { Header } from '@/components';
import PlaylistItem from '@/components/PlaylistItem';
import usePlaylists from '@/hooks/usePlaylists';
import { css } from '@emotion/react';
import { useRef } from 'react';

function Page() {
  const ref = useRef<HTMLDivElement>(null);
  const { playlists } = usePlaylists({
    ref,
    itemHeight: 164,
    url: '/playlists/recentViewed',
  });
  return (
    <div className="homepage-container" ref={ref}>
      <Header title="최근 본 플리" />
      <div
        css={css`
          margin-bottom: 16px;
        `}
      />
      {playlists?.map((props) => (
        <PlaylistItem
          key={props.playlistId}
          {...props}
          style={{ marginBottom: 16, cursor: 'pointer' }}
        />
      ))}
    </div>
  );
}

export default Page;
