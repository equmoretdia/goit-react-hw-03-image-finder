import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ pictureURL }) {
  return (
    <li className={css.item}>
      <img className={css.image} src={pictureURL} alt="" />
    </li>
  );
}

ImageGalleryItem.propTypes = { pictureURL: PropTypes.string.isRequired };

export default ImageGalleryItem;
