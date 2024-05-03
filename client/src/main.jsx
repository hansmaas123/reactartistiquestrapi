import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index from "./routes";
import Root from "./routes/root";
import ArtworkDetail from './routes/artworkDetail'
import CreateArtwork from './routes/createArtwork'
import ErrorPage from "./routes/error-page";

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
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
