import React from 'react';

// SCSS.
import './global';
import RootProvider from './context/RootContext';
import { Links } from './components/common/links/Links';

// Component props.
interface AppProps {}

const AppComponent: React.FC<AppProps> = () => {
  return <Links />;
};

export const App = AppComponent;
