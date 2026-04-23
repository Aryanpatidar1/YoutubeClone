import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        isMenuOpen: false,
        videoData: {},
        currentVideoId: null,
        searchVideoData: {},
        videoHistory: {
            'mock-history-1': {
                id: 'mock-history-1',
                snippet: {
                    thumbnails: { default: { url: 'https://picsum.photos/120/90?random=111' } },
                    localized: { title: 'Building a Fullstack App with React' }
                }
            },
            'mock-history-2': {
                id: 'mock-history-2',
                snippet: {
                    thumbnails: { default: { url: 'https://picsum.photos/120/90?random=122' } },
                    localized: { title: 'Top 10 Frontend Interview Questions' }
                }
            },
            'mock-history-3': {
                id: 'mock-history-3',
                snippet: {
                    thumbnails: { default: { url: 'https://picsum.photos/120/90?random=133' } },
                    localized: { title: 'Mastering Redux Toolkit in 2024' }
                }
            }
        },
        progress: 0
    },
    reducers: {
        toggleMenu: (state) => {
            state.isMenuOpen = !state.isMenuOpen;
        },
        addVideos: (state, action) => {
            if (!action.payload) return;
            for (const video of action.payload) {
                state.videoData[video.id] = video;
            }

        },
        addSearchVideos: (state, action) => {
            if (!action.payload) return;
            for (const video of action.payload) {
                state.searchVideoData[video.id.videoId] = video;
            }
        },
        setSearchVideos: (state, action) => {
            state.searchVideoData = {};
            if (!action.payload) return;
            for (const video of action.payload) {
                state.searchVideoData[video.id.videoId] = video;
            }
        },
        addCurrentVideoId: (state, action) => {
            state.currentVideoId = action.payload;
        },
        addVideoInHistory: (state, action) => {
            state.videoHistory[action?.payload?.id] = action.payload;
        },
        updateProgress: (state, action) => {
            state.progress = action.payload
        }

    }
})

export const { toggleMenu, addVideos, addCurrentVideoId, addSearchVideos, setSearchVideos, addVideoInHistory, updateProgress } = appSlice.actions;
export default appSlice.reducer;