import fetch from "node-fetch";
import { REQUEST_TOKEN_URL } from "./config";

const getRequestToken = async function (event) {
  try {
    const reqToken = await fetch(REQUEST_TOKEN_URL).then((r) => r.json());
    return {
      statusCode: 200,
      body: reqToken.request_token,
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};

export default getRequestToken;
