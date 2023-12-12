// import PropTypes from 'prop-types';
import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchQuery: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      return toast.warn('Please enter a search query', {
        position: 'top-right',
        theme: 'colored',
      });
    }

    this.props.onSubmit(this.state.searchQuery.trim());
    this.setState({ searchQuery: '' });
  };

  handleQueryChange = e => {
    this.setState({ searchQuery: e.target.value.toLowerCase() });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button className={css.button} type="submit">
            <ImSearch className={css.icon} />
            <span className={css.label}>Search</span>
          </button>
          <input
            className={css.input}
            type="text"
            name="searchQuery"
            value={this.state.searchQuery}
            onChange={this.handleQueryChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
