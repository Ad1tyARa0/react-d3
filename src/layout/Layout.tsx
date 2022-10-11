import React from 'react';
import { RouteProps, useLocation } from 'react-router-dom';
import { LINKS_TITLE_MAP } from '../utils/constants/links';
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

  return (
    <>
      <div className={`${css_prefix}main`}>
        <Header title={LINKS_TITLE_MAP[location.pathname]}>
          {accentColor}
        </Header>
        {children}
      </div>
    </>
  );
};

export const Layout = LayoutComponent;
