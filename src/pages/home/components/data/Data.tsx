import React from 'react';
import { Dropdown } from '../../../../components/common/dropdown/Dropdown';
import { AVAILABLE_DATASETS } from '../../../../utils/constants/datasets';

// SCSS.
import './Data.scss';

// Pages -- home -- components -- data
const css_prefix = 'p--h--c--d__';

// Component props.
interface DataProps {}

const DataComponent: React.FunctionComponent<DataProps> = () => {
  return (
    <div className={`${css_prefix}main`}>
      {/* <div></div> */}

      <Dropdown title='Available Datasets' items={AVAILABLE_DATASETS} />
    </div>
  );
};

export const Data = DataComponent;
