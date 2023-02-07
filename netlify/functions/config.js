// Configuration for TMDB API
// Read more about the API here: https://developers.themoviedb.org/
const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = process.env.REACT_APP_API_KEY;
module.exports = {
  API_URL: "https://api.themoviedb.org/3/",
  API_KEY: process.env.REACT_APP_API_KEY,
  SEARCH_BASE_URL: `${API_URL}search/movie?api_key=${API_KEY}&query=`,
  POPULAR_BASE_URL: `${API_URL}movie/popular?api_key=${API_KEY}`,
  // For login and voting
  REQUEST_TOKEN_URL: `${API_URL}authentication/token/new?api_key=${API_KEY}`,
  LOGIN_URL: `${API_URL}authentication/token/validate_with_login?api_key=${API_KEY}`,
  SESSION_ID_URL: `${API_URL}authentication/session/new?api_key=${API_KEY}`,

  defaultConfig: {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  },
};
