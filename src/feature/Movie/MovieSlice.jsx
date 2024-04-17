import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FectchMovieDetail, FetchMovie } from "./MovieApi";





const initialState = {
    status: "idle",
    Allmovie: [],
    selectMovie: [],
};


export const FetchMovieAsync = createAsyncThunk("movie/fetchmovie",
    async (data) => {

        try {
            const response = await FetchMovie(data);

            return response;
        } catch (error) {

            throw error;
        }

    }
)

export const FetchMovieByidAsync = createAsyncThunk("movie/fectchbyid",
    async (id) => {
        try {
            const response = await FectchMovieDetail(id);   
            return response
        }
        catch (error) {
            throw error;
        }
    }
)


export const MovieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder

            .addCase(FetchMovieAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(FetchMovieAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.Allmovie = action.payload;
            })
            .addCase(FetchMovieByidAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(FetchMovieByidAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.selectMovie = action.payload;
            })
    }

})

export const fetchMovie = (state) => state.movies.Allmovie;
export const Selectmovieid = (state) => state.movies.selectMovie;
export default MovieSlice.reducer;





