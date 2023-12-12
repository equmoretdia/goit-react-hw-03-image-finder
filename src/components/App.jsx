import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

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
              if (
                this.state.searchMatches === this.state.totalHits &&
                this.state.totalHits > 0
              ) {
                toast.info("You've reached the end of search results.", {
                  position: 'top-right',
                  theme: 'colored',
                });
              } else if (this.state.totalHits > 0 && this.state.page === 1) {
                toast.success(
                  `Hooray! We found ${this.state.totalHits} images`,
                  {
                    position: 'top-right',
                    theme: 'colored',
                  }
                );
              } else {
                toast.warn(
                  'No pictures were found for your query, please try another one!',
                  {
                    position: 'top-right',
                    theme: 'colored',
                  }
                );
              }
            }
          );
        });
      } catch (error) {
        this.setState({ pendingRequest: false });
        console.log('An error occurred: ', error.message);
        toast.error(`An error occurred: ${error.message}`, {
          position: 'top-right',
          theme: 'colored',
        });
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
