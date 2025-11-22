import { createBrowserRouter, Navigate } from 'react-router-dom';

import Home from '@/pages/Home';
import Search from '@/pages/Search';
import SongDataModal from '@/components/SongModal';
import Layout from './Layout';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        element: <Navigate to="/info" />,
      },
      {
        path: '/info',
        Component: Home,
      },
      {
        path: '/karaoke',
        Component: Search,
        children: [
          {
            path: ':id',
            Component: SongDataModal,
          },
        ],
      },
    ],
  },
]);

export default router;
