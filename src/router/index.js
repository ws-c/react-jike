import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/Layout';
import Login from '../pages/Login';
import Error from '../pages/Error';
import { Suspense, lazy } from 'react';
import AuthRoute from '@/components/AuthRoute';

const Home = lazy(() => import('../pages/Home'))
const Publish = lazy(() => import('../pages/Publish'))
const Article = lazy(() => import('../pages/Article'))

const routes = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoute><Layout /></AuthRoute>,
    children: [
      {
        index: true,
        element: <Suspense fallback={'加载中'}><Home /></Suspense>,
      },
      {
        path: '/publish',
        element: <Suspense fallback={'加载中'}><Publish /></Suspense>,
      },
      {
        path: '/article',
        element: <Suspense fallback={'加载中'}><Article /></Suspense>
      }
    ]
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <Error />,
  }
])

export default routes;