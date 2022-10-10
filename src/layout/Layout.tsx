import React from 'react';
import { RouteProps, useLocation } from 'react-router-dom';
import { Header } from './Header';

// SCSS.
import './Layout.scss';

// Layout -- layout
const css_prefix = 'l--l__';

// Component props.
interface LayoutProps {
  // children: JSX.Element;
  children: RouteProps['children'];
  accentColor: JSX.Element;
}

const LayoutComponent: React.FunctionComponent<LayoutProps> = ({
  children,
  accentColor,
}) => {
  const location = useLocation();

  const TITLE_MAP: { [m: string]: string } = {
    '/expense-manager': 'Expense Manager',
    '/': 'Home',
    '/home': 'Line & Area Charts',
    '/2': 'Scatter Plot',
    '/3': 'Bar Graph & Histogram',
  };

  return (
    <div className={`${css_prefix}main`}>
      <Header title={TITLE_MAP[location.pathname]}>{accentColor}</Header>

      {children}
    </div>
  );
};

export const Layout = LayoutComponent;
