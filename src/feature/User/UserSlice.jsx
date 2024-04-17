import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddWatchListMovie, CreateUser, FetchWatchlistByuser, LogInUser, RemovieMovie } from "./UserApi";



const initialState = {

    status: 'idle',
    User: [],
    UserInfo: null,
    logUser: null,
    watchList: [],
    AddWatchlist: []


};




export const AddNewUserAsync = createAsyncThunk('user/register',
    async (data, { reject }) => {

        try {
            const response = await CreateUser(data);
            return response;
        }
        catch (error) {
            throw error;

        }
    }
)



export const AddWatchListAsync = createAsyncThunk("user/addwatchlist",
    async (data) => {

        try {
            const response = await AddWatchListMovie(data);
           
            return response;
        }
        catch (error) {
           
            throw error
        }

    });

export const WatchListAsync = createAsyncThunk("user/watchlist",
    async (data) => {
        try {
            const response = await FetchWatchlistByuser(data);
            console.log(data)
            return response;
        }
        catch (error) {
            throw error
        }

    })

export const RemoveMovieAsync = createAsyncThunk("user/removeMovie",
    async (data) => {
        try {
            const response = await RemovieMovie(data);
            return response;
        }
        catch (error) {
            throw error
        }
    }
)

export const LogInUserAsync = createAsyncThunk("user/login",
    async (data) => {
        try {

            const response = await LogInUser(data);
            return response;
        }
        catch (error) {
            console.log(error)
            throw error;
        }
    })


export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder

            .addCase(AddNewUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(AddNewUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.User = action.payload;
            })
            .addCase(LogInUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(LogInUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.logUser = action.payload;
            })
            .addCase(LogInUserAsync.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            })
            .addCase(AddWatchListAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(AddWatchListAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.watchList = action.payload;
            })
            .addCase(WatchListAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(WatchListAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.AddWatchlist = action.payload;
            })
            .addCase(RemoveMovieAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(RemoveMovieAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.AddWatchlist = state.AddWatchlist.filter(movie => movie.id !== action.payload.id);
            })
            .addCase(RemoveMovieAsync.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            });
    },
});

export const createUser = (state) => state.user.User;
export const loginUser = (state) => state.user.logUser;
export const watchListData = (state) => state.user.watchList;
export const watchListByUser = (state) => state.user.AddWatchlist;

export default UserSlice.reducer;

