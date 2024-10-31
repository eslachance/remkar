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
    <div className="flex flex-col gap-2">
      <nav
        className={`transition-all ease-in-out delay-500 duration-500 flex gap-3 items-center border-b border-b-solid border-blueGray-300 shadow-lg ${
          isLoginPage
            ? 'p-0 absolute top-0 left-0 w-full h-full bg-sky-800'
            : 'h-2 p-4 bg-blueGray-100'
        }`}>
        {!isLoginPage ? (
          <>
            <Link to="/">
              <span className="iconify i-ri-home-5-line mr-1" />
              Info
            </Link>
            <Link to="/songs">
              <span className="iconify i-ri-search-line mr-1" />
              Recherche
            </Link>
            <div className="ml-auto flex items-center gap-1">
              <span className="iconify i-ri-user-3-fill mr-1" />
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
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center h-full text-white mx-auto">
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
          </>
        )}
        {/* <Link to="/">Home</Link> | <Link to="/songs">Search</Link> */}
      </nav>
      {!isLoginPage && (
        <div className="p2">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Layout;
