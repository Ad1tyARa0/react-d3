import React from 'react';

// SCSS.
import './ScatterPlot.scss';

// Components -- charts -- scatter - plot
const css_prefix = 'c--c--s-p__';

// Component props.
interface ScatterPlotProps {}

const ScatterPlotComponent: React.FunctionComponent<ScatterPlotProps> = () => {
  return (
    <div className={`${css_prefix}main`}>
      <div>ScatterPlot</div>
    </div>
  );
};

export const ScatterPlot = ScatterPlotComponent;
