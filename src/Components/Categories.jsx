import React from 'react';

import { Category } from './Category';

export function Categories ({
  value,
  onClickCategory
}) {

  const categories = ['Все', 'Мясные','Вегетарианская','Острые','Закрытые']


  return (
    <div className="categories">
    <ul>
      {
        categories.map( (categoryName, index) => 
        <Category 
          name = {categoryName}
          index = {index}
          onClick = {(id) => onClickCategory(id)}
          isActive = {value === index}
          key ={index}
        />)
      }
    </ul>
</div>
  )
}