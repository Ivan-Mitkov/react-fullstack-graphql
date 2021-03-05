import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

const Page = ({ children }) => (
  <div>
    <Header />
    <h1>Page</h1>
    {children}
  </div>
);

export default Page;

Page.propTypes = {
  children: PropTypes.any,
};
