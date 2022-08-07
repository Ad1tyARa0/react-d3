import React, { useState } from "react";

// Components.
import { BasicLineChart } from "../../components/charts/basic-line-chart/BasicLineChart";
import { AccentColor } from "./components/AccentColor";

// Constants.
import { COLORS } from "../../utils/constants/colors";

// SCSS.
import "./Home.scss";

// Pages -- home
const css_prefix = "p--h__";

// Component props.
interface HomeProps {}

const HomeComponent: React.FunctionComponent<HomeProps> = () => {
  const [accentColor, setAccentColor] = useState<{
    title: string;
    value: string;
  }>({ value: "#2ECC71", title: "green" });

  const onClickSetAccentColor = (payload: { title: string; value: string }) => {
    setAccentColor(payload);
  };

  return (
    <div className={`${css_prefix}main`}>
      <AccentColor
        colors={COLORS}
        onClickSetAccentColor={onClickSetAccentColor}
        title="Set accent color"
      />

      <BasicLineChart
        top={10}
        right={50}
        bottom={50}
        left={50}
        width={900}
        height={450}
        accentColor={accentColor}
      />
    </div>
  );
};

export const Home = HomeComponent;
