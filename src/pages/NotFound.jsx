

import NotFoundBlock from "../Components/NotFoundBlock"


export const NotFound = ({
  description = "К сожалению данная страница отсутствует",
  title = "Ничего не найдено"
}) =>  {
  return (
    <div className="container">
      <NotFoundBlock description = {description} title ={title}/>
    </div>
    
  )
}