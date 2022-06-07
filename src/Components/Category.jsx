
export function Category({
  name,
  index,
  onClick,
  isActive
}) {
  return <li 
  onClick={onClick}
  className = { isActive ? "active" : ''}
  >{name}</li>
}