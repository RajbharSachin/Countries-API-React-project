import { createRoot } from 'react-dom/client'
import App from './App'
import Contact from './components/Contact'
const root = createRoot(document.querySelector('#root'))

// Use React-Router v7 dom with latest Parcel Version Compatibility
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router'
import Header from './components/Header'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/contact',
    element: <div>Contact</div>,
  },
])
root.render(
  <>
    <RouterProvider router={router} />
  </>
) // not our component But customized provided by react-router-dom
