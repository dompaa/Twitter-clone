import { RefreshIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import Tweetbox from './Tweetbox'
import TweetComponent from '../components/Tweet'
import { Tweet } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'
import toast from 'react-hot-toast'

interface Props {
  tweets: Tweet[]
}

function Feed({tweets: tweetsProp}: Props) {
  //state gets initialized with your tweets, gets passed down, but have control if refreshing the tweet
  const[tweets, setTweets] = useState<Tweet[]>(tweetsProp)
  console.log(tweets);


  //whenever we call the function replace through the server side render with current ones just fetched
  const handleRefresh = async () => {
    const refreshToast = toast.loading('Refreshing...');
    const tweets = await fetchTweets();
    setTweets(tweets);

    toast.success('Feed Updated!', {
      id: refreshToast
    })
  }
  
  return (
    <div className='col-span-7 border-x max-h-screen overflow-scroll 
     scrollbar-hide lg:col-span-5'>
        <div className='flex items-center justify-between'>
            <h1 className='p-5 pb-0 text-xl font-bold'>Home</h1>
            <RefreshIcon 
            onClick={handleRefresh} 
            className="mr-5 mt-5 h-8 w-8 cursor-pointer text-twitter 
            transition-all duration-500 
            ease-out hover:rotate-180 active:scale-125"/>
        </div>

        {/* Tweetbox */}
        <div>
          <Tweetbox setTweets={setTweets}/>
        </div>

        {/* Feed */}
        <div>
          {tweets.map(tweet => ( 
            <TweetComponent key={tweet._id} tweet={tweet} />
          ))}
        </div>
    </div>
  )
}

export default Feed