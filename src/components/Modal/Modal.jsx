import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    console.log('Modal componentDidMount');
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    console.log('Modal componentWillUnmount');
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = e => {
    console.log('e.target =>', e.target); //where the click actually happen
    console.log('e.currentTarget =>', e.currentTarget); //where it bubbled
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { pictureURL } = this.props;
    return createPortal(
      <div className={css.overlay} onClick={this.handleOverlayClick}>
        <div className={css.modal}>
          <img src={pictureURL} alt="" loading="lazy" />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
