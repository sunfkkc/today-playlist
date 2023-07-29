import { Header } from '@/components';
import PlaylistItem from '@/components/PlaylistItem';
import usePlaylists from '@/hooks/usePlaylists';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useRef } from 'react';

function Page() {
  const router = useRouter();
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
          onClick={() => router.push(`/detail/${props.playlistId}`)}
        />
      ))}
    </div>
  );
}

export default Page;
