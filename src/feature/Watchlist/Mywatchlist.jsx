
import { Col, Row, Container, Table } from "react-bootstrap";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faPlus, faClipboardList, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Selectmovieid } from "../Movie/MovieSlice";
import { RemoveMovieAsync, WatchListAsync, loginUser, watchListByUser } from "../User/UserSlice";
import { FetchWatchlistByuser } from "../User/UserApi";





const MywatchList = () => {

    const location = useLocation();


    const currentPath = location.pathname;

    const dispatch = useDispatch();
    const user = useSelector(loginUser);
    const watchlistdata = useSelector(watchListByUser);
    const [Movieid, SetMovieId] = useState("");
   
    const userid = user ? user.id : null;
    const username = user ? user.user : null;




    const RemoveMovie = (id) => {
        SetMovieId(id);
        console.log(id)
        dispatch(RemoveMovieAsync(id));
    }

    useEffect(() => {
        dispatch(WatchListAsync(userid))
    }, [dispatch, Movieid])



    return (
        <>
            <div className="movie-watchlist-bg">
                <Container fluid>
                    <Row>
                        <Col lg={3}>
                            <div className="watchlist-left-section">

                                <div className="watchlist-top-left">
                                    <div className="watchlist-title">
                                        <h5>watchlist</h5>

                                    </div>

                                    <div className={currentPath === '/Movie' ? 'page-navlink active' : 'page-navlink'}>
                                        <NavLink to="/Movie"> <FontAwesomeIcon icon={faHome} /><span>Home</span> </NavLink>
                                    </div>
                                    <div className={currentPath === '/Mywatchlist' ? 'mywatchlist-btn active' : 'mywatchlist-btn'}>
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
                        <Col lg={9}>
                            <div className="top-bar">

                            </div>

                            <div className="main-movie-section">
                              

                                <div className="mywatchlist-main-content">
                                    <div className="table-responsive">
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>No</th>

                                                    <th>Poster</th>
                                                    <th>Title</th>
                                                    <th>Release Date</th>
                                                    <th class="movie-summary">Movie Summary</th>

                                                    <th>Remove</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {watchlistdata && watchlistdata.map((movie, index) => {
                                                    const sn = index + 1;

                                                    return (
                                                        <tr className="table-main-content" key={index}>
                                                            <td >{sn}</td>
                                                            <td><div className="watchlist-img"><img src={movie.poster} alt={movie.title} className="img-fluid" /></div></td>
                                                            <td>{movie.title}</td>
                                                            <td>{movie.release}</td>
                                                            <td>{movie.plot}</td>


                                                            <td><button onClick={() => {
                                                                RemoveMovie(movie.id)

                                                            }} className="remove-btn">Remove</button></td>
                                                        </tr>
                                                    )

                                                })}

                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default MywatchList;



// {MoviedData && MoviedData.length > 0 ? (
//     MoviedData.map((movie) => (
//         movie.Poster !== "N/A" && (
//             <Col md={4} key={movie.id}>
//                 <div className="movie-card">
//                     <div className="movie-poster">
//                         <img className="img-fluid" src={movie.Poster} alt={movie.name} />
//                     </div>
//                     <div className="movie-content">
//                         <div className="movie-rating">
//                             {/* <p>{movie.rating}</p> */}
//                         </div>
//                         <h4>{movie.Title}</h4>
//                         <p>Relase Year: {movie.Year} </p>
//                     </div>

//                     <div className="watchlist-btn" type="button" onClick={() => AddWatchbtn(movie.imdbID
//                     )}>
//                         <FontAwesomeIcon icon={faPlus} />
//                     </div>
//                     {/* <button type="button" onClick={() => AddWatchbtn(movie.imdbID
//                     )}>Click</button> */}
//                 </div>
//             </Col>
//         )
//     ))
// )
//     : (
//         <h2>No Movies Found</h2>
//     )}