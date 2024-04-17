import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../feature/User/UserSlice";
import MovieSlice from "../feature/Movie/MovieSlice";


export const store = configureStore({
    reducer: {
        user: UserSlice,
        movies:MovieSlice


    }
})


export default store