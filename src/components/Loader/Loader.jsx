import React from 'react';
import css from './Loader.module.css';
import { Hourglass } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div className={css.loader}>
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['#3f51b5', '#72a1ed']}
      />
    </div>
  );
}
