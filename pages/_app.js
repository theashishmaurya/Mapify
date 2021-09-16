import 'tailwindcss/tailwind.css';
import PostContextProvider from './api/post/postContextProvider';
import RoadmapData from './api/roadmap/roadmapContext';
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script src="https://code.iconify.design/2/2.0.3/iconify.min.js"></script>
      </Head>
      <RoadmapData>
        {/* <PostContextProvider> */}
        <Component {...pageProps} />
        {/* </PostContextProvider> */}
      </RoadmapData>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};
export default MyApp;
