import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from './App.module.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import api from '../services/api';

export default class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    picturesSet: [],
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery) {
      const { searchQuery } = this.state;
      try {
        api(searchQuery, page).then(pictures =>
          this.setState({ picturesSet: pictures.hits })
        );
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
  }

  handleQuery = query => {
    this.setState({ searchQuery: query });
  };

  render() {
    const { picturesSet } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleQuery} />
        <ImageGallery pictures={picturesSet} />
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
