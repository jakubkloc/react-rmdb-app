import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// Helpers
import { calcTime, convertMoney } from '../../helpers';
// Styles
import { Wrapper, Content } from './MovieInfoBar.styles';
// Context
import { Context } from '../../context';

function MovieInfoBar({ time, budget, revenue }) {
  const { languageData } = useContext(Context);
  const { language } = languageData;
  return (
    <Wrapper>
      <Content>
        <div className="column">

          <p>
            { language === 'pl' ? 'Czas Trwania:' : 'Running time:'}
            {calcTime(time)}
          </p>
        </div>
        <div className="column">
          <p>
            { language === 'pl' ? 'Budżet:' : 'Budget:'}
            {' '}
            {convertMoney(budget)}
          </p>
        </div>
        <div className="column">

          <p>
            { language === 'pl' ? 'Przychód:' : 'Revenue:'}
            {' '}
            {convertMoney(revenue)}
          </p>
        </div>
      </Content>
    </Wrapper>
  );
}

MovieInfoBar.propTypes = {
  time: PropTypes.number,
  budget: PropTypes.number,
  revenue: PropTypes.number,
};
MovieInfoBar.defaultProps = {
  time: null,
  budget: null,
  revenue: null,
};

export default MovieInfoBar;
