// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Playlist } from '@/hooks/usePlaylists';
import type { NextApiRequest, NextApiResponse } from 'next';

const playlists = Array.from(Array(12).keys()).map(
  (id): Playlist => ({
    playlistId: id + '',
    hashtag: ['출퇴근길', '집중타임', '새벽감성', '와인과함께'],
    isLiked: true,
    likeCount: id * 1000,
    thumbnailUrl: 'https://picsum.photos/160',
    title:
      '[Playlist] 봄볕이 드는 창가에 앉아 🕊 | 나른한 주말, 커피 한 잔과 함께하는 휴식',
    viewCount: id * 1000,
  })
);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const page = Number(req.query.page);
  const size = Number(req.query.size);

  const totalCount = playlists.length;
  const totalPage = Math.round(totalCount / size);

  res.status(200).json({
    playlists: playlists.slice((page - 1) * size, page * size),
    currentPage: page,
    size,
    totalCount,
    totalPage,
  });
}
