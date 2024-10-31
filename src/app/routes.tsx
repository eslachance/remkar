import { createBrowserRouter } from 'react-router-dom';

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
        path: '/',
        Component: Home,
      },
      {
        path: '/songs',
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
