import React, { useCallback, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { DIAMONDS_DATA_FULL as URL } from '../../utils/constants/data';

// Components.
import { Layout } from '../../layout/Layout';
import { Title } from '../../components/common/title/Title';
import { Loader } from '../../components/common/loader/Loader';
import { ScatterPlot } from '../../components/charts/scatter-plot/ScatterPlot';

// Constants.
import { DEFAULT_DIMENSIONS } from '../../utils/constants/charts';

// Types and interfaces.
import { ScatterPlotType } from '../../utils/types/charts';

// SCSS.
import './Page2.scss';

// Pages -- page 2
const css_prefix = 'p--p2__';

// Component props.
interface Page2Props {}

const Page2Component: React.FunctionComponent<Page2Props> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ScatterPlotType[]>([]);

  const fetchScatterPlotData = useCallback(async (URL: string) => {
    try {
      setLoading(true);

      let response = await d3.dsv(',', URL, d => {
        return {
          price: d.price,
          carat: d.carat,
        };
      });

      setData(response as unknown as ScatterPlotType[]);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScatterPlotData(URL);
  }, [fetchScatterPlotData]);

  if (loading) {
    return (
      <div className={`${css_prefix}loader-main`}>
        <Loader />
      </div>
    );
  }

  return (
    <Layout headerTitle='Scatter Plots' accentColor={<div />}>
      <div className={`${css_prefix}main`}>
        <Title
          title='Diamond Prices'
          subTitle='Carat VS Price in USD (50,000+ data points)'
          accentColor={{ title: 'black', value: '#fff' }}
          defaultColor='#F39C12'
        />

        <ScatterPlot dimensions={DEFAULT_DIMENSIONS} data={data} />
      </div>
    </Layout>
  );
};

export const Page2 = Page2Component;
