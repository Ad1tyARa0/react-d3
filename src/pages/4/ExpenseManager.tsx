import React from 'react';
import { Layout } from '../../layout/Layout';

// SCSS.
import './ExpenseManager.scss';

// Pages -- expense - manager
const css_prefix = 'p--e-m__';

// Component props.
interface ExpenseManagerProps {}

const ExpenseManagerComponent: React.FunctionComponent<
  ExpenseManagerProps
> = () => {
  return (
    <Layout headerTitle='Expense Manager' accentColor={<div />}>
      <div className={`${css_prefix}main`}>
        <div>ExpenseManager</div>
      </div>
    </Layout>
  );
};

export const ExpenseManager = ExpenseManagerComponent;
