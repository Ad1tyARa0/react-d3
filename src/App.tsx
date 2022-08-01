import React from "react";

// Components.
import { BasicLineChart } from "./components/charts/basic-line-chart/BasicLineChart";

// SCSS.
import "./App.scss";

const css_prefix = "app__";

// Component props.
interface AppProps {}

const AppComponent: React.FunctionComponent<AppProps> = () => {
  const resizeRef: React.RefObject<HTMLDivElement> = React.createRef();

  return (
    <div className={`${css_prefix}main`}>
      <div className={`${css_prefix}wrapper`} ref={resizeRef}>
        <BasicLineChart
          top={10}
          right={50}
          bottom={50}
          left={50}
          width={900}
          height={400}
          fill="#E67E22"
        />
      </div>
    </div>
  );
};

export const App = AppComponent;
