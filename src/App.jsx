import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import ProtectedRoutes from './utils/ProtectedRoutes'
import { useTheme } from './utils/ThemeProvider'
import NotFound from './components/NotFound'

function App() {
  const { theme } = useTheme();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <ProtectedRoutes />,
      children: [
        {
          index: true,
          element: <Home />
        },
      ]
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ]);

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('body')?.classList.add('dark', 'text-foreground', 'bg-background')
    } else {
      document.querySelector('body')?.classList.remove('dark', 'text-foreground', 'bg-background')
    }
  }, [theme])
  

  return (
    <main>
        <RouterProvider router={router} />
    </main>
  )
}

export default App
