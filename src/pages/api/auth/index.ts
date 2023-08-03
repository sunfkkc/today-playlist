// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    nickname: '김기찬',
    profileImgUrl: 'https://static.toss.im/icons/svg/icon-toss-logo.svg',
  });
}
