import  React  from 'react';

type CategoryProps ={
  name: string;
  index: number;
  onClick: (i: number) => void;
  isActive: boolean;
}

export const Category:React.FC<CategoryProps> = ({
  name,
  index,
  onClick,
  isActive
}) => {
  return <li 
  onClick={() => onClick(index)}
  className = { isActive ? "active" : ''}
  >{name}</li>
}