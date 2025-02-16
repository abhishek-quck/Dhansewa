import React, { Suspense } from "react";
import {createRoot} from 'react-dom/client';
import "./assets/scss/style.scss";
import 'select2'
import 'select2/dist/css/select2.min.css'
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import Loader from "./layouts/loader/Loader";
import { store } from "./store";
import { Provider } from "react-redux"; 
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
// store.dispatch(extendedApiSlice.endpoints.getCollections.initiate());

root.render(
  <Suspense fallback={<Loader />}>
    <HashRouter>
    <Provider store={store}> 
        <App /> 
    </Provider>
    </HashRouter>
  </Suspense>,
);
reportWebVitals();
