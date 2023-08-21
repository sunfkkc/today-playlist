jest.mock('next/router');
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PlaylistItem from '@/components/PlaylistItem';
import { useRouter } from 'next/router';
import userEvent from '@testing-library/user-event';

describe('<PlaylistItem />', () => {
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
        `/enroll?playlistId=${playlistId}&usage=modify`
      );
    });
  });
});
