import React, { useEffect } from 'react';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LogIn from './Pages/Login';
import Register from './Pages/Register';
import Movie from './Pages/Movie';
import MywatchList from './feature/Watchlist/Mywatchlist';
import Protected from './Pages/Protected';




const router = createBrowserRouter([
  {
    path: "/",
    element: <LogIn> </LogIn>,
  },
  {
    path: "/Register",
    element: <Register></Register>,
  },
  {
    path: "/Movie",
    element:<Protected> <Movie></Movie></Protected>,
  },
  {
    path: "/Mywatchlist",
    element: <Protected><MywatchList></MywatchList></Protected>,
  },

])


function App() {
  

  return (
    <>
      <RouterProvider router={router} />

    </>
  );
}

export default App;
