import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/scss/base.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { ParallaxProvider } from "react-scroll-parallax";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ParallaxProvider>
        <App />
      </ParallaxProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
