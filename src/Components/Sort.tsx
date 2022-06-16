import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setSort } from '../redux/slices/filterSlice';
import { selectSort } from '../redux/slices/filterSlice';
import { Sort as ISort} from "../redux/slices/filterSlice"


export const options: ISort[] = [
  { title: 'популярные', type: 'rating' },
  { title: 'дорогие', type: 'price' },
  { title: 'дешёвые', type: '-price' },
  { title: ' По алфавиту (А-Я)', type: '-name' },
  { title: 'По алфавиту (Я-А)', type: 'name' },
];
type PopupClick = MouseEvent & {
  path: Node[];
}
export const Sort: React.FC = React.memo(() => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);
  const sortRef = React.useRef<HTMLDivElement>(null);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const onOption = (obj: ISort) => {
    setOpen(false);
    dispatch(setSort(obj));
  };
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick
      if(labelRef.current && !open && _event.path.includes(labelRef.current)){
        setOpen(true)
      } else if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setOpen(false);
      }       
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);
  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label cu-p" ref = {labelRef} onClick={() => setOpen(true)}>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={open ? 'rotateDown' : ''}>
          <path
           
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сначало:</b>
        <span>{sort.title || "популярные"}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {options.map((obj, optionId) => (
              <li
                className={obj.type === sort.type ? 'active' : ''}
                onClick={() => onOption({ title: obj.title, type: obj.type })}
                key={obj.type}>
                {obj.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
)