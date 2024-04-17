import axios from 'axios';




export async function LogInUser(data) {
    try {
        const email = data.email;
        const password = data.password;

        const response = await axios.get(`http://localhost:3000/user/?email=${email}`);
        const userData = response.data;

        if (userData.length > 0) {
            if (password === userData[0].password) {
                delete userData[0].password;
                return userData[0];
            } else {
                throw new Error("Password is incorrect");
            }
        } else {
            throw new Error("User not found");
        }

    } catch (error) {
        throw error;
    }
}



export async function CreateUser(data) {
    try {

        const email = data.email;

        const checkemail = await axios.get(`http://localhost:3000/user/?email=${email}`);
        if (checkemail.data.length > 0) {
            throw new Error("Email already registered");

        }

        const result = await axios.post("http://localhost:3000/user", data);
        return result.data;
    }
    catch (error) {
        throw error;
    }
}

export async function AddWatchListMovie(data) {
    const { movieid, userid } = data;

    try {
        
        const watchlistResponse = await axios.get(`http://localhost:3000/watchlist/?userid=${userid}&movieid=${movieid}`);
        if (watchlistResponse.data.length > 0) {
            throw new Error("Movie already exists in watchlist");
        }

        
        const response = await axios.get(`https://www.omdbapi.com/?apikey=f549d66e&i=${movieid}`);
        const responseMovie = response.data;
        const { Title, Released, Poster, Plot } = responseMovie;

       
        const FilterData = {
            userid: userid,
            Title: Title,
            movieid: movieid,
            release: Released,
            poster: Poster,
            plot: Plot
        };

      
        const addMovieResponse = await axios.post("http://localhost:3000/watchlist", FilterData);
        
        return addMovieResponse.data;
    } catch (error) {
    
        console.error('Error adding movie to watchlist:', error);
        throw error;
    }
}


export async function FetchWatchlistByuser(data) {
    try {
        const response = await axios.get(`http://localhost:3000/watchlist/?userid=${data}`);

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function RemovieMovie(data) {
    try {
        const response = await axios.delete(`http://localhost:3000/watchlist/${data}`);

        return response.data;
    } catch (error) {
        throw error
    }
}
