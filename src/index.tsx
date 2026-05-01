import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store";

import { CssBaseline } from "./components";
import theme from "./theme";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/projects/soapify">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);

reportWebVitals();
