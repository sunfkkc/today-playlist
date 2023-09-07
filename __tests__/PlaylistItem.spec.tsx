jest.mock('next/router');
jest.mock('@/http');

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PlaylistItem from '@/components/PlaylistItem';
import { useRouter } from 'next/router';
import http from '@/http';
import userEvent from '@testing-library/user-event';

describe('<PlaylistItem /> 컴포넌트 테스트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('플레이 리스트를 클릭하면 상세 페이지로 이동한다.', async () => {
    render(<PlaylistItem title="테스트 플레이리스트" playlistId="123" />);

    const playlistItem = await screen.findByTestId('playlist-item-container');

    expect(playlistItem).toBeInTheDocument();

    userEvent.click(playlistItem);

    await waitFor(() => {
      expect(useRouter().push).toHaveBeenCalledWith('/detail/123');
    });
  });

  it('플레이 리스트 수정을 누르면 수정 페이지로 이동한다.', async () => {
    const playlistId = '123';
    render(
      <PlaylistItem
        title="테스트 플레이리스트"
        playlistId={playlistId}
        editable
      />
    );

    const editIcon = await screen.findByTestId('edit-icon');

    userEvent.click(editIcon);

    await waitFor(() => {
      expect(useRouter().push).toHaveBeenCalledWith(
        `/update?playlistId=${playlistId}&usage=modify`
      );
    });
  });

  it('좋아요를 누르면 아이콘이 바뀌고 좋아요 카운트가 1 증가하고 api 요청이 발생한다', async () => {
    const playlistId = '123';
    const likeCount = 0;

    render(
      <PlaylistItem
        title="테스트 플레이리스트"
        playlistId={playlistId}
        isLiked={false}
        likeCount={likeCount}
      />
    );
    const outlinedIcon = await screen.findByTestId('outlined-heart-icon');

    expect(outlinedIcon).toBeInTheDocument();

    userEvent.click(outlinedIcon);

    const filledIcon = await screen.findByTestId('filled-heart-icon');

    expect(filledIcon).toBeInTheDocument();
    expect(await screen.findByText(1));

    await waitFor(() => {
      expect(http.patch).toHaveBeenCalledWith(`/playlists/like`, {
        playlistId,
        like: true,
      });
    });
  });

  it('좋아요를 해제하면 아이콘이 바뀌고 좋아요 카운트가 1 감소하고 api 요청이 발생한다', async () => {
    const playlistId = '123';
    const likeCount = 1;

    render(
      <PlaylistItem
        title="테스트 플레이리스트"
        playlistId={playlistId}
        isLiked={true}
        likeCount={likeCount}
      />
    );
    const filledIcon = await screen.findByTestId('filled-heart-icon');

    expect(filledIcon).toBeInTheDocument();

    userEvent.click(filledIcon);

    const outlinedIcon = await screen.findByTestId('outlined-heart-icon');

    expect(outlinedIcon).toBeInTheDocument();
    expect(await screen.findByText(0));

    await waitFor(() => {
      expect(http.patch).toHaveBeenCalledWith(`/playlists/like`, {
        playlistId,
        like: false,
      });
    });
  });
});
