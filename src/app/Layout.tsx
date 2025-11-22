import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import { useLanguage } from '@/i18n/LanguageContext';

const Layout = () => {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col min-h-screen p-0 m-0 bg-dive-bg relative">
      <Header isLoginPage={isLoginPage} setIsLoginPage={setIsLoginPage} />
      <div
        className={`pt-20 pb-16 px-4 md:px-6 transition-all ease-in-out duration-750 flex-1 ${isLoginPage ? 'opacity-0' : 'opacity-100'}`}>
        <Outlet />
      </div>
      <div className="fixed bottom-0 left-0 w-full h-14 bg-dive-bg-light/90 border-t border-t-solid border-dive-border backdrop-blur-sm shadow-[rgba(0,0,0,0.3)_0px_-5px_15px_0px] box-border flex items-center text-dive-text-dim text-sm">
        <div className="flex items-center justify-between mx-auto flex-col sm:flex-row w-full px-4 md:px-6 gap-2 sm:gap-0">
          <span>{t('copyright')}</span>
          <span className="text-xs">{t('version')} 0.0.4 Beta ({import.meta.env.MODE})</span>
        </div>
      </div>
    </div>
  );
};

export default Layout;
