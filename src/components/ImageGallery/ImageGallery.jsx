import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export default function ImageGallery({ pictures }) {
  return (
    <ul className={css.gallery}>
      {pictures.map(({ id, webformatURL }) => (
        <ImageGalleryItem key={id} pictureURL={webformatURL} />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      //   largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};
