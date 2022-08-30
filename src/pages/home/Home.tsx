import React, { Fragment, useEffect, useRef, useState } from 'react';

// Components.
import { Layout } from '../../layout/Layout';
import { AccentColor } from './components/AccentColor';
import { BarChart } from '../../components/charts/bar-chart/BarChart';
import { LineChart } from '../../components/charts/line-chart/LineChart';
import { AreaChart } from '../../components/charts/area-chart/AreaChart';

// Constants.
import { COLORS } from '../../utils/constants/colors';

// SCSS.
import './Home.scss';

// Types and interfaces.
import { DimensionsType } from '../../utils/types/charts';
import { PieChart } from '../../components/charts/pie-chart/PieChart';

// Pages -- home
const css_prefix = 'p--h__';

// Component props.
interface HomeProps {}

const HomeComponent: React.FC<HomeProps> = () => {
  const dimensions: DimensionsType = {
    top: 10,
    bottom: 50,
    right: 50,
    left: 50,
  };

  const svgContainer = useRef<HTMLDivElement | null>(null);

  const [width, setWidth] = useState<number>();

  const [accentColor, setAccentColor] = useState<{
    title: string;
    value: string;
  }>({ value: '#2ECC71', title: 'green' });

  /**
   * Set accent color.
   * @param payload - accent color.
   */
  const onClickSetAccentColor = (payload: { title: string; value: string }) => {
    setAccentColor(payload);
  };

  /**
   * Get width
   */
  const getWidth = () => {
    let newWidth = svgContainer.current?.getBoundingClientRect().width;

    // let newWidth = window.innerWidth;
    setWidth(newWidth);
  };

  /**
   * Add event listener.
   * - Clean up fn - remove even listener.
   */
  useEffect(() => {
    getWidth();

    window.addEventListener('resize', getWidth);

    return () => window.removeEventListener('resize', getWidth);
  }, []);

  return (
    <div className={`${css_prefix}main`}>
      <Layout
        accentColor={
          <AccentColor
            colors={COLORS}
            onClickSetAccentColor={onClickSetAccentColor}
            title='Set accent color'
          />
        }
      >
        <Fragment>
          <PieChart
            dimensions={dimensions}
            width={width!}
            accentColor={accentColor}
          />

          <LineChart
            svgContainer={svgContainer}
            dimensions={dimensions}
            width={width!}
            accentColor={accentColor}
          />

          <AreaChart
            dimensions={dimensions}
            width={width!}
            accentColor={accentColor}
            svgContainer={svgContainer}
          />

          <BarChart
            dimensions={dimensions}
            width={width!}
            accentColor={accentColor}
            svgContainer={svgContainer}
          />
        </Fragment>
      </Layout>
    </div>
  );
};

export const Home = HomeComponent;
