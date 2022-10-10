import React from 'react';
import {
  Routes,
  Route,
  BrowserRouter,
  Outlet,
  useLocation,
} from 'react-router-dom';

// Components.
import { App } from '../App';
import { Page2 } from '../pages/page-2/Page2';
import { Page3 } from '../pages/page-3/Page3';
import { Home } from '../pages/home/Home';
import { ExpenseManager } from '../pages/expense-manager/ExpenseManager';
import { Layout } from '../layout/Layout';
import { AccentColor } from '../components/common/accent-color/AccentColor';
import { COLORS } from '../utils/constants/colors';
import { RootContext } from '../context/RootContext';

// Component props.
interface RoutesProps {}

export const RoutesComponent: React.FunctionComponent<RoutesProps> = () => {
  const { onClickSetAccentColor } = React.useContext(RootContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Layout
              accentColor={
                <AccentColor
                  onClickSetAccentColor={onClickSetAccentColor}
                  colors={COLORS}
                  title='Set Accent Color'
                />
              }
            >
              <Outlet />
            </Layout>
          }
        >
          <Route path='/' element={<App />} />

          <Route path='/home' element={<Home />} />

          <Route path='/2' element={<Page2 />} />

          <Route path='/3' element={<Page3 />} />

          <Route path='/expense-manager' element={<ExpenseManager />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
