import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ApiContextProvider } from "./contexts/ApiContext.jsx";
import "./index.css";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import { ThemeContextProvider } from "./contexts/ThemeContext.jsx";
import { ErrorContextProvider } from "./contexts/ErrorContext.jsx";
import { IntroductionContextProvider } from "./contexts/IntroductionContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <IntroductionContextProvider>
        <ErrorContextProvider>
          <AuthContextProvider>
            <ApiContextProvider>
              <App />
            </ApiContextProvider>
          </AuthContextProvider>
        </ErrorContextProvider>
      </IntroductionContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
