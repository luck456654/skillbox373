import React from "react";
import useIsValidArray from "../../hooks/useIsValidArray";

const HeaderCell = ({ column, sorting, sortTable }) => {
  const isDescSorting = sorting.column === column && sorting.order === "desc";
  const isAsccSorting = sorting.column === column && sorting.order === "asc";
  const futureSortingOrder = isDescSorting ? "asc" : "desc";
  return (
    <div
      className="table-header-cell"
      key={column}
      onClick={() =>
        sortTable({ newSorting: { column, order: futureSortingOrder } })
      }
    >
      {column}
      {isDescSorting && <span>↑</span>}
      {isAsccSorting && <span>↓</span>}
    </div>
  );
};

export const Header = ({ columns, sorting, sortTable }) => {
  const isValidColumns = useIsValidArray(columns);
   if (!isValidColumns) {
    return <div>Not valid</div>;
  }
  return (
    <div className="table-header">
      {columns.map((column) => (
        <HeaderCell sortTable={sortTable} column={column} sorting={sorting} />
      ))}
    </div>
  );
};
