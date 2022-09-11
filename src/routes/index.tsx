import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { App } from '../App';
import { Home } from '../pages/home/Home';

// Component props.
interface RoutesProps {}

export const RoutesComponent: React.FunctionComponent<RoutesProps> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
