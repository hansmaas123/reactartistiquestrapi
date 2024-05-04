import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import Index from "./routes";
import Root from "./routes/root";
import ArtworkDetail from './routes/artworkDetail'
import CreateArtwork from './routes/createArtwork'
import ErrorPage from "./routes/error-page";
import UpdateArtwork from './routes/updateArtwork';
import Login from './routes/auth/login';
import Register from './routes/auth/register';
import Profile from './routes/auth/profile';
import { removeAuthData } from './services/auth'
import User from './routes/user'
import { action as destroyAction } from "./routes/destroy";


const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: Root.loader,
    children: [
      { index: true, element: <Index />, loader: Index.loader },
      {
        path: "/artwork/:id",
        element: <ArtworkDetail />,
        loader: ArtworkDetail.loader
      },
      {
        path: "/artwork/create",
        element: <CreateArtwork />,
        loader: CreateArtwork.loader,
        action: CreateArtwork.action
      },
      {
        path: "/artwork/:id/update",
        element: <UpdateArtwork />,
        loader: UpdateArtwork.loader,
        action: UpdateArtwork.action
      },
      {
        path: "/auth/login",
        element: <Login />,
        loader: Login.loader,
        action: Login.action
      },
      {
        path: "/auth/register",
        element: <Register />,
        action: Register.action,
      },
      {
        path: "/auth/profile",
        element: <Profile />,
        loader: Profile.loader,
      },
      {
        path: "/auth/logout",
        action: async () => {
          removeAuthData();
          return redirect("/");
        },
      },
      {
        path: "/user/:id",
        element: <User />,
        loader: User.loader,
      },
      {
        path: "artwork/:id/update/destroy",
        action: destroyAction,
        errorElement: <div>BUMMER! There was an error.</div>,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
