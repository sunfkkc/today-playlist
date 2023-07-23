import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { playlistid },
  } = req;
  const id = Number(playlistid) + 1;

  res.status(200).json({
    playlistId: id + '',
    hashtag: ['출퇴근길', '집중타임', '새벽감성', '와인과함께'],
    isLiked: false,
    likeCount: id * 1000,
    thumbnailUrl: 'https://picsum.photos/350/360',
    title:
      '[Playlist] 봄볕이 드는 창가에 앉아 🕊 | 나른한 주말, 커피 한 잔과 함께하는 휴식',
    viewCount: id * 1000,
    songs: Array.from(Array(15).keys()).map((i) => ({
      videoId: 'jeqdYqsrsA0',
      title: `케이시(Kassy) - 그때가 좋았어${i}`,
      length: '03:56',
    })),
  });
}
