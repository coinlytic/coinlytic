// _app.tsx
import { AppProps } from 'next/app';  // Import the correct type for AppProps
import '../styles/globals.css';        // Import global CSS
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {  // Explicitly define the types for Component and pageProps
  return <Component {...pageProps} />;
}

export default MyApp;
