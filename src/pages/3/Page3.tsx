import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

// Components.
import { Layout } from '../../layout/Layout';
import { AccentColor } from '../../components/common/accent-color/AccentColor';

// Constants.
import { COLORS } from '../../utils/constants/colors';
import { PROGRAMMING_LANGUAGES_DATA as URL } from '../../utils/constants/data';

// Types and interfaces.
import { AccentColorType } from '../../utils/types/accent-color';

// SCSS.
import './Page3.scss';
import { Title } from '../../components/common/title/Title';
import { BarChartType } from '../../utils/types/data';
import { Loader } from '../../components/common/loader/Loader';
import { BarChart } from '../../components/charts/bar-chart/BarChart';
import { DEFAULT_DIMENSIONS } from '../../utils/constants/charts';

// Page -- page 3
const css_prefix = 'p--p3__';

// Component props.
interface Page3Props {}

const Page3Component: React.FunctionComponent<Page3Props> = () => {
  const svgContainer = useRef<HTMLDivElement | null>(null);

  const [accentColor, setAccentColor] = useState<AccentColorType>({
    title: 'green',
    value: '#2ECC71',
  });

  const [loading, setLoading] = useState<boolean>(false);

  const [chartData, setChartData] = useState<BarChartType[]>([]);

  const onClickSetAccentColor = (payload: AccentColorType) => {
    setAccentColor(payload);
  };

  const fetchBarChartData = useCallback(async (URL: string) => {
    try {
      setLoading(true);

      let response = await d3.dsv(',', URL, d => {
        return {
          name: d.language,
          value: d.value,
        } as unknown as BarChartType;
      });

      setChartData(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBarChartData(URL);
  }, [fetchBarChartData]);

  return (
    <Layout
      headerTitle='Bar Charts'
      accentColor={
        <AccentColor
          colors={COLORS}
          onClickSetAccentColor={onClickSetAccentColor}
          title='Set accent color'
        />
      }
    >
      <div className={`${css_prefix}main`}>
        <Title
          title='Most Popular Programming Languages - 2021'
          subTitle='Stack Overflow Survey'
          accentColor={accentColor}
        />

        {loading ? (
          <Loader />
        ) : (
          <BarChart
            dimensions={DEFAULT_DIMENSIONS}
            accentColor={accentColor}
            svgContainer={svgContainer}
            chartData={chartData}
          />
        )}
      </div>
    </Layout>
  );
};

export const Page3 = Page3Component;
