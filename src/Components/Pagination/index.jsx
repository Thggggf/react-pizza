import React from 'react';
import ReactPaginate from 'react-paginate';

import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filterSlice';


import styles from './Pagination.module.scss';

const Pagination = () => {
  const dispatch = useDispatch()
  const currentPage = useSelector((state) => state.filter.currentPage)

  
  const onChangePage = (number) => dispatch(setCurrentPage(number));
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage = {currentPage - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
