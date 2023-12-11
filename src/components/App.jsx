import { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';

import api from '../services/api';

export default class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    picturesSet: [],
    searchMatches: 0,
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery) {
      try {
        api(searchQuery, page).then(pictures => {
          this.setState(
            prevState => ({
              picturesSet: pictures.hits,
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
    const { searchQuery, page } = this.state;
    try {
      api(searchQuery, page + 1).then(pictures => {
        this.setState(
          prevState => ({
            picturesSet: [...prevState.picturesSet, ...pictures.hits],
            searchMatches: prevState.searchMatches + pictures.hits.length,
            page: prevState.page + 1,
          }),
          () => {
            console.log(
              `we have loaded ${this.state.searchMatches} out of ${this.state.totalHits} totally found`
            );
          }
        );
      });
    } catch (error) {
      if (error.message === 'Network Error') {
        console.log(
          'Internet connection is lost. Please try again as soon as your connection is restored'
        );
      } else {
        console.log('An error occurred: ', error.message);
      }
    }
  };

  render() {
    const { picturesSet, searchMatches, totalHits } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleQuery} />

        {picturesSet.length > 0 && <ImageGallery pictures={picturesSet} />}
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
