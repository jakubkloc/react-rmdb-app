// Configuration for TMDB API
// Read more about the API here: https://developers.themoviedb.org/
const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = process.env.REACT_APP_API_KEY;
const SEARCH_BASE_URL = `${API_URL}search/movie?api_key=${API_KEY}&query=`;
const POPULAR_BASE_URL = `${API_URL}movie/popular?api_key=${API_KEY}`;
// For login and voting
const REQUEST_TOKEN_URL = `${API_URL}authentication/token/new?api_key=${API_KEY}`;
const LOGIN_URL = `${API_URL}authentication/token/validate_with_login?api_key=${API_KEY}`;
const SESSION_ID_URL = `${API_URL}authentication/session/new?api_key=${API_KEY}`;

const defaultConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export {
  API_KEY,
  API_URL,
  SEARCH_BASE_URL,
  POPULAR_BASE_URL,
  REQUEST_TOKEN_URL,
  LOGIN_URL,
  SESSION_ID_URL,
  defaultConfig,
};
