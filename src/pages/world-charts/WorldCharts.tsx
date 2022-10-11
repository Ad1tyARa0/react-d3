import React from 'react';

// SCSS.
import './WorldCharts.scss';

// Pages -- world - chart
const css_prefix = 'p--w-c__';

// Component props.
interface WorldChartsProps {}

const WorldChartsComponent: React.FunctionComponent<WorldChartsProps> = () => {
  return (
    <div className={`${css_prefix}main`}>
      <div>WorldCharts</div>
    </div>
  );
};

export const WorldCharts = WorldChartsComponent;
