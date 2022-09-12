import React, { useState } from 'react';
import { AccentColor } from '../../components/common/accent-color/AccentColor';
import { Layout } from '../../layout/Layout';
import { AccentColorType } from '../../utils/types/accent-color';
import { COLORS } from '../../utils/constants/colors';

// SCSS.
import './Page3.scss';

// Page -- page 3
const css_prefix = 'p--p3__';

// Component props.
interface Page3Props {}

const Page3Component: React.FunctionComponent<Page3Props> = () => {
  const [accentColor, setAccentColor] = useState<AccentColorType>({
    title: 'green',
    value: '#2ECC71',
  });

  const onClickSetAccentColor = (payload: AccentColorType) => {
    setAccentColor(payload);
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
        <div>Page3</div>
      </div>
    </Layout>
  );
};

export const Page3 = Page3Component;
