import React from 'react';

// SCSS.
import './Header.scss';

// layout -- header
const css_prefix = 'l--h__';

// Component props.
interface HeaderProps {
  children: JSX.Element;
  title: string;
}

const HeaderComponent: React.FunctionComponent<HeaderProps> = ({
  children,
  title,
}) => {
  return (
    <div className={`${css_prefix}main`}>
      <div className={`${css_prefix}header-text`}>{title}</div>

      <div className={`${css_prefix}header-children`}>{children}</div>
    </div>
  );
};

export const Header = HeaderComponent;
