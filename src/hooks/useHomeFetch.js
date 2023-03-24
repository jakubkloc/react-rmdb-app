import { useState, useEffect, useContext } from 'react';
// Helpers
import { persistedState } from '../helpers';
// Context
import { Context } from '../context';

const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

const useHomeFetch = () => {
  const { languageData } = useContext(Context);
  const { language } = languageData;
  const [searchTerm, setSearchTerm] = useState('');
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchMovies = async (page, selectedLanguage, inputSearchTerm = '') => {
    try {
      setError(false);
      setLoading(true);

      const url = `/.netlify/functions/fetchMovies?language=${selectedLanguage}&searchTerm=${inputSearchTerm}&page=${page}`;
      const movies = await fetch(url).then((response) => response.json());
      movies.language = selectedLanguage;

      setState((prev) => ({
        ...movies,
        results:
          page > 1 ? [...prev.results, ...movies.results] : [...movies.results],
      }));
      setLoading(false);
    } catch (fetchMoviesError) {
      setError(true);
      setLoading(false);
    }
  };
  // Search and initial
  useEffect(() => {
    if (!searchTerm) {
      const sessionState = persistedState('homeState');
      if (sessionState && sessionState.language === language) {
        setState(sessionState);
        return;
      }
    }

    setState(initialState);
    fetchMovies(1, language, searchTerm);
  }, [searchTerm, language]);

  // Load More
  useEffect(() => {
    if (!isLoadingMore) return;

    fetchMovies(state.page + 1, searchTerm, language);
    setIsLoadingMore(false);
  }, [isLoadingMore, searchTerm, state.page, language]);

  // Write to sessionStorage
  useEffect(() => {
    if (!searchTerm && state !== initialState) {
      sessionStorage.setItem('homeState', JSON.stringify(state));
      sessionStorage.setItem('language', JSON.stringify(language));
    }
  }, [searchTerm, state, language]);

  return {
    state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore,
  };
};

export default useHomeFetch;
