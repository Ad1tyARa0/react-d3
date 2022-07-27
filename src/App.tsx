import React from "react";

// Components.
import { BasicLineChart } from "./components/charts/basic-line-chart/BasicLineChart";

// SCSS.
import "./App.scss";

const css_prefix = "app__";

// Component props.
interface AppProps {}

const AppComponent: React.FunctionComponent<AppProps> = () => {
  return (
    <div className={`${css_prefix}main`}>
      <BasicLineChart
        top={10}
        right={50}
        bottom={50}
        left={50}
        width={920}
        height={420}
        fill="tomato"
      />
    </div>
  );
};

export const App = AppComponent;
