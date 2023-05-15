import React, {
  useState, useEffect, useRef,
} from 'react';
import PropTypes from 'prop-types';
// Image
import { useTranslation } from 'react-i18next';
import searchIcon from '../../images/search-icon.svg';
// Styles
import { Wrapper, Content } from './SearchBar.styles';
// Translation

function SearchBar({ setSearchTerm }) {
  const { t } = useTranslation();

  const [state, setState] = useState('');
  const initial = useRef(true);
  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return undefined;
    }
    const timer = setTimeout(() => {
      setSearchTerm(state);
    }, 500);

    return () => clearTimeout(timer);
  }, [setSearchTerm, state]);

  return (
    <Wrapper>
      <Content>
        <img src={searchIcon} alt="search-icon" />
        <input
          type="text"
          placeholder={t('searchBar.searchMovie')}
          onChange={(event) => setState(event.currentTarget.value)}
          value={state}
        />
      </Content>
    </Wrapper>
  );
}

SearchBar.propTypes = {
  setSearchTerm: PropTypes.func.isRequired,
};

export default SearchBar;
