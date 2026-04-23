import React from 'react'
import { Link } from 'react-router-dom';

const VideoCard = ({ data, i }) => {

  let title = data?.snippet?.localized?.title;
  if (title?.length > 45) title = title.substring(0, 45) + '...';
  
  // Mock duration since youtube API doesn't always provide it in basic snippet list
  const mockDuration = `${Math.floor(Math.random() * 20 + 2)}:${Math.floor(Math.random() * 50 + 10)}`;

  return (


    <div className='w-72  p-3 grow'>
      <Link to={'/watch?v=' + data?.id} >
        <div className='relative'>
          <img src={data?.snippet?.thumbnails?.high?.url} alt={data?.snippet?.localized?.title} className='w-full rounded-xl hover:rounded-none transition-all ease-in dealy-400 cursor-pointer object-cover aspect-video' />
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs font-bold px-1.5 py-0.5 rounded">
            {data?.contentDetails?.duration?.replace("PT","").replace("M",":").replace("S","") || mockDuration}
          </span>
        </div>
        <div className="flex gap-3 mt-3">
          <div className="w-10 h-10 flex-shrink-0">
            <img className='rounded-full w-full h-full object-cover' srcSet={`https://picsum.photos/100/100?random=2${i}`} alt="userimage" />
          </div >
          <div className="flex flex-col" >
            <div className='text-sm font-semibold text-gray-900 leading-tight'>
              {title}

            </div>
            <div className="text-gray-600 text-sm mt-1" >
              <div className='hover:text-gray-900'>

                {data?.snippet?.channelTitle}
              </div>
              <div className='mt-0.5 truncate flex items-center'>
                {Math.round((data?.statistics?.viewCount || Math.random() * 100000) / 1000) + 'K views'} <span className="mx-1 text-[10px]">•</span> {Math.floor(Math.random() * 11 + 1)} months ago
              </div>
            </div >
          </div >
        </div >
      </Link>
    </div >
  )
}
export const BoxShadowVideoCard = function boxShadowVideoCard({ data }) {
  return <div className='shadow'>
    <VideoCard data={data} />
  </div>
}
export default VideoCard