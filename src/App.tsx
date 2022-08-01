import React from "react";

// Components.
import { BasicLineChart } from "./components/charts/basic-line-chart/BasicLineChart";

// SCSS.
import "./App.scss";
import { BasicAreaChart } from "./components/charts/basic-area-chart/BasicAreaChart";

const css_prefix = "app__";

// Component props.
interface AppProps {}

const AppComponent: React.FunctionComponent<AppProps> = () => {
  return (
    <div className={`${css_prefix}main`}>
      <BasicAreaChart
        top={10}
        right={50}
        bottom={50}
        left={50}
        width={900}
        height={400}
        fill="#E67E22"
      />
    </div>
  );
};

export const App = AppComponent;
