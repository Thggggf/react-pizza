import React from 'react'
import axios from "axios"


import { Card } from '../Components/Card';
import { Categories } from '../Components/Categories';

import { Sort } from '../Components/Sort';
import { Skeleton } from "../Components/Card/skeleton"

export function Home() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true)


  React.useEffect(() => {
    (async function () {
      const { data } = await axios.get("https://629f31168b939d3dc291db2d.mockapi.io/items")
      setItems(data)
      setIsLoading(false)
    })()
  }, [])
  return (
    <>
     <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(6)].map((el, index) => { return <Skeleton key={index} /> })
              : items.map((item) =>
                <Card
                  {...item}
                  key={item.id}
                />)
            }
          </div>
        
    </>
  )
}