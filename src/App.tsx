import React from "react";

// Components.
import { CircleWithEvents } from "./components/examples/circle-with-events/CircleWithEvents";

// SCSS.
import "./App.scss";

const css_prefix = "app__";

// Component props.
interface AppProps {}

const AppComponent: React.FunctionComponent<AppProps> = () => {
  return (
    <div className={`${css_prefix}main`}>
      <CircleWithEvents />
    </div>
  );
};

export const App = AppComponent;
