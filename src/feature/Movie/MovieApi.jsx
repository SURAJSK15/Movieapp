import axios from "axios";



export async function FetchMovie(data) {

    try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=f549d66e&s=${data}`);

        const responseData = response.data.Search;

        return responseData;
    } catch (error) {

        throw error;
    }

}

export async function FectchMovieDetail(id) {
    try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=f549d66e&i=${id}`);

        const responseMovie = response.data;

        return responseMovie;
    }
    catch (error) {
        throw error;
    }
}