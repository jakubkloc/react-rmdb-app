import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Styles
import Image from './Thumb.styles';

function Thumb({ image, movieId, clickable }) {
  return (
    <div>
      {clickable ? (
        <Link to={`/${movieId}`}>
          <Image src={image} alt="movie-thumb" />
        </Link>
      ) : (
        <Image src={image} alt="movie-thumb" />
      )}
    </div>
  );
}

Thumb.propTypes = {
  image: PropTypes.string.isRequired,
  movieId: PropTypes.number,
  clickable: PropTypes.bool.isRequired,
};
Thumb.defaultProps = {
  movieId: null,
};

export default Thumb;
