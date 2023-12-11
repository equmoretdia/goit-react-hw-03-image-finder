import { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';
import Searchbar from './Searchbar';
import Loader from './Loader';
import ImageGallery from './ImageGallery';
import Button from './Button';

import api from '../services/api';

export default class App extends Component {
  state = {
    searchQuery: '',
    pendingRequest: false,
    page: 1,
    picturesSet: [],
    searchMatches: 0,
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ pendingRequest: true });
      try {
        api(searchQuery, page).then(pictures => {
          this.setState(
            prevState => ({
              pendingRequest: false,
              picturesSet: [...prevState.picturesSet, ...pictures.hits],
              searchMatches: prevState.searchMatches + pictures.hits.length,
              totalHits: pictures.totalHits,
            }),
            () => {
              console.log(
                `we have loaded ${this.state.searchMatches} out of ${this.state.totalHits} totally found`
              );
            }
          );
        });
      } catch (error) {
        this.setState({ pendingRequest: false });
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
    this.setState({
      searchQuery: query,
      page: 1,
      picturesSet: [],
      searchMatches: 0,
      totalHits: 0,
    });
  };

  loadMorePictures = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { pendingRequest, picturesSet, searchMatches, totalHits } =
      this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleQuery} />
        {picturesSet.length > 0 && <ImageGallery pictures={picturesSet} />}
        {pendingRequest && <Loader />}
        {searchMatches < totalHits && (
          <Button onClick={this.loadMorePictures} />
        )}

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
