import React, { Suspense } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import { RootState } from './redux/store';

import { Home } from './pages/Home';
import './scss/app.scss';
import MainLayout from './layouts/MainLayout';
import { divide } from 'lodash';

const Cart = React.lazy(() => import(/*webpackChunkName: 'Cart' */'./pages/Cart'));
const FullPizza = React.lazy(() => import(/*webpackChunkName: 'FullPizza' */'./pages/FullPizza'));
const NotFound = React.lazy(() => import(/*webpackChunkName: 'NotFound' */'./pages/NotFound'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={
        <Suspense>
          <NotFound />
        </Suspense>} />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<p>Идёт загрузка корзины...</p>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/pizza/:id"
          element={
            <Suspense fallback={<p>Идёт загрузка...</p>}>
              <FullPizza />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
