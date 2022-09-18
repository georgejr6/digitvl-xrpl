import React from 'react';
import Head from 'next/head';
import {Provider} from "react-redux";
import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import reducers from '../reducers'
import { ThemeProvider } from '@material-ui/core/styles';
// import { useStore } from "./store";
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme.js';
import '../styles/globals.css'
import '../styles/scss/FooterPlayer.scss';
import '../styles/scss/ControlsToggleButton.scss';
import '../styles/scss/Name.scss';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-notifications-component/dist/theme.css'
import "@pathofdev/react-tag-input/build/index.css";

// import "react-spinkit/css/loaders-css.css"
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import CustomMusicPlayer from "../components/player/CustomMusicPlayer";
import ReactNotification from "react-notifications-component";

const STRIPE_PUBLISHABLE_KEY = "pk_live_vwxZQV1ljD5wUdGz3WQRbPr900EibgZ1HH"
// const STRIPE_PUBLISHABLE_KEY = "pk_test_utELKNNX5QjQt9BTmkHlD71N00RZapjJeQ"
// const STRIPE_PUBLISHABLE_KEY = "pk_test_LPbi74JE59NNYpohjEuJHf15004en8ReKA"
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)
let store
function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
      <div>
        <Elements stripe={stripePromise}><Provider store={store}><React.Fragment>
    <Head>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    </Head>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <ReactNotification />
      <Component {...pageProps} />
      <CustomMusicPlayer />
    </ThemeProvider>
  </React.Fragment>
  </Provider>
        </Elements>
      </div>);
}
function initStore(initialState) {
  return createStore(
      reducers,
      initialState,
      composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
export default MyApp
