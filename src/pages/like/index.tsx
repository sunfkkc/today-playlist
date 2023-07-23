import { BottomTab, Header, TextFieldLine } from '@/components';
import PlaylistItem from '@/components/PlaylistItem';
import useLayoutHeight from '@/hooks/useLayoutHeight';
import usePlaylists from '@/hooks/usePlaylists';
import useScrollEndDetection from '@/hooks/useScrollEndDetection';
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

const ITEM_HEIGHT = 164;

function Page() {
  const ref = useRef<HTMLDivElement>(null);
  const isBottom = useScrollEndDetection(ref);
  const height = useLayoutHeight();
  const { playlists, fetchNextPage } = usePlaylists({
    size: 4,
  });

  useEffect(() => {
    if (isBottom) {
      fetchNextPage();
    }
  }, [isBottom, fetchNextPage]);

  return (
    <div ref={ref} className="homepage-container">
      <Header title="찜한 플리" />
      <TextFieldLine />
      {playlists?.map((props) => (
        <PlaylistItem key={props.playlistId} {...props} />
      ))}
      <BottomTab />
    </div>
  );
}

export default Page;

const Container = styled.div`
  height: 100vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  padding-top: 16px;
`;
