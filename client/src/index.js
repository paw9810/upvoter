import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-mui";

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate}>
      <App />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
