import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';

import wrapper from '../store/configureStore';

const DCU = ({ Component }) => (
  <>
    <Head>
      <title>DCU</title>
    </Head>
    <Component />
  </>
);

DCU.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(DCU);
