import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

// Components.
import { App } from '../App';
import { Page2 } from '../pages/2/Page2';
import { Home } from '../pages/home/Home';

// Component props.
interface RoutesProps {}

export const RoutesComponent: React.FunctionComponent<RoutesProps> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />

        <Route path='/home' element={<Home />} />

        <Route path='/2' element={<Page2 />} />
      </Routes>
    </BrowserRouter>
  );
};
