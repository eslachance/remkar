import { useRef, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { fetchFromAPI } from '@/utils';

type UserData = {
  username: string;
  avatar: string;
  role: string;
};

const Layout = () => {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<UserData>({
    queryKey: ['userData'],
    queryFn: () => fetchFromAPI('/me'),
  });

  const handleLogin = (e) => {
    e.preventDefault();
    fetchFromAPI('/login', {
      method: 'POST',
      body: JSON.stringify({
        username: usernameRef?.current.value,
        password: passwordRef?.current.value,
      }),
    })
      .then((data) => {
        if (data.success) {
          setIsLoginPage(false);
          usernameRef.current.value = '';
          passwordRef.current.value = '';
          refetch();
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Erreur lors de la connexion');
      });
  };

  const handleCreateAccount = () => {
    fetchFromAPI('/signup', {
      method: 'POST',
      body: JSON.stringify({
        username: usernameRef?.current.value,
        password: passwordRef?.current.value,
      }),
    })
      .then((data) => {
        if (data.success) {
          usernameRef.current.value = '';
          passwordRef.current.value = '';
          refetch();
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Erreur lors de la création du compte');
      });
  };

  const handleLogout = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetchFromAPI('/logout')
      .then((data) => {
        if (data.success) {
          refetch();
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Erreur lors de la déconnexion');
      });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-2 h-screen p-0 m-0">
      <nav
        className={`transition-all ease-in-out duration-750 flex flex-col gap-3 items-center fixed top-0 left-0 w-full z-1000 px-5 box-border ${
          isLoginPage
            ? 'h-full bg-sky-800'
            : 'border-b border-b-solid border-blueGray-300 shadow-lg h-12 bg-blueGray-100'
        }`}>
        <div
          className={`transition-all ease-in-out duration-750 flex gap-3 items-center
            overflow-hidden w-full justify-between pt-2
            ${isLoginPage ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex items-center gap-3 h-10">
            <Link to="/karaoke" className="flex items-center gap-1">
              <span className="iconify i-ri-search-line" />
              Recherche
            </Link>
            <Link to="/info" className="flex items-center gap-1">
              <span className="gap-1 iconify i-ri-home-5-line" />
              <span>Info</span>
            </Link>
          </div>
          <div className="user-button flex items-center gap-1">
            <span className="iconify i-ri-user-3-fill" />
            {user?.username ? (
              <>
                {user.username}
                <button type="button" className="btn btn-primary" onClick={handleLogout}>
                  X
                </button>
              </>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setIsLoginPage(true)}>
                Connexion
              </button>
            )}
          </div>
        </div>
        <div
          className={`transition-all ease-in-out duration-500 flex flex-col items-center justify-center mx-auto overflow-hidden ${isLoginPage ? 'h-full' : 'h-0'}`}>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-white">Karaoke Remise </h1>
            <div className="flex flex-col p-5 gap-4 w-full border-b border-solid border-blueGray-600 shadow-lg bg-blueGray-300 rounded-lg font-bold relative">
              <div className="absolute top-0 right-6">
                <button
                  type="button"
                  className={`btn btn-primary ${isLoginPage ? '' : 'hidden'}`}
                  onClick={() => setIsLoginPage(false)}>
                  <span className="iconify i-ri-close-line" />
                </button>
              </div>
              <form onSubmit={handleLogin}>
                <p className="text-2xl my-3 mx-4">Informations de Connexion</p>
                <div className="flex flex-col mx-4">
                  <span>Nom d'utilisateur</span>
                  <input type="text" name="username" id="username" ref={usernameRef} />
                  <span>Mot de passe</span>
                  <input type="password" name="password" id="password" ref={passwordRef} />
                </div>
                <button type="button" className="btn btn-primary mx-4 mb-2" onClick={handleLogin}>
                  Connecter
                </button>
                <button
                  type="submit"
                  className="btn btn-primary mx-4 mb-2"
                  onClick={handleCreateAccount}>
                  Nouveau Compte
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`py-16 transition-all ease-in-out duration-750 ${isLoginPage ? 'opacity-0' : 'opacity-100'}`}>
        <Outlet />
      </div>
      <div className="fixed bottom-0 left-0 w-full h-12 bg-blueGray-100 border-t border-t-solid border-t-blueGray-300 shadow-lg box-border flex items-center">
        <div className="flex items-center justify-between p-2 mx-auto flex-col sm:flex-row w-full">
          <span className="text-sm text-gray-500 dark:text-gray-400">© 2024 Bar La Remise</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Version 0.0.2 Beta ({import.meta.env.MODE})
          </span>
        </div>
      </div>
    </div>
  );
};

export default Layout;
