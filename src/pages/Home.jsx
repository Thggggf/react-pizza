import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

import { Card } from '../Components/Card';
import { Categories } from '../Components/Categories';
import { Sort } from '../Components/Sort';
import { Skeleton } from '../Components/Card/skeleton';
import { AppContext } from '../Context.js';
import Pagination from '../Components/Pagination';
import { NotFound } from './NotFound';

export function Home() {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filter);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const { searchValue, setSearchValue } = React.useContext(AppContext);
  const search = searchValue ? `&search=${searchValue}` : '';
  React.useEffect(() => window.scrollTo(0, 0), []);
  React.useEffect(() => {
    (async function () {
      setIsLoading(true);
      const order = sort.type[0] === '-' ? 'asc' : 'desc';
      const { data } = await axios.get(
        `https://629f31168b939d3dc291db2d.mockapi.io/items?page=${currentPage}&limit=4&${
          categoryId > 0 ? `category=${categoryId}` : ''
        }${search}&sortBy=${sort.type.replace('-', '')}&order=${order}`,
      );
      setItems(data);
      setIsLoading(false);
    })();
  }, [categoryId, sort, searchValue, currentPage]);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onClickCategory={onChangeCategory} />

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
      <Pagination onChangePage={(page) => setCurrentPage(page)} />
    </>
  );
}
