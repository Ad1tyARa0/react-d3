import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import * as d3 from 'd3';

// Components.
import { Layout } from '../../layout/Layout';
import { Title } from '../../components/common/title/Title';
import { Loader } from '../../components/common/loader/Loader';
import { BarChart } from '../../components/charts/bar-chart/BarChart';
import { Histogram } from '../../components/charts/histogram/Histogram';
import { AccentColor } from '../../components/common/accent-color/AccentColor';

// Constants.
import { COLORS } from '../../utils/constants/colors';
import { ETH_OPEN as URL2 } from '../../utils/constants/data';
import { DEFAULT_DIMENSIONS } from '../../utils/constants/charts';
import { PROGRAMMING_LANGUAGES_DATA as URL } from '../../utils/constants/data';

// Types and interfaces.
import { BarChartType } from '../../utils/types/data';
import { AccentColorType } from '../../utils/types/accent-color';
import { HistogramDataType } from '../../utils/types/histogram';

// SCSS.
import './Page3.scss';

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
  const [histogramIsLoading, setHistogramIsLoading] = useState<boolean>(false);
  const [histogramData, setHistogramData] = useState<Array<HistogramDataType>>([
    { price: 0 },
  ]);

  const onClickSetAccentColor = (payload: AccentColorType) => {
    setAccentColor(payload);
  };

  const fetchHistogramData = useCallback(async (URL: string) => {
    try {
      setHistogramIsLoading(true);

      let response = await d3.dsv(',', '/data/historicalPrice.csv', d => {
        return {
          price: d.open as unknown as number,
        };
      });

      setHistogramData(response);

      setHistogramIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

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
    fetchHistogramData(URL2);
  }, [fetchHistogramData]);

  useEffect(() => {
    fetchBarChartData(URL);
  }, [fetchBarChartData]);

  const _renderBarChart = () => {
    return (
      <Fragment>
        <Title
          title='Most Popular Programming Languages - 2021'
          subTitle='Stack Overflow Survey'
          accentColor={accentColor}
        />

        {loading ? (
          <div className={`${css_prefix}loader-main`}>
            <Loader />
          </div>
        ) : (
          <BarChart
            dimensions={DEFAULT_DIMENSIONS}
            accentColor={accentColor}
            svgContainer={svgContainer}
            chartData={chartData}
          />
        )}
      </Fragment>
    );
  };

  const _renderHistogramChart = () => {
    return (
      <Fragment>
        <Title
          title='Ethereum USD (ETH-USD) - 2020'
          subTitle='Days / Price'
          accentColor={accentColor}
        />

        {histogramIsLoading ? (
          <div className={`${css_prefix}loader-main`}>
            <Loader />
          </div>
        ) : (
          <Histogram
            width={1000}
            height={600}
            data={histogramData}
            accentColor={accentColor}
            dimensions={DEFAULT_DIMENSIONS}
          />
        )}
      </Fragment>
    );
  };

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
        {_renderHistogramChart()}

        {_renderBarChart()}
      </div>
    </Layout>
  );
};

export const Page3 = Page3Component;
