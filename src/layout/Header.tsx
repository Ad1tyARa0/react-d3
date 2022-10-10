import React from 'react';
import { Link } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';

// SCSS.
import './Header.scss';
import { RootContext } from '../context/RootContext';

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
  const { accentColor } = React.useContext(RootContext);

  return (
    <div className={`${css_prefix}main`}>
      <Link to='/'>
        <div className={`${css_prefix}header-icon`}>
          <IoHomeOutline />
        </div>
      </Link>

      <div
        className={`${css_prefix}header-text`}
        style={{ color: accentColor.value }}
      >
        {title}
      </div>

      <div className={`${css_prefix}header-children`}>{children}</div>
    </div>
  );
};

export const Header = HeaderComponent;
