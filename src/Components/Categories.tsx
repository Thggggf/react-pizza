import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { Category } from './Category';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCurrentPage(1));
    dispatch(setCategoryId(id));
  }, []);
  const categoryId = useSelector((state: any) => state.filter.categoryId);
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <Category
            name={categoryName}
            index={index}
            onClick={onChangeCategory}
            isActive={categoryId === index}
            key={index}
          />
        ))}
      </ul>
    </div>
  );
});
