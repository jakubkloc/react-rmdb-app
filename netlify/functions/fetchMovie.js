import fetch from 'node-fetch';
import { API_KEY, API_URL } from './config';

exports.handler = async function (event, context) {
  try {
    const { language } = event.queryStringParameters;
    const { movieId } = event.queryStringParameters;
    const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}${
      language === 'pl' ? '&language=pl-PL' : '&language=en-US'
    }`;
    const movie = await (await fetch(endpoint)).text();
    return {
      statusCode: 200,
      body: movie,
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};
