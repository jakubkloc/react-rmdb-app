import React, { useContext } from "react";
// import API from "../../API";
import PropTypes from "prop-types";
//Components
import Thumb from "../Thumb";
import Rate from "../Rate";
// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
// Image
import NoImage from "../../images/no_image.jpg";
// Styles
import { Wrapper, Content, Text } from "./MovieInfo.styles";
// Context
import { Context } from "../../context";
import { persistedState } from "../../helpers";
const MovieInfo = ({ movie }) => {
  const { userData } = useContext(Context);
  const { user } = userData;
  const { languageData } = useContext(Context);
  const { language } = languageData;

  const handleRating = async (value) => {
    const urlRateMovie = `/.netlify/functions/rateMovie?sessionId=${user.sessionID}&movieId=${movie.id}&value=${value}`;
    const rate = await fetch(urlRateMovie).then((response) => response.json());

    if (rate.success === true) {
      const language = persistedState("language");
      const info =
        language === "pl"
          ? `Oceniono flim na ${value} ☆`
          : `The movie was rated at ${value} ☆`;
      alert(info);
    }
  };

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
          {language === "pl" ? <h3>FABUŁA</h3> : <h3>PLOT</h3>}
          {movie.overview ? (
            <p>{movie.overview}</p>
          ) : language === "pl" ? (
            <p>Brak opisu w języku polskim</p>
          ) : null}

          <div className="rating-directors">
            <div>
              {language === "pl" ? <h3>OCENA</h3> : <h3>RATING</h3>}
              <div className="score">{movie.vote_average}</div>
            </div>
            <div className="director">
              <h3>
                {language === "pl" ? "REŻYSER" : "DIRECTOR"}
                {movie.directors.length > 1 ? "S" : ""}
              </h3>
              {movie.directors.map((director) => (
                <p key={director.credit_id}>{director.name}</p>
              ))}
            </div>
          </div>
          {user && (
            <div>
              {language === "pl" ? <p>Oceń Film</p> : <p>Rate Movie</p>}

              <Rate callback={handleRating} />
            </div>
          )}
        </Text>
      </Content>
    </Wrapper>
  );
};

MovieInfo.propTypes = {
  movie: PropTypes.object,
};

export default MovieInfo;
