import React from "react";

// Components.
import { SimpleChartFunctional } from "./components/examples/simple-chart/SimpleChart";

// SCSS.
import "./App.scss";

const css_prefix = "app__";

// Component props.
interface AppProps {}

const AppComponent: React.FunctionComponent<AppProps> = () => {
  return (
    <div className={`${css_prefix}main`}>
      <SimpleChartFunctional />
    </div>
  );
};

export const App = AppComponent;
