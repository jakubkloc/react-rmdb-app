import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// Images
import england from '../../images/united_kingdom_flag.png';
import poland from '../../images/poland_flag.png';
import loginSvg from '../../images/log-in.svg';
import logoutSvg from '../../images/log-out.svg';

import RMDBLogo from '../../images/react-movie-logo.svg';
import TMDBLogo from '../../images/tmdb_logo.svg';
import {
  Wrapper, Content, LogoImg, TMDBLogoImg,
} from './Header.styles';
// Context
import { Context } from '../../context';
import { persistedState } from '../../helpers';

function Header() {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 620;
  const breakpoint2 = 460;

  const { userData } = useContext(Context);
  const { user } = userData;
  const { setUser } = userData;
  const { languageData } = useContext(Context);
  const { language } = languageData;
  const { setLanguage } = languageData;
  const sessionState = persistedState('user');
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  if (!sessionState && user) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }
  function logOut() {
    setUser('');
    sessionStorage.removeItem('user');
  }
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  let loginButton = '';
  if (language === 'pl') {
    loginButton = 'Zaloguj';
  } else {
    loginButton = 'Log in';
  }

  let logoutButton = '';
  if (language === 'pl') {
    logoutButton = 'Wyloguj';
  } else {
    logoutButton = 'Log out';
  }

  let languageButton = '';
  if (width > breakpoint2) {
    languageButton = language === 'pl' ? (
      <span>
        ENG/
        <u>PL</u>
      </span>
    ) : (
      <span>
        <u>ENG</u>
        /PL
      </span>
    );
  } else {
    languageButton = language === 'pl' ? (
      <img src={england} alt="united-kingdom-flag" width="25" />
    ) : (
      <img src={poland} width="25" alt="poland-flag" />
    );
  }

  return (
    <Wrapper>
      <Content>
        <Link to="/" className={isHomePage ? 'default-cursor' : ''}>
          <LogoImg src={RMDBLogo} alt="rmbd-logo" />
        </Link>

        {user && (
          <>
            {width > breakpoint && (
              <span className="loged-info">
                {language === 'pl'
                  ? `Zalogowany jako: ${user.username}`
                  : `Logged in as: ${user.username}`}
              </span>
            )}

            <button type="button" onClick={logOut} className="switch">

              {width > breakpoint2 ? logoutButton : <img src={logoutSvg} alt="logout" />}
            </button>
          </>
        )}

        {

        !user && (
          <Link to="/login">
            {width > breakpoint2 ? <span>{loginButton}</span> : <img src={loginSvg} alt="login" />}
          </Link>
        )
}

        <button
          type="button"
          className="switch"
          onClick={() => setLanguage((prev) => (prev === 'pl' ? 'en-US' : 'pl'))}
        >
          {languageButton}

        </button>
        <TMDBLogoImg src={TMDBLogo} alt="tmbd-logo" />
      </Content>
    </Wrapper>
  );
}
export default Header;
