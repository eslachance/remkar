import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';

const Layout = () => {
  const [isLoginPage, setIsLoginPage] = useState(false);
  return (
    <div className="flex flex-col gap-2 min-h-screen p-0 m-0 bg-back-white relative">
      <Header isLoginPage={isLoginPage} setIsLoginPage={setIsLoginPage} />
      <div
        className={`py-16 transition-all ease-in-out duration-750 ${isLoginPage ? 'opacity-0' : 'opacity-100'}`}>
        <Outlet />
      </div>
      <div className="fixed bottom-0 left-0 w-full h-12 bg-blueGray-100 border-t border-t-solid border-t-blueGray-300 shadow-lg box-border flex items-center text-nav-fore bg-nav-back text-sm">
        <div className="flex items-center justify-between mx-auto flex-col sm:flex-row w-full p-4">
          <span>© 2024 Bar La Remise</span>
          <span>Version 0.0.2 Beta ({import.meta.env.MODE})</span>
        </div>
      </div>
    </div>
  );
};

export default Layout;
