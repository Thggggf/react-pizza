import React from "react"

import NotFoundBlock from "../Components/NotFoundBlock"

type NotFoundProps = {
  description?: string;
  title?: string;
}
export const NotFound: React.FC<NotFoundProps> = ({
  description = "К сожалению данная страница отсутствует",
  title = "Ничего не найдено"
}) =>  {
  return (
    <div className="container">
      <NotFoundBlock description = {description} title ={title}/>
    </div>
    
  )
}