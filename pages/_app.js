import { UserProvider } from '@auth0/nextjs-auth0';
import 'tailwindcss/tailwind.css';
import PostContextProvider from './api/post/postContextProvider';
import RoadmapData from './api/roadmap/roadmapContext';
import React from 'react';
import PropTypes from 'prop-types';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <RoadmapData>
        <PostContextProvider>
          <Component {...pageProps} />
        </PostContextProvider>
      </RoadmapData>
    </UserProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};
export default MyApp;
