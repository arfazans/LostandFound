import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './shared/styles/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Dashboard } from './features/dashboard'
import { ReportLostItem, ReportFoundItem, ResolvedItemsList } from './features/items'
import { UserProfile } from './features/profile'
import { AppContext } from './shared'
import { SignupForm, LoginForm } from './features/authentication'
import { NotificationList } from './features/notifications'



const router = createBrowserRouter([

  {
    path: "",
    element : <Dashboard/>
  },
  {
    path: "/reportfi",
    element: <ReportFoundItem/>
  },
  {
    path: "/reportli",
    element: <ReportLostItem/>
  },
  {
    path: "/profile",
    element: <UserProfile/>
  },
  {
    path: "/signup",
    element: <SignupForm/>
  },
  {
    path: "/login",
    element: <LoginForm/>
  },
  {
    path: "/notificaiton",
    element: <NotificationList/>
  },
  {
    path: "/resolvedItems",
    element: <ResolvedItemsList/>
  },
]);


createRoot(document.getElementById('root')).render(
  <AppContext>
    <RouterProvider router={router} />
  </AppContext>
)
