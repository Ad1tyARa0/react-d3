import React from "react";
import { BasicLineChart } from "../../components/charts/basic-line-chart/BasicLineChart";

// SCSS.
import "./Home.scss";

// Pages -- home
const css_prefix = "p--h__";

const BOEING_DATA =
  "https://gist.githubusercontent.com/Ad1tyARa0/838f68337cbb9d9a64ecdff114216284/raw/line.csv";

// Component props.
interface HomeProps {}

const HomeComponent: React.FunctionComponent<HomeProps> = () => {
  return (
    <div className={`${css_prefix}main`}>
      <div className={`${css_prefix}title`}>Basic charts</div>

      <BasicLineChart
        url={BOEING_DATA}
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

export const Home = HomeComponent;
