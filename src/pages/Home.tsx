import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Status } from '../redux/slices/pizzasSlice';
import { Sort as ISort } from '../redux/slices/filterSlice';
import { FilterSliceState } from '../redux/slices/filterSlice';
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { useAppDispatch } from '../redux/store';
import { fetchPizzas, selectPizzasData } from '../redux/slices/pizzasSlice';

import { Card } from '../Components/Card';
import { Categories } from '../Components/Categories';
import { Sort } from '../Components/Sort';
import { Skeleton } from '../Components/Card/skeleton';
import { AppContext } from '../Context.js';
import Pagination from '../Components/Pagination';
import { NotFound } from './NotFound';
import { options } from '../Components/Sort';
import { CartItem } from '../redux/slices/cartSlice';

export const Home: React.FC  = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

  const { status, items } = useSelector(selectPizzasData);
  const isMounted = React.useRef(false);

  async function getPizzas() {
    const search = searchValue ? `&search=${searchValue}` : '';
    const order = sort.type[0] === '-' ? 'asc' : 'desc';

    dispatch(
      // @ts-ignore
      fetchPizzas({
        sortType: sort.type.replace('-', ''),
        order,
        search,
        currentPage,
        categoryId: categoryId > 0 ? `category=${categoryId}` : '',
      }),
    );
  }

  React.useEffect(() => {
    (async () => {
      await getPizzas();
      // Если изменили параметры и был первый рендер.
      if (isMounted.current) {
        const queryString = qs.stringify({
          sortType: sort.type,
          categoryId,
          currentPage,
        });
        navigate(`?${queryString}`);
      }
      isMounted.current = true;
    })();
  }, [categoryId, sort, searchValue, currentPage]);

  // На первом рендере парсим URL-параметры в Redux, если есть.
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = options.find((obj) => obj.type === params.sortType)
      if (!sort || !params.categoryId || !params.searchValue || !currentPage) {
        navigate('/');
        return;
      }
      dispatch(
        setFilters({
          searchValue: String(params.search) || "",
          categoryId: Number( params.category),
          sort: {title: sort.title, type : sort.type},
          currentPage:Number(params.page),
        }
      ));
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
          {status === Status.LOADING
            ? [...new Array(currentPage > 2 ? 2 : 4)].map((el, index) => {
                return <Skeleton key={index} />;
              })
            : items.map((item) => (                
                  <Card {...item}  key={item.id}/>        
              ))}
        </div>
        {status === Status.SUCCESS && items.length === 0 && (
          <NotFound description="К сожалению пицц не найдено" />
        )}
        {status === Status.ERROR && (
          <NotFound
            title="Произошла ошибка"
            description="При загрузке пицц, что-то пошло не так.."
          />
        )}
      </div>
      <Pagination />
    </>
  );
}
