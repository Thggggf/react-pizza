import React from 'react'

export function Sort({
  value,
  onSortOption
}) {
  const [open, setOpen] = React.useState(false)

  const options = [{title:"популярные", type: 'rating'},{title: "дорогие", type: "price"}, {title: "дешёвые", type: "-price"}, {title: " По алфавиту (А-Я)", type: "-name"}, {title: "По алфавиту (Я-А)", type: "name"}]
  const onOption = (type) =>{ 
    setOpen(false);
    onSortOption(type)
  }
  
  return (
    <div className="sort">
    <div className="sort__label cu-p"  onClick={ () => setOpen(!open)}>
        <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={open ? "rotateDown" : ""}
        >
            <path
                d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                fill="#2C2C2C"
            />
        </svg>
        <b>Сначало:</b>
        <span>
          {value.title}
        </span>
    </div>
    {
      open && (
        <div className="sort__popup">
        <ul>
        {
              options.map((obj, optionId) => 
              <li className={obj.type === value.type ? "active" : ""} onClick={() => onOption(obj)} key = {obj.type}>
                {obj.title}
              </li> )
            }
        </ul>
    </div>
      )
    }
</div>
  )
}