import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { fetchFromAPI, useClickOutside } from '@/utils';
import { useLanguage } from '@/i18n/LanguageContext';

type UserData = {
  username: string;
  isAdmin: boolean;
  name: string;
  avatar: string;
  isLoggedIn: boolean;
};

const Header = ({ isLoginPage, setIsLoginPage }) => {
  const { language, setLanguage, t } = useLanguage();
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const ref = useClickOutside(() => setShowMenu(false));
  const mobileMenuRef = useClickOutside(() => setShowMobileMenu(false));

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
        alert(t('loginError'));
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
        alert(t('createAccountError'));
      });
  };

  const handleLogout = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    fetchFromAPI('/logout')
      .then((data) => {
        if (data.success) {
          setShowMenu(false);
          refetch();
        }
      })
      .catch((err) => {
        console.log(err);
        alert(t('logoutError'));
      });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (<>
    {/* User Menu Dropdown */}
    {showMenu && (
      <div className="absolute top-16 right-2 bg-dive-bg-lighter border-1 border-solid border-dive-border shadow-xl rounded-md py-2 z-5000 min-w-40" ref={ref}>
        <div className="hover:bg-dive-bg-light text-dive-text hover:text-dive-accent py-3 px-6 cursor-pointer transition-colors" onClick={handleLogout}>
          {t('logout')}
        </div>
        <div className="hover:bg-dive-bg-light text-dive-text hover:text-dive-accent py-3 px-6 cursor-pointer transition-colors">
          {t('profile')}
        </div>
        <div className="hover:bg-dive-bg-light text-dive-text hover:text-dive-accent py-3 px-6 cursor-pointer transition-colors">
          {t('favorites')}
        </div>
      </div>
    )}

    {/* Mobile Menu */}
    {showMobileMenu && (
      <div 
        className="fixed top-0 left-0 w-full h-full bg-dive-bg/95 backdrop-blur-sm z-4000 md:hidden"
        ref={mobileMenuRef}
      >
        <div className="flex flex-col h-full p-6">
          {/* Close button */}
          <div className="flex justify-between items-center mb-8">
            <span className="text-dive-text font-display text-2xl tracking-wide">MENU</span>
            <button
              onClick={() => setShowMobileMenu(false)}
              className="flex items-center justify-center w-10 h-10 bg-transparent text-dive-text hover:bg-dive-bg-lighter rounded-md transition-colors"
              aria-label="Close menu"
              type="button"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <Link 
            to="/karaoke" 
            className="flex items-center gap-3 text-dive-text hover:text-dive-accent py-4 text-xl border-b border-dive-border transition-colors"
            onClick={() => setShowMobileMenu(false)}
          >
            <span className="iconify i-ri-search-line text-2xl text-dive-accent" />
            {t('search')}
          </Link>
          <Link 
            to="/info" 
            className="flex items-center gap-3 text-dive-text hover:text-dive-accent py-4 text-xl border-b border-dive-border transition-colors"
            onClick={() => setShowMobileMenu(false)}
          >
            <span className="iconify i-ri-home-5-line text-2xl text-dive-accent" />
            {t('info')}
          </Link>
          <div className="mt-6 flex gap-2">
            <button
              onClick={() => { setLanguage('fr'); setShowMobileMenu(false); }}
              className={`flex-1 px-4 py-3 rounded text-base font-medium transition-colors ${
                language === 'fr' 
                  ? 'bg-dive-accent text-white' 
                  : 'bg-dive-bg-lighter text-dive-text hover:bg-dive-bg-light'
              }`}>
              Français
            </button>
            <button
              onClick={() => { setLanguage('en'); setShowMobileMenu(false); }}
              className={`flex-1 px-4 py-3 rounded text-base font-medium transition-colors ${
                language === 'en' 
                  ? 'bg-dive-accent text-white' 
                  : 'bg-dive-bg-lighter text-dive-text hover:bg-dive-bg-light'
              }`}>
              English
            </button>
          </div>
          {!user?.username && (
            <button
              type="button"
              className="mt-6 bg-dive-accent hover:bg-dive-accent-light text-white px-6 py-3 rounded-md font-medium transition-colors"
              onClick={() => { setShowMobileMenu(false); setIsLoginPage(true); }}>
              {t('login')}
            </button>
          )}
        </div>
      </div>
    )}
    <nav
      className={`transition-all ease-in-out duration-750 flex flex-col items-center fixed top-0 left-0 w-full z-1000 px-4 md:px-6 box-border backdrop-blur-sm ${
        isLoginPage
          ? 'h-full bg-dive-bg/95'
          : 'border-b border-b-solid border-dive-border shadow-lg bg-dive-bg-light/90'
      }`}>
      <div
        className={`transition-all ease-in-out duration-750 flex items-center
          overflow-hidden w-full justify-between py-4
          ${isLoginPage ? 'opacity-0 h-0' : 'opacity-100 h-auto'}`}>
        
        {/* Left side: Hamburger (mobile) or Nav Links (desktop) */}
        <div className="flex items-center z-10">
          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 ml-2 bg-transparent text-dive-text hover:bg-dive-bg-lighter rounded-md transition-colors active:bg-dive-bg"
            onClick={() => setShowMobileMenu(true)}
            aria-label="Open menu"
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/karaoke" className="flex items-center gap-1.5 text-dive-text-dim hover:text-dive-text bg-dive-bg-lighter hover:bg-dive-bg pl-2.5 pr-3 py-2 rounded-md transition-all font-medium">
              <span className="iconify i-ri-search-line text-xl text-dive-accent" />
              {t('search')}
            </Link>
            <Link to="/info" className="flex items-center gap-1.5 text-dive-text-dim hover:text-dive-text bg-dive-bg-lighter hover:bg-dive-bg pl-2.5 pr-3 py-2 rounded-md transition-all font-medium">
              <span className="iconify i-ri-home-5-line text-xl text-dive-accent" />
              {t('info')}
            </Link>
          </div>
        </div>

        {/* Center: Bar name on mobile */}
        <div className="md:hidden flex-1 flex justify-center pointer-events-none">
          <span className="text-dive-text font-display text-lg tracking-wide">LA REMISE</span>
        </div>

        {/* Right side items */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Language Toggle - Desktop only */}
          <div className="hidden md:flex gap-1 bg-dive-bg rounded-md p-1">
            <button
              onClick={() => setLanguage('fr')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                language === 'fr' 
                  ? 'bg-dive-accent text-white' 
                  : 'bg-dive-bg-lighter text-dive-text hover:bg-dive-bg-light hover:text-dive-text'
              }`}>
              FR
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                language === 'en' 
                  ? 'bg-dive-accent text-white' 
                  : 'bg-dive-bg-lighter text-dive-text hover:bg-dive-bg-light hover:text-dive-text'
              }`}>
              EN
            </button>
          </div>
          {/* User Menu - Hidden on mobile unless logged in */}
          {user?.username && (
            <div className="user-button flex items-center gap-2">
              <span className="iconify i-ri-user-3-fill text-dive-accent text-xl" />
              <div onClick={() => setShowMenu(true)} className="relative cursor-pointer text-dive-text hover:text-dive-accent transition-colors hidden sm:block">
                {user.name}
              </div>
            </div>
          )}
          {/* Login button - Desktop only */}
          {!user?.username && (
            <button
              type="button"
              className="bg-dive-accent hover:bg-dive-accent-light text-white px-4 py-2 rounded-md font-medium transition-colors hidden md:block"
              onClick={() => setIsLoginPage(true)}>
              {t('login')}
            </button>
          )}
        </div>
      </div>
      <div
        className={`transition-all ease-in-out duration-500 flex flex-col items-center justify-center mx-auto overflow-hidden ${isLoginPage ? 'h-full' : 'h-0'}`}>
        <div className="flex flex-col items-center justify-center w-full max-w-md px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-dive-text mb-6 font-display tracking-wide">BAR LA REMISE</h1>
          <div className="flex flex-col p-6 gap-4 w-full border border-solid border-dive-border shadow-2xl bg-dive-bg-lighter rounded-lg relative">
            <div className="absolute top-3 right-3">
              <button
                type="button"
                className={`text-dive-text hover:text-dive-accent transition-colors ${isLoginPage ? '' : 'hidden'}`}
                onClick={() => setIsLoginPage(false)}>
                <span className="iconify i-ri-close-line text-2xl" />
              </button>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <p className="text-2xl font-display text-dive-text">{t('loginTitle')}</p>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-dive-text mb-1 text-sm">{t('username')}</label>
                  <input 
                    type="text" 
                    name="username" 
                    id="username" 
                    ref={usernameRef}
                    className="w-full px-3 py-2 bg-dive-bg border border-dive-border rounded text-dive-text focus:outline-none focus:border-dive-accent" 
                  />
                </div>
                <div>
                  <label className="block text-dive-text mb-1 text-sm">{t('password')}</label>
                  <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    ref={passwordRef}
                    className="w-full px-3 py-2 bg-dive-bg border border-dive-border rounded text-dive-text focus:outline-none focus:border-dive-accent" 
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <button 
                  type="submit" 
                  className="w-full bg-dive-accent hover:bg-dive-accent-light text-white px-4 py-3 rounded-md font-medium transition-colors"
                >
                  {t('connect')}
                </button>
                <button
                  type="button"
                  disabled
                  className="w-full bg-dive-bg-light text-dive-text-muted px-4 py-3 rounded-md font-medium opacity-50 cursor-not-allowed"
                  onClick={handleCreateAccount}>
                  {t('newAccount')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </nav>
  </>);
}

export default Header;
