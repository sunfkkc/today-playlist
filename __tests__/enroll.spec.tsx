import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageUploader from '@/domain/enroll-playlist/components/ImageUploader';
import TagUploader from '@/domain/enroll-playlist/components/TagUploader';

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
    const mockedAddTag = jest.fn();
    render(<TagUploader addTagHandler={mockedAddTag} />);

    userEvent.click(await screen.findByTestId('add-button'));

    expect(mockedAddTag).not.toHaveBeenCalled();
  });

  it('태그가 정상적으로 추가되고 삭제된다.', async () => {
    const tags = ['새벽감성', '출퇴근길', '집중타임'];

    render(<TagUploader />);

    const input = await screen.findByTestId('input');

    for (const tag of tags) {
      fireEvent.change(input, { target: { value: tag } });

      userEvent.click(await screen.findByTestId('add-button'));
      expect(await screen.findByText(`#${tag}`)).toBeInTheDocument();
    }

    //TODO: 태그 삭제 테스트
    screen.debug();
    userEvent.click(await screen.findByTestId(`remove-button-1`));
    expect(screen.queryByText(`#${tags[1]}`)).not.toBeInTheDocument();
  });

  //it('로그인 되지 않으면 마이페이지로 이동된다.', () => {});
});
