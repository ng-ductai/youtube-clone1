import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-lazy-load-image-component/src/effects/blur.css'
import "../src/scss/_base.scss";
import { BrowserRouter as Router } from "react-router-dom";
import store from '../src/redux/store'
import {Provider} from 'react-redux' 

ReactDOM.render(
  <Provider store={store} > 
    <Router>
      <App />
    </Router>
  </Provider>, document.getElementById("root")
);


