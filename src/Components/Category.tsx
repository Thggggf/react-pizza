import  React  from 'react';
import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';
type CategoryProps ={
  name: string;
  index: number;
  onClick: (i: number) => void;
  isActive: boolean;
}

export const Category:React.FC<CategoryProps> = React.memo( ({
  name,
  index,
  onClick,
  isActive
}) => {
  return <li 
  onClick={() => onClick(index)}
  className = { isActive ? "active" : ''}
  >{name}</li>
})