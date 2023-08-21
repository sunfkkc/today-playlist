import { Playlist } from '@/hooks/usePlaylists';

export let playlists = Array.from(Array(30).keys()).map(
  (id): Playlist => ({
    playlistId: id + '',
    hashtag: [
      '출퇴근길',
      '집중타임',
      '새벽감성',
      '와인과함께',
      '출퇴근길',
      '집중타임',
      '새벽감성',
      '와인과함께',
      '출퇴근길',
      '집중타임',
      '새벽감성',
      '와인과함께',
    ],
    isLiked: false,
    likeCount: id * 1000,
    thumbnailUrl: 'https://picsum.photos/750',
    title:
      '[Playlist] 봄볕이 드는 창가에 앉아 🕊 | 나른한 주말, 커피 한 잔과 함께하는 휴식',
    viewCount: id * 1000,
    songs: [],
  })
);

export function _like(playlistId: string, value: boolean) {
  playlists[Number(playlistId)].isLiked = value;
  if (value) {
    playlists[Number(playlistId)].likeCount += 1;
  } else {
    playlists[Number(playlistId)].likeCount -= 1;
  }
}
