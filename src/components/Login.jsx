import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// Translations
import { useTranslation } from "react-i18next";
// Components
import Button from "./Button";
// Styles
import Wrapper from "./Login.styles";
// Context
import { Context } from "../context";

function Login() {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const { userData } = useContext(Context);
  const { setUser } = userData;

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError(false);
    try {
      const urlRequestToken = "/.netlify/functions/getRequestToken";
      const requestToken = await fetch(urlRequestToken).then((response) =>
        response.text()
      );

      const urlSessionId = `/.netlify/functions/authenticate?requestToken=${requestToken}&username=${username}&password=${password}`;
      const sessionId = await fetch(urlSessionId).then((response) =>
        response.json()
      );
      setUser({ sessionID: sessionId.session_id, requestToken, username });

      navigate("/");
    } catch (submitError) {
      setError(true);
    }
  };

  const handleInput = (e) => {
    const { name } = e.currentTarget;
    const { value } = e.currentTarget;

    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  return (
    <Wrapper>
      {error && <div className="error">There was an error!</div>}
      <form>
        <label htmlFor="username">
          {t("login.username")}
          <input
            id="username"
            type="text"
            value={username}
            name="username"
            onChange={handleInput}
            autoComplete="username"
            placeholder="presentationAccount"
          />
        </label>

        <label htmlFor="password">
          {t("login.password")}
          <input
            type="password"
            value={password}
            name="password"
            onChange={handleInput}
            autoComplete="current-password"
            placeholder="test1234"
          />
        </label>
      </form>
      <Button text={t("login.login")} callback={handleSubmit} />
    </Wrapper>
  );
}

export default Login;
