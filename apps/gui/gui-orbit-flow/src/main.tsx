import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { IntlProvider } from "react-intl";
import { AuthenticationProvider } from "./providers/AuthenticationProvider";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthenticationProvider>
        <Provider store={store}>
          <IntlProvider defaultLocale="en" locale="en">
            <App />
          </IntlProvider>
        </Provider>
      </AuthenticationProvider>
    </BrowserRouter>
  </React.StrictMode>
);
