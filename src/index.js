import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import "antd/dist/antd.css";
import "suneditor/dist/css/suneditor.min.css";
import "./index.css";
import Management from "./App";

//import reportWebVitals from './reportWebVitals';

// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(
//   <React.StrictMode>
//     {/* <Router>
//       <Management />
//     </Router> */}
//     <Management />
//   </React.StrictMode>
// );
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <Management />
  </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
