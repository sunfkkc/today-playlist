import { Header } from '@/components';
import PlaylistItem from '@/components/PlaylistItem';
import usePlaylists from '@/hooks/usePlaylists';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useCallback, useRef } from 'react';

function Page() {
  const router = useRouter();

  const ref = useRef<HTMLDivElement>(null);
  const { playlists } = usePlaylists({
    ref,
    itemHeight: 116,
    url: '/playlists/registered',
  });

  const edit = useCallback(
    (playlistId: string) => {
      router.push(`/enroll?playlistId=${playlistId}&usage=modify`);
    },
    [router]
  );

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
          onClick={() => router.push(`/detail/${props.playlistId}`)}
          editable
          edit={() => edit(props.playlistId)}
        />
      ))}
    </div>
  );
}

export default Page;
