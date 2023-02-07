import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import RMDBLogo from "../../images/react-movie-logo.svg";
import TMDBLogo from "../../images/tmdb_logo.svg";

import { Wrapper, Content, LogoImg, TMDBLogoImg } from "./Header.styles";
// Context
import { Context } from "../../context";
import { persistedState } from "../../helpers";

const Header = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 620;

  const { userData } = useContext(Context);
  const { user } = userData;
  const { setUser } = userData;
  const { languageData } = useContext(Context);
  const { language } = languageData;
  const { setLanguage } = languageData;
  const sessionState = persistedState("user");

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  if (!sessionState && user) {
    sessionStorage.setItem("user", JSON.stringify(user));
  }
  function logOut(serUser) {
    setUser("");
    sessionStorage.removeItem("user");
  }
  return (
    <Wrapper>
      <Content>
        <Link to="/">
          <LogoImg src={RMDBLogo} alt="rmbd-logo" />
        </Link>
        {user && (
          <>
            {width > breakpoint ? (
              <span>
                {language === "pl"
                  ? `Zalogowany jako: ${user.username}`
                  : `Logged in as: ${user.username}`}
              </span>
            ) : (
              <span>`${user.username}`</span>
            )}

            <span onClick={logOut} className="switch">
              {language === "pl" ? "Wyloguj" : "Log out"}
            </span>
          </>
        )}

        {!user && (
          <Link to="/login">
            <span>{language === "pl" && !user ? "Zaloguj" : "Log in"}</span>
          </Link>
        )}

        <div
          className="switch"
          onClick={() =>
            setLanguage((prev) => (prev === "pl" ? "en-US" : "pl"))
          }
        >
          {language === "pl" ? (
            <span>
              ENG/<u>PL</u>
            </span>
          ) : (
            <span>
              <u>ENG</u>/PL
            </span>
          )}
        </div>
        <TMDBLogoImg src={TMDBLogo} alt="tmbd-logo" />
      </Content>
    </Wrapper>
  );
};
export default Header;
