import React from "react";

// Components.
import { HelloSVG } from "./components/HelloSVG/HelloSVG";
import { HelloD3Data } from "./components/HelloD3Data/HelloD3Data";

// SCSS.
import "./App.scss";
import {
  SimpleChart,
  SimpleChartFunctional,
} from "./components/examples/simple-chart/SimpleChart";

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
