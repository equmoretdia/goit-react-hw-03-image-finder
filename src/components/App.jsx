import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from './App.module.css';
import Searchbar from './Searchbar';

export default class App extends Component {
  state = {
    searchQuery: '',
  };

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
