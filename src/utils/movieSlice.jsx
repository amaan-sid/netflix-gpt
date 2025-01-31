import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice ({  
    name: 'movie',
    initialState: {
        nowPlaying: null,
        Popular: null,
        TopRated: null,
        Upcoming: null,
        mainTrailor: null,
    },
    reducers: {
        addNowPlayingMovie: (state, action) => {
            // console.log("Updating Redux state of nowPlaying :", action.payload);
            state.nowPlaying = action.payload;
        },
        addPopularMovie: (state, action) => {
            // console.log("Updating Redux state of nowPlaying :", action.payload);
            state.Popular = action.payload;
        },
        addTopRatedMovie: (state, action) => {
            // console.log("Updating Redux state of nowPlaying :", action.payload);
            state.TopRated = action.payload;
        },
        addUpcomingMovie: (state, action) => {
            // console.log("Updating Redux state of nowPlaying :", action.payload);
            state.Upcoming = action.payload;
        },
        addMainTrailor: (state, action) => {
            // console.log("Updating Redux state of trailor :", action.payload);
            state.mainTrailor = action.payload;
        },
        removeMovie: (state) => {
            return null;
        },
    },
})

export const { addNowPlayingMovie,addMainTrailor,addPopularMovie, addUpcomingMovie, addTopRatedMovie, removeMovie } = movieSlice.actions;
export default movieSlice.reducer;