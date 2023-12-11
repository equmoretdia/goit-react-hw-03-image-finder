import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import Modal from '../Modal';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  static propTypes = {
    pictures: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  state = {
    showModal: false,
    selectedPicture: null,
  };

  handleClick = url => {
    console.log(url);
    this.setState({ selectedPicture: url });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    const { showModal, selectedPicture } = this.state;
    const { pictures } = this.props;
    return (
      <>
        <ul className={css.gallery}>
          {pictures.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              onClick={this.handleClick}
            />
          ))}
        </ul>
        {showModal && (
          <Modal onClose={this.toggleModal} pictureURL={selectedPicture} />
        )}
      </>
    );
  }
}
