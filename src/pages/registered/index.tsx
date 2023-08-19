import { Header } from '@/components';
import PlaylistItem from '@/components/PlaylistItem';
import usePlaylists from '@/hooks/usePlaylists';
import { css } from '@emotion/react';
import { useRef } from 'react';

function Page() {
  const ref = useRef<HTMLDivElement>(null);
  const { playlists } = usePlaylists({
    ref,
    itemHeight: 116,
    url: '/playlists/registered',
  });

  return (
    <div className="homepage-container" ref={ref}>
      <Header title="등록한 플리" />
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
          editable
        />
      ))}
    </div>
  );
}

export default Page;
