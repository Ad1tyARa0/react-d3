import React from 'react';

import { Home } from './pages/home/Home';

// SCSS.
import './global';

// Component props.
interface AppProps {}

const AppComponent: React.FC<AppProps> = () => {
  return <h1>hello world</h1>;
};

export const App = AppComponent;
