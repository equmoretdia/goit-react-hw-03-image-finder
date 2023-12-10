import { Component } from 'react';

import PropTypes from 'prop-types';
import css from './Button.module.css';

export default class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  clickHandle = e => {
    this.props.onClick();
  };

  render() {
    return (
      <>
        <button className={css.button} type="button" onClick={this.clickHandle}>
          Load more
        </button>
      </>
    );
  }
}
