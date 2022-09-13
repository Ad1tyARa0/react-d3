import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

// Components.
import { App } from '../App';
import { Page2 } from '../pages/2/Page2';
import { Page3 } from '../pages/3/Page3';
import { ExpenseManager } from '../pages/4/ExpenseManager';
import { Home } from '../pages/home/Home';

// Component props.
interface RoutesProps {}

export const RoutesComponent: React.FunctionComponent<RoutesProps> = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />

      <Route path='/home' element={<Home />} />

      <Route path='/2' element={<Page2 />} />

      <Route path='/3' element={<Page3 />} />

      <Route path='/expense-manager' element={<ExpenseManager />} />
    </Routes>
  </BrowserRouter>
);
