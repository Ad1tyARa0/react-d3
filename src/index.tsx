import React from 'react';
import ReactDOM from 'react-dom/client';

// Routes.
import { RoutesComponent } from './routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RoutesComponent />
  </React.StrictMode>
);
