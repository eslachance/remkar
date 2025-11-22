import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import { ResultsStoreProvider } from '@/store/results';
import { queryClient } from '@/store/query';
import { LanguageProvider } from '@/i18n/LanguageContext';
import router from '@/app/routes';
import 'uno.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <LanguageProvider>
    <ResultsStoreProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ResultsStoreProvider>
  </LanguageProvider>,
);
