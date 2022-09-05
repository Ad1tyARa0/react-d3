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
import { AccentColor } from './components/accent-color/AccentColor';
import { PieChart } from '../../components/charts/pie-chart/PieChart';
import { BarChart } from '../../components/charts/bar-chart/BarChart';
import { LineChart } from '../../components/charts/line-chart/LineChart';
import { AreaChart } from '../../components/charts/area-chart/AreaChart';
import { ScatterPlot } from '../../components/charts/scatter-plot/ScatterPlot';

// Constants.
import { COLORS } from '../../utils/constants/colors';

// SCSS.
import './Home.scss';

// Types and interfaces.
import { DimensionsType } from '../../utils/types/charts';
import { BITCOIN_PRICE_DATA } from '../../utils/constants/data';
import { Loader } from '../../components/common/loader/Loader';
import { Data } from './components/data/Data';

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

  const [btcData, setBtcData] = useState<d3.DSVRowArray<string> | null>(null);

  const svgContainer = useRef<HTMLDivElement | null>(null);

  const [width, setWidth] = useState<number>();

  const [accentColor, setAccentColor] = useState<{
    title: string;
    value: string;
  }>({ value: '#2ECC71', title: 'green' });

  const [loading, setLoading] = useState<boolean>(false);
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

  const fetchBitcoinPriceData = useCallback(async () => {
    setLoading(true);

    try {
      let response = await d3.dsv(',', BITCOIN_PRICE_DATA);

      setBtcData(response);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBitcoinPriceData();
  }, [fetchBitcoinPriceData]);

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
          {/* <Loader /> */}

          {/* <div className={`${css_prefix}options-main`}>
            <div className={`${css_prefix}option-title`}>
              Step 1: Select dataset
            </div>

          </div> */}

          <Data accentColor={accentColor} />

          {/* <div className={`${css_prefix}graph-item`}>
            <ScatterPlot
              svgContainer={svgContainer}
              dimensions={dimensions}
              accentColor={accentColor}
            />
          </div> */}

          {/* <PieChart
            dimensions={dimensions}
            width={width!}
            accentColor={accentColor}
          />

          <LineChart
            svgContainer={svgContainer}
            dimensions={dimensions}
            width={width!}
            accentColor={accentColor}
          /> */}

          {/* <AreaChart
            dimensions={dimensions}
            width={width!}
            accentColor={accentColor}
            svgContainer={svgContainer}
          /> */}

          {/* <BarChart
            dimensions={dimensions}
            width={width!}
            accentColor={accentColor}
            svgContainer={svgContainer}
          /> */}
        </Fragment>
      </Layout>
    </div>
  );
};

export const Home = HomeComponent;
