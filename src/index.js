import React, { Suspense } from "react";
// import ReactDOM from "react-dom";
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
// import { ApiProvider } from "@reduxjs/toolkit/query/react"; 
// import { apiSlice } from "./features/api";
// import { extendedApiSlice } from "./features/collections/collectionSlice";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// store.dispatch(extendedApiSlice.endpoints.getCollections.initiate());

root.render(
  <Suspense fallback={<Loader />}>
    <HashRouter>
    <Provider store={store}> 
      {/* <ApiProvider api={apiSlice}>  */}
        <App /> 
      {/* </ApiProvider> */}
    </Provider>
    </HashRouter>
  </Suspense>,

  // document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
