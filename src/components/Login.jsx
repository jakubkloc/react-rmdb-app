import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// Components
import Button from './Button';
// Styles
import Wrapper from './Login.styles';
// Context
import { Context } from '../context';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const { userData } = useContext(Context);
  const { setUser } = userData;

  const { languageData } = useContext(Context);
  const { language } = languageData;
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError(false);
    try {
      const urlRequestToken = '/.netlify/functions/getRequestToken';
      const requestToken = await fetch(urlRequestToken).then((response) => response.text());

      const urlSessionId = `/.netlify/functions/authenticate?requestToken=${requestToken}&username=${username}&password=${password}`;
      const sessionId = await fetch(urlSessionId).then((response) => response.json());
      setUser({ sessionID: sessionId.session_id, requestToken, username });

      navigate('/');
    } catch (submitError) {
      setError(true);
    }
  };

  const handleInput = (e) => {
    const { name } = e.currentTarget;
    const { value } = e.currentTarget;

    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
  };

  return (
    <Wrapper>
      {error && <div className="error">There was an error!</div>}
      <form>
        <label htmlFor="username">
          {language === 'pl' ? 'Nazwa użytkownika' : 'Username' }
          <input
            id="username"
            type="text"
            value={username}
            name="username"
            onChange={handleInput}
            autoComplete="username"
          />
        </label>

        <input
          type="password"
          value={password}
          name="password"
          onChange={handleInput}
          autoComplete="current-password"
        />
      </form>
      <Button
        text={language === 'pl' ? 'Zaloguj' : 'Login'}
        callback={handleSubmit}
      />
    </Wrapper>
  );
}

export default Login;
