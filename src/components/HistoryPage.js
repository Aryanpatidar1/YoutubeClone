import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const HistoryPage = () => {
    const videoHistory = useSelector((store) => store.app.videoHistory);
    const historyItems = Object.values(videoHistory || {}).reverse();

    return (
        <div className='w-full md:w-3/4 mx-auto mt-6 p-4'>
            <h1 className='text-3xl font-bold mb-6'>Watch History</h1>
            
            {historyItems.length === 0 ? (
                <div className='text-gray-500 text-lg'>You have no recently watched videos.</div>
            ) : (
                <div className='flex flex-col gap-5'>
                    {historyItems.map((video) => {
                        // Handle both search id structure and normal video id structure
                        const videoId = typeof video.id === 'object' ? video.id.videoId : video.id;
                        const title = video?.snippet?.localized?.title || video?.snippet?.title;
                        const thumbnail = video?.snippet?.thumbnails?.high?.url || video?.snippet?.thumbnails?.default?.url || `https://picsum.photos/400/225?random=${videoId}`;
                        const channelTitle = video?.snippet?.channelTitle || 'YouTube Channel';

                        return (
                            <Link key={videoId} to={`/watch?v=${videoId}`}>
                                <div className='flex gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200'>
                                    <div className='w-48 sm:w-64 flex-shrink-0 relative'>
                                        <img className='w-full rounded-xl aspect-video object-cover' src={thumbnail} alt={title} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <h2 className='text-lg sm:text-xl font-semibold leading-tight line-clamp-2'>{title}</h2>
                                        <div className='text-sm text-gray-600 mt-1 sm:mt-2 mb-1'>{channelTitle}</div>
                                        <div className='text-xs text-gray-500 hidden sm:block line-clamp-2'>
                                            {video?.snippet?.description || "You watched this video previously."}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default HistoryPage;
