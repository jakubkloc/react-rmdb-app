import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// Translations
import { useTranslation } from 'react-i18next';
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
  const { t, i18n } = useTranslation();
  const actualLanguage = i18n.language;

  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 620;
  const breakpoint2 = 460;

  const { userData } = useContext(Context);
  const { user } = userData;
  const { setUser } = userData;
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

  let languageButton = '';
  if (width > breakpoint2) {
    languageButton = actualLanguage === 'pl' ? (
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
    languageButton = actualLanguage === 'pl' ? (
      <img src={england} alt="united-kingdom-flag" width="25" />
    ) : (
      <img src={poland} width="25" alt="poland-flag" />
    );
  }

  function changeLanguage() {
    if (actualLanguage === 'pl') {
      i18n.changeLanguage('en');
    }
    if (actualLanguage === 'en') {
      i18n.changeLanguage('pl');
    }
    sessionStorage.setItem('language', `"${actualLanguage}"`);
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
                {t('header.loggedInAs')}
                {' '}
                {user.username}
              </span>
            )}

            <button type="button" onClick={logOut} className="switch">

              {width > breakpoint2 ? t('header.logOut') : <img src={logoutSvg} alt="logout" />}
            </button>
          </>
        )}

        {

        !user && (
          <Link to="/login">
            {width > breakpoint2 ? <span>{t('header.logIn')}</span> : <img src={loginSvg} alt="login" />}
          </Link>
        )
}

        <button
          type="button"
          className="switch"
          onClick={() => changeLanguage()}
        >
          {languageButton}

        </button>
        <TMDBLogoImg src={TMDBLogo} alt="tmbd-logo" />
      </Content>
    </Wrapper>
  );
}
export default Header;
