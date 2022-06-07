import React from 'react';

import { Category } from './Category';

export function Categories () {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const categories = ['Все', 'Мясные','Вегетарианская','Острые','Закрытые']


  return (
    <div className="categories">
    <ul>
      {
        categories.map( (category, index) => 
        <Category 
          name= {category}
          index = {index}
          onClick = {() => setActiveIndex(index)}
          isActive = {activeIndex === index}
          key ={index}
        />)
      }
    </ul>
</div>
  )
}