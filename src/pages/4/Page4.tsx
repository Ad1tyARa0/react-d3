import React from 'react';
import { Layout } from '../../layout/Layout';

// SCSS.
import './Page4.scss';

// Pages -- page 4
const css_prefix = 'p--p4__';

// Component props.
interface Page4Props {}

const Page4Component: React.FunctionComponent<Page4Props> = () => {
  return (
    <Layout headerTitle='Expense Manager' accentColor={<div />}>
      <div className={`${css_prefix}main`}>
        <div>Page4</div>
      </div>
    </Layout>
  );
};

export const Page4 = Page4Component;
