
import { Col, Row, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faPlus, faClipboardList, faArrowRightFromBracket, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchMovieAsync, FetchMovieByidAsync, Selectmovieid, fetchMovie } from "./MovieSlice";
import { AddWatchListAsync, WatchListAsync, loginUser, watchListByUser } from "../User/UserSlice";





const ShowAllMovie = () => {
    const dispatch = useDispatch();
    const user = useSelector(loginUser);
    const userid = user ? user.id : null;
    const username = user ? user.user : null;
    const MoviedData = useSelector(fetchMovie);
    const movieInfo = useSelector(watchListByUser);
  
    const movieId = movieInfo.movieid;
    const [addWatchlist, setWatchList] = useState("");
    const [movieName, setMovieName] = useState("");


    const Moviesdata = (val) => {
        const Newmoviename = val.target.value;
        setMovieName(Newmoviename);
    }
useEffect(()=> {
    dispatch(WatchListAsync(userid))
},[dispatch,userid])

    const onSubmitMovie = () => {
        dispatch(FetchMovieAsync(movieName))
    }


    const AddWatchbtn = async (val) => {
        dispatch(FetchMovieByidAsync(val));
        if (user) {
            setWatchList(val);

            try {

                const response = await dispatch(AddWatchListAsync({ userid: user.id, movieid: val, }));
                alert(response.error.message)


            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            alert("Please create an account");
            console.error("User is not defined or doesn't contain the id property");
        }
    };


    return (
        <>
            <div className="movie-watchlist-bg">
                <Container fluid="xxl">
                    <Row>
                        <Col lg={3}>
                            <div className="watchlist-left-section">

                                <div className="watchlist-top-left">
                                    <div className="watchlist-title">
                                        <h5>watchlist</h5>

                                    </div>

                                    <div className="page-navlink active">
                                        <NavLink to="/"> <FontAwesomeIcon icon={faHome} /><span>Home</span> </NavLink>
                                    </div>
                                    <div className="mywatchlist-btn">
                                        <h5><NavLink to="/Mywatchlist"> <FontAwesomeIcon icon={faClipboardList} /><span>My WatchList</span></NavLink></h5>
                                    </div>

                                </div>


                                <div className="watchlist-bottom-left">
                                    <div className="guest-content">
                                        <p><FontAwesomeIcon icon={faUser} /> {username && username ? username : "Guest"}</p>
                                    </div>
                                    <div className="guest-content log-out">
                                        <p><NavLink to="/"><FontAwesomeIcon icon={faArrowRightFromBracket} />Log Out</NavLink></p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={8}>
                            <div className="top-bar">

                            </div>
                            <div className="notification-content-box">
                                <div className="notification-content">
                                    <h5>Welcome to <span>watchlist</span></h5>
                                    <p>Browse movies add them to watchlists and share them with friends<br />
                                        Just click the <FontAwesomeIcon icon={faPlus} /> to add a movie the poster to see more details to mark watch
                                    </p>
                                </div>
                            </div>

                            <div className="main-movie-section">
                                <div className="movie-section-serach">
                                    <input placeholder="" onChange={Moviesdata} /><button type="submit" className="movie-search" onClick={onSubmitMovie}>Submit</button>
                                </div>

                                <div className="all-movie-info">
                                    <Row>
                                        {MoviedData && MoviedData.length > 0 ? (
                                            MoviedData.map((movie, index) => (
                                                movie.Poster !== "N/A" && (
                                                    <Col sm={6} lg={4} key={index}>
                                                        <div className="movie-card">
                                                            <div className="movie-poster">
                                                                <img className="img-fluid" src={movie.Poster} alt={movie.name} />
                                                            </div>
                                                            <div className="movie-content">
                                                                <div className="movie-rating">
                                                                    {/* <p>{movie.rating}</p> */}
                                                                </div>
                                                                <h4>{movie.Title}</h4>
                                                                <p>Relase Year: {movie.Year} </p>
                                                            </div>

                                                            {movieInfo.some(info => info.movieid === movie.imdbID) ? (
                                                                <div className="watchlist-btn check-btn" type="button">
                                                                    <FontAwesomeIcon icon={faCheck} /> watchlist
                                                                </div>
                                                            ) : (
                                                                <div className="watchlist-btn" type="button" onClick={() => AddWatchbtn(movie.imdbID)}>
                                                                    <FontAwesomeIcon icon={faPlus} /> 
                                                                </div>
                                                            )}
                                                            {/* <button type="button" onClick={() => AddWatchbtn(movie.imdbID
                                                            )}>Click</button> */}
                                                        </div>
                                                    </Col>
                                                )
                                            ))
                                        )
                                            : (
                                                <h2 className="nomovie">No Movies Found</h2>
                                            )}

                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default ShowAllMovie;