import { useState, useEffect, useContext } from "react";
// Helpers
import { persistedState } from "../helpers";
// Context
import { Context } from "../context";

export const useMovieFetch = (movieId) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { languageData } = useContext(Context);
  const { language } = languageData;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(false);

        const urlMovie = `/.netlify/functions/fetchMovie?language=${language}&movieId=${movieId}`;
        const urlCredits = `/.netlify/functions/fetchCredits?language=${language}&movieId=${movieId}`;

        const movie = await fetch(urlMovie).then((response) => response.json());
        const credits = await fetch(urlCredits).then((response) =>
          response.json()
        );
        movie.language = language;

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
      } catch (error) {
        setError(true);
      }
    };

    const sessionState = persistedState(movieId);

    if (sessionState && sessionState.language === language) {
      setState(sessionState);
      setLoading(false);
      return;
    }

    fetchMovie();
  }, [movieId, language]);

  // Write to sessionStorage
  useEffect(() => {
    if (Object.entries(state).length !== 0)
      sessionStorage.setItem(movieId, JSON.stringify(state));
    sessionStorage.setItem("language", JSON.stringify(language));
  }, [movieId, state, language]);

  return { state, loading, error };
};
