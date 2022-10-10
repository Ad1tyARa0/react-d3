import React from 'react';
import ReactDOM from 'react-dom/client';
import RootProvider from './context/RootContext';

// Routes.
import { RoutesComponent } from './routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RootProvider>
      <RoutesComponent />
    </RootProvider>
  </React.StrictMode>
);
