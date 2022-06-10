import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { setIsLoading } from '../redux/slices/homeStatesSlice';

import { Card } from '../Components/Card';
import { Categories } from '../Components/Categories';
import { Sort } from '../Components/Sort';
import { Skeleton } from '../Components/Card/skeleton';
import { AppContext } from '../Context.js';
import Pagination from '../Components/Pagination';
import { NotFound } from './NotFound';
import { options } from './../Components/Sort';

export function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const { isLoading } = useSelector((state) => state.homeStates);
  const isMounted = React.useRef(false);
  const [items, setItems] = React.useState([]);
  const { searchValue, setSearchValue } = React.useContext(AppContext);
  const search = searchValue ? `&search=${searchValue}` : '';

  React.useEffect(() => window.scrollTo(0, 0), []);

  React.useEffect(() => {
    if (isMounted.current) {
      (async function () {
        dispatch(setIsLoading(true));
        const order = sort.type[0] === '-' ? 'asc' : 'desc';
        const { data } = await axios.get(
          `https://629f31168b939d3dc291db2d.mockapi.io/items?page=${currentPage}&limit=4&${
            categoryId > 0 ? `category=${categoryId}` : ''
          }${search}&sortBy=${sort.type.replace('-', '')}&order=${order}`,
        );
        setItems(data);
        dispatch(setIsLoading(false));
      })();
    }
  }, [categoryId, sort, searchValue, currentPage]);

  // Если изменили параметры и был первый рендер.
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType: sort.type,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, searchValue, currentPage]);

  // На первом рендере парсим URL-параметры в Redux, если есть.
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = options.find((obj) => obj.type === params.sortType);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories />

          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(currentPage > 2 ? 2 : 4)].map((el, index) => {
                return <Skeleton key={index} />;
              })
            : items.map((item) => <Card {...item} key={item.id} />)}
        </div>
        {!isLoading && items.length === 0 && <NotFound />}
      </div>
      <Pagination />
    </>
  );
}
