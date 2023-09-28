import { useState, useEffect } from "react";
// Translation
import { useTranslation } from "react-i18next";
// Helpers
import { persistedState } from "../helpers";

const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

const useHomeFetch = () => {
  const { i18n } = useTranslation();
  const actualLanguage = i18n.language;

  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchMovies = async (page, selectedLanguage, inputSearchTerm = "") => {
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
      const sessionState = persistedState("homeState");
      if (sessionState && sessionState.language === actualLanguage) {
        setState(sessionState);
        return;
      }
    }

    setState(initialState);
    fetchMovies(1, actualLanguage, searchTerm);
  }, [searchTerm, actualLanguage]);

  // Load More
  useEffect(() => {
    if (!isLoadingMore) return;

    fetchMovies(state.page + 1, actualLanguage, searchTerm);
    setIsLoadingMore(false);
  }, [isLoadingMore, searchTerm, state.page, actualLanguage]);

  // Write to sessionStorage
  useEffect(() => {
    if (!searchTerm && state !== initialState) {
      sessionStorage.setItem("homeState", JSON.stringify(state));
      sessionStorage.setItem("language", actualLanguage);
    }
  }, [searchTerm, state, actualLanguage]);

  return {
    state,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    setIsLoadingMore,
  };
};

export default useHomeFetch;
