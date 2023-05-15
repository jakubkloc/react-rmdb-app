import React from 'react';
// Translations
import { useTranslation } from 'react-i18next';
// Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';
// Components
import HeroImage from './HeroImage';
import Grid from './Grid';
import Thumb from './Thumb';
import Spinner from './Spinner';
import SearchBar from './SearchBar';
import Button from './Button';
// Hook
import useHomeFetch from '../hooks/useHomeFetch';
// Image
import NoImage from '../images/no_image.jpg';

function Home() {
  const { t } = useTranslation();
  const {
    state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore,
  } = useHomeFetch();
  if (error) {
    return <div>{t('home.somethingWentWrong')}</div>;
  }

  let gridHeader = '';

  if (searchTerm) {
    gridHeader = t('home.searchResults');
  } else {
    gridHeader = t('home.popularMovies');
  }

  return (
    <>
      {!searchTerm && state.results[0] ? (
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
          title={state.results[0].title}
          text={state.results[0].overview}
        />
      ) : null}
      <SearchBar setSearchTerm={setSearchTerm} />
      <Grid
        header={
         gridHeader
        }
      >
        {state.results.map((movie) => (
          <Thumb
            key={movie.id}
            clickable
            image={
              movie.poster_path
                ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                : NoImage
            }
            movieId={movie.id}
          />
        ))}
      </Grid>
      {loading && <Spinner />}
      {state.page < state.total_pages && !loading && (
        <Button
          text={t('home.loadMore')}
          callback={() => setIsLoadingMore(true)}
        />
      )}
    </>
  );
}

export default Home;
