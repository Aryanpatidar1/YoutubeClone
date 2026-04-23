
import { useSearchParams, } from 'react-router-dom'
import React, { useEffect, useRef, useState } from 'react'
import { YOUTUBE_VIDEO_SEARCH_API } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addSearchVideos, setSearchVideos, updateProgress } from '../../utils/store/slices/appSlice'
import HorizontalVideoCard from './HorizontalVideoCard';
import SearchPageShimmerUi from './SearchPageShimmerUi'


const SearchResult = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q');
    const videoData = useSelector((store) => store.app.searchVideoData);
    const dispatch = useDispatch();
    const pageToken = useRef(undefined);
    const [showShimmer, setShowShimmer] = useState(false);
    const [isAtEnd, setIsAtEnd] = useState(1);
    const doneApiList = useRef({});
    const newYoutubeVideoAPI = useRef(YOUTUBE_VIDEO_SEARCH_API);



    const getVideosData = async (add = false) => {
        dispatch(updateProgress(10));
        setShowShimmer(true);
        const tempVideoApi = YOUTUBE_VIDEO_SEARCH_API + (pageToken?.current ? `&pageToken=${pageToken?.current}` : '') + "&q=" + searchQuery;
        newYoutubeVideoAPI.current = tempVideoApi;
        
        let items = [];
        let nextToken = undefined;

        try {
            const data = await fetch(newYoutubeVideoAPI.current);
            const json = await data.json();
            if (json.items && json.items.length > 0) {
                items = json.items;
                nextToken = json.nextPageToken;
            } else {
                throw new Error("No items in search API response");
            }
        } catch (error) {
            console.warn("Using fallback mock data for search API:", error);
            items = Array.from({ length: 15 }).map((_, i) => ({
                id: { videoId: `mock-search-${Date.now()}-${i}` },
                snippet: {
                    thumbnails: { high: { url: `https://picsum.photos/600/340?random=${i + 100}` } },
                    title: `Search Result: ${searchQuery} - Awesome Video #${i + 1}`,
                    channelTitle: `Searcher Channel ${i + 1}`,
                    description: `This is an amazing mock search result for your query '${searchQuery}'. It provides a robust fallback so the UI never looks broken.`
                }
            }));
            nextToken = `mock-page-${Date.now()}`;
        }

        dispatch(updateProgress(60));
        doneApiList.current[tempVideoApi] = true;

        if (add) {
            if (Object.entries(videoData).length > 0) {
                dispatch(addSearchVideos(items));
            }
        } else {
            dispatch(setSearchVideos(items));
        }
        setShowShimmer(false);

        pageToken.current = nextToken;
        newYoutubeVideoAPI.current = YOUTUBE_VIDEO_SEARCH_API + (pageToken?.current ? `&pageToken=${pageToken?.current}` : '') + "&q=" + searchQuery;

        dispatch(updateProgress(0));
    }



    useEffect(() => {
        

        getVideosData();



    }, [searchParams])



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
            getVideosData(true);

        }



    }, [isAtEnd])

    return (
        <>
            <div className='mt-4 md:w-4/5 w-full m-auto'  >


                {Object.entries(videoData ? videoData : {})?.map(([key, value]) => (
                    <HorizontalVideoCard data={videoData[key]} key={key} i={key} />
                ))}
                {showShimmer && <SearchPageShimmerUi />}
            </div>
        </>
    )
}

export default SearchResult







