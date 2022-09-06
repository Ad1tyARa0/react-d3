import React from 'react';
import { Header } from './Header';

// SCSS.
import './Layout.scss';

// Layout -- layout
const css_prefix = 'l--l__';

// Component props.
interface LayoutProps {
  children: JSX.Element;
  accentColor: JSX.Element;
}

const LayoutComponent: React.FunctionComponent<LayoutProps> = ({
  children,
  accentColor,
}) => {
  return (
    <div className={`${css_prefix}main`}>
      <Header title='Welcome'>{accentColor}</Header>

      <div className={`${css_prefix}inner-main`}>{children}</div>
    </div>
  );
};

export const Layout = LayoutComponent;
