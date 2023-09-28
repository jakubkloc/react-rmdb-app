import React, { useContext } from "react";
// import API from "../../API";
import PropTypes from "prop-types";
// Translation
import { useTranslation } from "react-i18next";
// Components
import Thumb from "../Thumb";
// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
// Image
import NoImage from "../../images/no_image.jpg";
// Styles
import { Wrapper, Content, Text } from "./MovieInfo.styles";
// Context
import { Context } from "../../context";
import Button from "../Button";

function MovieInfo({ movie }) {
  const { t, i18n } = useTranslation();
  const actualLanguage = i18n.language;
  const [value, setValue] = React.useState(5);
  const [loading, setLoading] = React.useState(true);
  const [yourRate, setYourRate] = React.useState(null);
  const { userData } = useContext(Context);
  const { user } = userData;

  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 460;
  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const handleRating = async (rateValue) => {
    const urlRateMovie = `/.netlify/functions/rateMovie?sessionId=${user.sessionID}&movieId=${movie.id}&value=${rateValue}`;
    const rate = await fetch(urlRateMovie).then((response) => response.json());

    if (rate.success === true) {
      fetchRate();
    }
  };

  let movieDescription = "";
  if (movie.overview) {
    movieDescription = movie.overview;
  } else if (actualLanguage === "pl") {
    movieDescription = t("noDescription");
  }

  async function fetchRate() {
    setLoading(true);
    const urlFetchRate = `/.netlify/functions/fetchRate?sessionId=${user.sessionID}&movieId=${movie.id}&language=${actualLanguage}`;
    const fetchedRate = await fetch(urlFetchRate).then((response) =>
      response.json()
    );

    if (fetchedRate.rated) {
      setYourRate(fetchedRate.rated.value);
    }
    setLoading(false);
  }

  React.useEffect(() => {
    if (user) {
      fetchRate();
    }
  }, []);
  return (
    <Wrapper backdrop={movie.backdrop_path}>
      <Content>
        <Thumb
          image={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
              : NoImage
          }
          clickable={false}
        />
        <Text>
          <h1>{movie.title}</h1>
          <h3>{t("movieInfo.plot")}</h3>
          <p>{movieDescription}</p>

          {width > breakpoint ? (
            <div className="container">
              <div className="left-container">
                <div className="ratings">
                  <div className="rate-container">
                    <h3>{t("movieInfo.rating")}</h3>
                    <div className="score">{movie.vote_average}</div>
                  </div>

                  {yourRate && user ? (
                    <div className="rate-container">
                      <h3>{t("movieInfo.yourRate")}</h3>
                      <div className="score">
                        {loading ? <div className="spinner" /> : yourRate}
                      </div>
                    </div>
                  ) : null}
                </div>
                {user && (
                  <Button
                    text={t("movieInfo.rate")}
                    callback={() => handleRating(value)}
                  />
                )}
              </div>

              <div className="right-container">
                <div className="director">
                  <h3>
                    {t("movieInfo.director")}
                    {movie.directors.length > 1 ? "S" : ""}
                  </h3>
                  {movie.directors.map((director) => (
                    <p key={director.credit_id}>{director.name}</p>
                  ))}
                </div>
                {user && (
                  <div className="ratebar-container">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="0.5"
                      value={value}
                      onChange={(e) => setValue(e.currentTarget.value)}
                    />
                    <div className="score">{value}</div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="container">
              <div className="left-container">
                <div className="ratings">
                  <div className="rate-container">
                    <h3>{t("movieInfo.rating")}</h3>
                    <div className="score">{movie.vote_average}</div>
                  </div>

                  {yourRate && user ? (
                    <div className="rate-container">
                      <h3>{t("movieInfor.yourRate")}</h3>
                      <div className="score">
                        {loading ? <div className="spinner" /> : yourRate}
                      </div>
                    </div>
                  ) : null}
                  <div className="director">
                    <h3>
                      {t("movieInfo.director")}
                      {movie.directors.length > 1 ? "S" : ""}
                    </h3>
                    {movie.directors.map((director) => (
                      <p key={director.credit_id}>{director.name}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="right-container">
                {user && (
                  <>
                    <Button
                      text={t("movieInfo.rate")}
                      callback={() => handleRating(value)}
                    />

                    <div className="ratebar-container">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        step="0.5"
                        value={value}
                        onChange={(e) => setValue(e.currentTarget.value)}
                      />
                      <div className="score">{value}</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </Text>
      </Content>
    </Wrapper>
  );
}

MovieInfo.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieInfo;
