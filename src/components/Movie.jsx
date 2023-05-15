import React from 'react';
import { useParams } from 'react-router-dom';
// Config
import { useTranslation } from 'react-i18next';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
// Tranlation
// Components
import BreadCrumb from './BreadCrumb';
import Grid from './Grid';
import Spinner from './Spinner';
import MovieInfo from './MovieInfo';
import MovieInfoBar from './MovieInfoBar';
import Actor from './Actor';
// Hook
import useMovieFetch from '../hooks/useMovieFetch';
// Image
import NoImage from '../images/no_image.jpg';

function Movie() {
  const { t } = useTranslation();

  const { movieId } = useParams();

  const { state: movie, loading, error } = useMovieFetch(movieId);

  if (loading) return <Spinner />;
  if (error) {
    return <div>{t('movie.somethingWentWrong')}</div>;
  }

  return (
    <>
      <BreadCrumb movieTitle={movie.original_title} />
      <MovieInfo movie={movie} />
      <MovieInfoBar
        time={movie.runtime}
        budget={movie.budget}
        revenue={movie.revenue}
      />
      <Grid header={t('movie.actors')}>
        {movie.actors.map((actor) => (
          <Actor
            key={actor.credit_id}
            name={actor.name}
            character={actor.character}
            imageUrl={
              actor.profile_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                : NoImage
            }
          />
        ))}
      </Grid>
    </>
  );
}
export default Movie;
