import React, { useState, useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
// Image
import searchIcon from "../../images/search-icon.svg";
// Styles
import { Wrapper, Content } from "./SearchBar.styles";
// Context
import { Context } from "../../context";

const SearchBar = ({ setSearchTerm }) => {
  const { languageData } = useContext(Context);
  const { language } = languageData;

  const [state, setState] = useState("");
  const initial = useRef(true);
  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
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
          placeholder={language === "pl" ? "Szukaj Filmu" : "Search Movie"}
          onChange={(event) => setState(event.currentTarget.value)}
          value={state}
        />
      </Content>
    </Wrapper>
  );
};

SearchBar.propTypes = {
  callback: PropTypes.func,
};

export default SearchBar;
