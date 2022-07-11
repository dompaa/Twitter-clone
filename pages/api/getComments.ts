// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { groq } from 'next-sanity'
import { sanityClient } from '../../sanity';
import { Comment } from '../../typings';


//groq  call fetches the appropriate comments associated to a certain tweet
const commentQuery = groq`*[_type == "comment" && references(*[_type== 'tweet' && _id == $tweetId]._id)] {
    _id,
    ...
  } | order(_createdAt desc)`

type Data = Comment[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { tweetId } = req.query

    const comments: Comment[] = await sanityClient.fetch(commentQuery, {
        // if the same value you do not have to repeat tweetId = tweetId
        tweetId,
    })

    console.log('Comments >>>', comments); 
    
  res.status(200).json(comments)
}
