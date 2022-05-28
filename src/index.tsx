import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import { history } from "./router";

import { CssBaseline } from "./components";
import theme from "./theme";

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <Router history={history} basename="/projects/soapify">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </Router>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
