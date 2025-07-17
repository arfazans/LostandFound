import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home.jsx'
import ReportLI from './Components/ReportLI.jsx'
import ReportFI from './Components/ReportFI.jsx'
import Profile from './Components/Profile.jsx'
import Notestate from './ContextAPI/Notestate.jsx'
import Signup from './Components/Signup.jsx'
import Login from './Components/Login.jsx'
import Notification from './Components/Notification.jsx'
import DisplayResolved from './Components/DisplayResolved.jsx'



const router = createBrowserRouter([

  {
    path: "",
    element : <Home/>
  },


  {
    path: "/reportfi",
    element: <ReportFI/>
  },
  {
    path: "/reportli",
    element: <ReportLI/>
  },
  {
    path: "/profile",
    element: <Profile/>
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/notificaiton",
    element: <Notification/>
  },
  {
    path: "/resolvedItems",
    element: <DisplayResolved/>
  },
]);


// eslint-disable-next-line no-undef
createRoot(document.getElementById('root')).render(
  <Notestate>

    <RouterProvider router={router} />

  </Notestate>

)
