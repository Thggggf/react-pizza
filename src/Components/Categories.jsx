import React from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { setCategoryId, setCurrentPage} from '../redux/slices/filterSlice'
import { Category } from './Category';


const categories = ['Все', 'Мясные', 'Вегетарианская', "Гриль", 'Острые', 'Закрытые'];

export function Categories() {
  const dispatch = useDispatch();
  const onChangeCategory = (id) => {
    dispatch(setCurrentPage(1))
    dispatch(setCategoryId(id));
  };
  const categoryId = useSelector((state) => state.filter.categoryId);

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <Category
            name={categoryName}
            index={index}
            onClick={(id) => onChangeCategory(id)}
            isActive={categoryId === index}
            key={index}
          />
        ))}
      </ul>
    </div>
  );
}
