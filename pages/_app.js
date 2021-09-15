import 'tailwindcss/tailwind.css';
import PostContextProvider from './api/post/postContextProvider';
import RoadmapData from './api/roadmap/roadmapContext';
import React from 'react';
import PropTypes from 'prop-types';

function MyApp({ Component, pageProps }) {
  return (
    <RoadmapData>
      {/* <PostContextProvider> */}
      <Component {...pageProps} />
      {/* </PostContextProvider> */}
    </RoadmapData>
  );
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};
export default MyApp;
