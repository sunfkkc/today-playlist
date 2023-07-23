import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    searchResults: [
      {
        videoId: 'jeqdYqsrsA0' + 1,
        title: 'title1',
        thumbnailUrl: 'https://i.ytimg.com/vi/jeqdYqsrsA0/default.jpg',
      },
      {
        videoId: 'jeqdYqsrsA0' + 2,
        title: 'title2',
        thumbnailUrl: 'https://i.ytimg.com/vi/jeqdYqsrsA0/default.jpg',
      },
      {
        videoId: 'jeqdYqsrsA0' + 3,
        title: 'title3',
        thumbnailUrl: 'https://i.ytimg.com/vi/jeqdYqsrsA0/default.jpg',
      },
      {
        videoId: 'jeqdYqsrsA0' + 4,
        title: 'title4',
        thumbnailUrl: 'https://i.ytimg.com/vi/jeqdYqsrsA0/default.jpg',
      },
      {
        videoId: 'jeqdYqsrsA0' + 5,
        title: 'title5',
        thumbnailUrl: 'https://i.ytimg.com/vi/jeqdYqsrsA0/default.jpg',
      },
    ],
  });
}
