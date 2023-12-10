import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from './App.module.css';
import Searchbar from './Searchbar';
import api from '../services/api';

export default class App extends Component {
  state = {
    searchQuery: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.state;
    try {
      api(searchQuery, 1);
    } catch (error) {
      if (error.message === 'Network Error') {
        console.log(
          'Internet connection is lost. Please try again as soon as your connection is restored'
        );
      } else {
        console.log('An error occurred: ', error.message);
      }
    }
  }

  handleQuery = query => {
    this.setState({ searchQuery: query });
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleQuery} />

        <ToastContainer
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
        />
      </div>
    );
  }
}
