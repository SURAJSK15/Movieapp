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
import ErrorPage from './Pages/Errorpage';





const router = createBrowserRouter({
  basename: "/", 
  routes: [
    {
      path: "/",
      element: <LogIn></LogIn>,
    },
    {
      path: "/Register",
      element: <Register></Register>,
    },
    {
      path: "/Movie",
      element: <Protected><Movie></Movie></Protected>,
    },
    {
      path: "/Mywatchlist",
      element: <Protected><MywatchList></MywatchList></Protected>,
    },
    {
      path: "/Register",
      element: <ErrorPage></ErrorPage>,
    },
  ]
});


function App() {
  

  return (
    <>
      <RouterProvider router={router} />

    </>
  );
}

export default App;
