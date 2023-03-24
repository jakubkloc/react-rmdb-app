import fetch from 'node-fetch';
import { API_KEY, API_URL, defaultConfig } from './config';

exports.handler = async function (event) {
  try {
    const { sessionId } = event.queryStringParameters;
    const { movieId } = event.queryStringParameters;
    const { value } = event.queryStringParameters;

    const endpoint = `${API_URL}movie/${movieId}/rating?api_key=${API_KEY}&session_id=${sessionId}`;

    const rating = await (
      await fetch(endpoint, {
        ...defaultConfig,
        body: JSON.stringify({ value }),
      })
    ).text();

    return {
      statusCode: 200,
      body: rating,
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};
