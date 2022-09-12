import React from 'react';

// Components.
import { Layout } from './layout/Layout';
import { Links } from './components/common/links/Links';

// SCSS.
import './global';

// Component props.
interface AppProps {}

const AppComponent: React.FC<AppProps> = () => {
  return (
    <Layout headerTitle='Home' accentColor={<div />}>
      <Links />
    </Layout>
  );
};

export const App = AppComponent;
