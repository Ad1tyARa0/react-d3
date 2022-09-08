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
  headerTitle: string;
}

const LayoutComponent: React.FunctionComponent<LayoutProps> = ({
  children,
  accentColor,
  headerTitle,
}) => {
  return (
    <div className={`${css_prefix}main`}>
      <Header title={headerTitle}>{accentColor}</Header>

      {children}
    </div>
  );
};

export const Layout = LayoutComponent;
