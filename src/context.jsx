import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { persistedState } from './helpers';

export const Context = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(() => persistedState('user'));

  const value = React.useMemo(() => ({
    userData: { user, setUser },
  }), [user]);

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
