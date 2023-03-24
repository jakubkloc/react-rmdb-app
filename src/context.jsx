import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { persistedState } from './helpers';

export const Context = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(() => persistedState('user'));

  const [language, setLanguage] = useState(
    () => persistedState('language') || 'pl',
  );

  const value = React.useMemo(() => ({
    userData: { user, setUser },
    languageData: { language, setLanguage },
  }), [user, language]);

  return (
    <Context.Provider
      value={value}
    >
      {children}
    </Context.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node,
};
UserProvider.defaultProps = {
  children: null,
};

export default UserProvider;
