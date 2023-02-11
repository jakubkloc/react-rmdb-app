import fetch from "node-fetch";
import { SEARCH_BASE_URL, POPULAR_BASE_URL } from "./config";

exports.handler = async function (event, context) {
  try {
    const { language } = event.queryStringParameters;
    const { searchTerm } = event.queryStringParameters;
    const { page } = event.queryStringParameters;

    const urlSearch = `${SEARCH_BASE_URL}&${
      language === "pl" ? "language=pl-PL" : "language=en-US"
    }&query=`;
    const urlPopular = `${POPULAR_BASE_URL}&${
      language === "pl" ? "language=pl-PL" : "language=en-US"
    }&query=`;

    const endpoint = searchTerm
      ? `${urlSearch}${searchTerm}&page=${page}`
      : `${urlPopular}&page=${page}`;
    const movies = await (await fetch(endpoint)).text();
    return {
      statusCode: 200,
      body: movies,
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};
