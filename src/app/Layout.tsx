import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const user = {
    username: null,
    avatar: 'https://avatars.githubusercontent.com/u/1019278?v=4',
    role: 'admin',
  };

  return (
    <div className="flex flex-col gap-2 h-screen w-screen p-0 m-0">
      <nav
        className={`transition-all ease-in-out duration-750 flex flex-col gap-3 items-center fixed top-0 left-0 w-full z-1000 px-5 box-border ${
          isLoginPage
            ? 'h-full bg-sky-800'
            : 'border-b border-b-solid border-blueGray-300 shadow-lg h-12 bg-blueGray-100'
        }`}>
        <div
          className={`transition-all ease-in-out duration-750 flex gap-3 items-center overflow-hidden w-full justify-between pt-2 ${isLoginPage ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex items-center gap-3 h-10">
            <Link to="/" className="flex items-center gap-1">
              <span className="gap-1 iconify i-ri-home-5-line" />
              <span>Info</span>
            </Link>
            <Link to="/songs" className="flex items-center gap-1">
              <span className="iconify i-ri-search-line" />
              Recherche
            </Link>
          </div>
          <div className="user-button flex items-center gap-1">
            <span className="iconify i-ri-user-3-fill" />
            {user?.username ? (
              user.username
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setIsLoginPage(true)}>
                Login
              </button>
            )}
          </div>
        </div>
        <div
          className={`transition-all ease-in-out duration-750 flex flex-col items-center justify-center text-white mx-auto overflow-hidden ${isLoginPage ? 'h-full' : 'h-0'}`}>
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <div className="text-center">
              <h1 className="text-3xl font-bold">Karaoke Remise</h1>
              <p className="text-lg">Entrez votre information:</p>
              <div className="flex flex-col">
                <span>
                  Username:
                  <input type="text" name="username" id="username" />
                </span>
                <span>
                  Password:
                  <input type="password" name="password" id="username" />
                </span>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setIsLoginPage(false)}>
                Connecter
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`p-2 pt-16 transition-all ease-in-out duration-750 ${isLoginPage ? 'opacity-0' : 'opacity-100'}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
