import { createRoot } from 'react-dom/client'
import App from './App'
const root = createRoot(document.querySelector('#root'))

// Use React Router dom
import { createBrowserRouter, RouterProvider } from 'react-router'
const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
]);
root.render(<RouterProvider router={router} />)