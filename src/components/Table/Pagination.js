import React from "react";

export const Pagination = ({
  pages,
  currentPage,
  prevPage,
  nextPage,
  setPage,
}) => {
  let items = [];

  for (let i = 1; pages >= i; i++) {
    items.push(i);
  }
  return (
    <div className="table-pagination">
      <button className="" disabled={currentPage === 1} onClick={prevPage}>
        Prev
      </button>
      {items.map((item) => (
        <button onClick={() => setPage(item)}>{item}</button>
      ))}
      <button disabled={currentPage === pages} className="" onClick={nextPage}>
        Next
      </button>
    </div>
  );
};
