import React from "react";

import { Home } from "./pages/home/Home";

// SCSS.
import "./global";

// Component props.
interface AppProps {}

const AppComponent: React.FunctionComponent<AppProps> = () => {
  return (
    <>
      <Home />
    </>
  );
};

export const App = AppComponent;
