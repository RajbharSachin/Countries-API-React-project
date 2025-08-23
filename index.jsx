import { createRoot } from 'react-dom/client'
import App from './App'
import Error from './components/Error'
import Home from './components/Home'
import Contact from './components/Contact'
const root = createRoot(document.querySelector('#root'))

// Use React-Router v7 dom with latest Parcel Version Compatibility
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
    ],
  },
])
root.render(
  <>
    <RouterProvider router={router} />
  </>
) // not our component But customized provided by react-router-dom
