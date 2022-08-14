import React, { useState } from 'react';

// Components.
import { AccentColor } from './components/AccentColor';
import { BasicBarChart } from '../../components/charts/basic-bar-chart/BasicBarChart';
import { BasicLineChart } from '../../components/charts/basic-line-chart/BasicLineChart';
import { BasicAreaChart } from '../../components/charts/basic-area-chart/BasicAreaChart';

// Constants.
import { COLORS } from '../../utils/constants/colors';

// SCSS.
import './Home.scss';
import { Layout } from '../../layout/Layout';

// Pages -- home
const css_prefix = 'p--h__';

// Component props.
interface HomeProps {}

const HomeComponent: React.FC<HomeProps> = () => {
  const [accentColor, setAccentColor] = useState<{
    title: string;
    value: string;
  }>({ value: '#2ECC71', title: 'green' });

  const onClickSetAccentColor = (payload: { title: string; value: string }) => {
    setAccentColor(payload);
  };

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
        <>
          <BasicLineChart
            top={10}
            right={50}
            bottom={50}
            left={50}
            width={800}
            height={400}
            accentColor={accentColor}
          />

          <BasicAreaChart
            top={10}
            right={50}
            bottom={50}
            left={50}
            width={800}
            height={400}
            accentColor={accentColor}
          />

          <BasicBarChart
            top={50}
            right={50}
            bottom={50}
            left={50}
            width={1200}
            height={450}
            accentColor={accentColor}
          />
        </>
      </Layout>
    </div>
  );
};

export const Home = HomeComponent;
