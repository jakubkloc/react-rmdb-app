import React from "react";
import PropTypes from "prop-types";
// Translation
import { useTranslation } from "react-i18next";
// Helpers
import { calcTime, convertMoney } from "../../helpers";
// Styles
import { Wrapper, Content } from "./MovieInfoBar.styles";

function MovieInfoBar({ time, budget, revenue }) {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Content>
        <div className="column">
          <p>
            {t("movieInfoBar.runningTime")} {calcTime(time)}
          </p>
        </div>
        <div className="column">
          <p>
            {t("movieInfoBar.budget")} {convertMoney(budget)}
          </p>
        </div>
        <div className="column">
          <p>
            {t("movieInfoBar.revenue")} {convertMoney(revenue)}
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
