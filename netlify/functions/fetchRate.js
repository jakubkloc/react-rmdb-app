import fetch from 'node-fetch';
import {API_KEY, API_URL } from './config';

exports.handler = async function (event, context) {
  try {
    const { sessionId } = event.queryStringParameters;
    const { movieId } = event.queryStringParameters;
    const { language } = event.queryStringParameters;

    const endpoint1 = `${API_URL}account?api_key=${API_KEY}&session_id=${sessionId}&${
      language === 'pl' ? 'language=pl-PL' : 'language=en-US'
    }`;
    const endpoint2 = `${API_URL}movie/${movieId}/account_states?api_key=${API_KEY}&session_id=${sessionId}&${
      language === 'pl' ? 'language=pl-PL' : 'language=en-US'
    }`;
    console.log('accoutId');
    const accountInfoText = await (await fetch(endpoint1)).text();
    const accoutId = JSON.parse(accountInfoText).id;
    console.log(accoutId);
    const movieInfo = await (await fetch(endpoint2)).text();

    return {
      statusCode: 200,
      body: movieInfo,
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }

};
