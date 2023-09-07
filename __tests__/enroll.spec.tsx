jest.mock('next/router');

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageUploader from '@/domain/update-playlist/components/ImageUploader';
import TagUploader from '@/domain/update-playlist/components/TagUploader';
import PlaylistViewer from '@/domain/update-playlist/components/PlaylistViewer';
import { Form } from '@/domain/update-playlist/atoms/form';
import { useRouter } from 'next/router';

describe('플리 등록 테스트', () => {
  it('사진이 정상적으로 업로드 된다.', async () => {
    const mockedHandleFileChange = jest.fn();
    render(<ImageUploader handleFileChange={mockedHandleFileChange} />);
    const origin = URL.createObjectURL;
    URL.createObjectURL = jest.fn();

    const button = await screen.findByTestId('select-image-button');
    expect(button).toBeInTheDocument();

    const image = new File(['(⌐□_□)'], 'testImage.png', { type: 'image/png' });

    const fileInput = await screen.findByTestId('file-input');

    fireEvent.change(fileInput, { target: { files: [image] } });

    expect(await screen.findByTestId('selected-image')).toBeInTheDocument();
    expect(mockedHandleFileChange).toHaveBeenCalled();

    URL.createObjectURL = origin;
  });

  it('태그가 입력되지 않으면 추가 되지 않는다.', async () => {
    const mockedSetTags = jest.fn();
    render(<TagUploader setTags={mockedSetTags} />);

    userEvent.click(await screen.findByTestId('add-button'));

    expect(mockedSetTags).not.toHaveBeenCalled();
  });

  it('태그가 정상적으로 추가된다', async () => {
    const tag = '새벽감성';

    const mockedSetTags = jest.fn();

    render(<TagUploader setTags={mockedSetTags} />);

    const input = await screen.findByTestId('input');

    fireEvent.change(input, { target: { value: tag } });

    userEvent.click(await screen.findByTestId('add-button'));

    await waitFor(() => expect(mockedSetTags).toHaveBeenCalledTimes(1));
  });

  it('태그가 정상적으로 제거된다', async () => {
    const mockedSetTags = jest.fn();

    render(<TagUploader setTags={mockedSetTags} tags={['새벽감성']} />);

    expect(await screen.findByText('#새벽감성')).toBeInTheDocument();

    userEvent.click(await screen.findByTestId('remove-button-0'));

    await waitFor(() => expect(mockedSetTags).toHaveBeenCalledTimes(1));
  });

  it('노래 목록이 정상적으로 노출된다', async () => {
    const songs: Form['songs'] = [{ id: '0', time: '03:56', title: '제목1' }];

    render(<PlaylistViewer songs={songs} />);

    expect(await screen.findByText('제목1')).toBeInTheDocument();
    expect(await screen.findByText('03:56')).toBeInTheDocument();
  });

  it('플레이리스트 추가 버튼을 누르면 추가 페이지로 이동된다', async () => {
    render(<PlaylistViewer />);

    userEvent.click(await screen.findByTestId('add-button'));

    await waitFor(() => {
      expect(useRouter().push).toHaveBeenCalledWith('/add');
    });
  });
});
