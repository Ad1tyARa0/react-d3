import React from "react";
import { BasicLineChart } from "../../components/charts/basic-line-chart/BasicLineChart";

// SCSS.
import "./Home.scss";

// Pages -- home
const css_prefix = "p--h__";

// Component props.
interface HomeProps {}

const HomeComponent: React.FunctionComponent<HomeProps> = () => {
  return (
    <div className={`${css_prefix}main`}>
      <BasicLineChart
        top={10}
        right={50}
        bottom={50}
        left={50}
        width={900}
        height={500}
        fill="#E67E22"
      />
    </div>
  );
};

export const Home = HomeComponent;
