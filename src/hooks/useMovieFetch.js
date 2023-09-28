import { useState, useEffect } from "react";
// Translation
import { useTranslation } from "react-i18next";
// Helpers
import { persistedState } from "../helpers";

const useMovieFetch = (movieId) => {
  const { i18n } = useTranslation();
  const actualLanguage = i18n.language;
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(false);

        const urlMovie = `/.netlify/functions/fetchMovie?language=${actualLanguage}&movieId=${movieId}`;
        const urlCredits = `/.netlify/functions/fetchCredits?language=${actualLanguage}&movieId=${movieId}`;

        const movie = await fetch(urlMovie).then((response) => response.json());
        const credits = await fetch(urlCredits).then((response) =>
          response.json()
        );
        movie.language = actualLanguage;

        // Get directors only
        const directors = credits.crew.filter(
          (member) => member.job === "Director"
        );

        setState({
          ...movie,
          actors: credits.cast,
          directors,
        });

        setLoading(false);
      } catch (fetchMovieError) {
        setError(true);
      }
    };

    const sessionState = persistedState(movieId);

    if (sessionState && sessionState.language === actualLanguage) {
      setState(sessionState);
      setLoading(false);
      return;
    }

    fetchMovie();
  }, [movieId, actualLanguage]);

  // Write to sessionStorage
  useEffect(() => {
    if (Object.entries(state).length !== 0)
      sessionStorage.setItem(movieId, JSON.stringify(state));
    sessionStorage.setItem("language", actualLanguage);
  }, [movieId, state, actualLanguage]);

  return { state, loading, error };
};

export default useMovieFetch;
