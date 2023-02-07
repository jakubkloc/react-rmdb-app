const config = require("./config");
const { API_KEY, API_URL } = config;

exports.handler = async function (event) {
  try {
    const { movieId } = event.queryStringParameters;
    const endpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    const credits = await (await fetch(endpoint)).text();
    return {
      statusCode: 200,
      body: credits,
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};
