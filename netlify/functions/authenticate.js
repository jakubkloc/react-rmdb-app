import fetch from "node-fetch";
import { LOGIN_URL, defaultConfig, SESSION_ID_URL } from "./config";
exports.handler = async function (event, context) {
  try {
    const { requestToken } = event.queryStringParameters;
    const { username } = event.queryStringParameters;
    const { password } = event.queryStringParameters;

    const bodyData = {
      username,
      password,
      request_token: requestToken,
    };
    // First authenticate the requestToken
    const data = await (
      await fetch(LOGIN_URL, {
        ...defaultConfig,
        body: JSON.stringify(bodyData),
      })
    ).json();
    // Then get the sessionId with the requestToken
    if (data.success) {
      const sessionId = await fetch(SESSION_ID_URL, {
        ...defaultConfig,
        body: JSON.stringify({ request_token: requestToken }),
      }).then((r) => r.text());
      return {
        statusCode: 200,
        body: sessionId,
      };
    }
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};
