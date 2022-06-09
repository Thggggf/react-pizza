
export function Category({
  name,
  index,
  onClick,
  isActive
}) {
  return <li 
  onClick={() => onClick(index)}
  className = { isActive ? "active" : ''}
  >{name}</li>
}