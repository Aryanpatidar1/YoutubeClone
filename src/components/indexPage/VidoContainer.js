import React, { useEffect, useRef, useState } from 'react'
import VideoCard from './VideoCard'
import { YOUTUBE_VIDEO_API } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addVideos, updateProgress } from '../../utils/store/slices/appSlice'
import ShimmerContainer from './ShimmerContainer'
import { fetchVideoData } from '../helper'


const VidoContainer = () => {



    const videoData = useSelector((store) => store.app.videoData);
    const dispatch = useDispatch();
    const pageToken = useRef(undefined);
    const [showShimmer, setShowShimmer] = useState(false);
    const [isAtEnd, setIsAtEnd] = useState(1);
    const doneApiList = useRef({});
    const newYoutubeVideoAPI = useRef(YOUTUBE_VIDEO_API);

    const getVideosData = async () => {
        dispatch(updateProgress(10));
        setShowShimmer(true);
        doneApiList.current[newYoutubeVideoAPI.current] = true;
        const json = await fetchVideoData(newYoutubeVideoAPI.current);
        dispatch(updateProgress(40));


        dispatch(addVideos(json.items));

        dispatch(updateProgress(70));
        setShowShimmer(false);
        pageToken.current = json?.nextPageToken;
        newYoutubeVideoAPI.current = YOUTUBE_VIDEO_API + (pageToken.current ? `&pageToken=${pageToken.current}` : '');

        dispatch(updateProgress(100));
        dispatch(updateProgress(0));



    }

    useEffect(() => {
        if (Object.keys(videoData).length === 0) {

            getVideosData();
        }



    }, [])
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight) {
            setIsAtEnd((e) => e + 1);
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    useEffect(() => {


        if (doneApiList.current[newYoutubeVideoAPI.current] === undefined) {
            getVideosData();
        }


    }, [isAtEnd])



    return (
        <>
            <div className='mt-4 flex flex-wrap'  >
                {Object.entries(videoData ? videoData : {})?.map(([key, value], index) => (
                    <React.Fragment key={key}>
                        {index === 8 && (
                            <div className='w-full px-5 py-4 my-4 border-t-4 border-b-4 border-gray-100'>
                                <div className='flex items-center mb-4'>
                                    <div className='bg-red-600 text-white p-1.5 rounded mr-3'>
                                        <i className="fa-solid fa-bolt fa-lg"></i>
                                    </div>
                                    <h2 className='text-xl font-bold'>Shorts</h2>
                                </div>
                                <div className='flex gap-4 overflow-x-auto hide-scroll-bar pb-2'>
                                    {[1, 2, 3, 4, 5, 6].map(i => (
                                        <div key={i} className='min-w-[160px] cursor-pointer'>
                                            <img src={`https://picsum.photos/400/700?random=1${i}`} alt={`Short ${i}`} className='rounded-xl w-full h-[280px] object-cover hover:brightness-90 transition-all' />
                                            <div className='mt-2 font-semibold text-sm line-clamp-2 leading-tight'>
                                                Amazing Short Video #{i}
                                            </div>
                                            <div className='text-xs text-gray-500 mt-1'>{Math.floor(Math.random() * 900 + 10)}K views</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <VideoCard data={videoData[key]} i={key} />
                    </React.Fragment>
                ))}
            </div >
            {showShimmer && <ShimmerContainer />}
        </>

    )
}
export default VidoContainer;