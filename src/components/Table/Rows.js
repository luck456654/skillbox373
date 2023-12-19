import React from "react";
import uuid from "../../utils/uuid";
import useIsValidArray from "../../hooks/useIsValidArray";

export const Rows = ({ entries, columns }) => {
  const isValidColumns = useIsValidArray(columns);
  const isValidEntries = useIsValidArray(entries);
   if (!isValidColumns || !isValidEntries) {
    return <div>Not valid</div>;
  }
 
  return entries.map((entry) => (
    <div className="table-rows-entry" key={uuid()}>
      {columns.map((column) => (
        <span className="table-rows-entry-cell" key={column}>
          {entry[column].toString()}
        </span>
      ))}
    </div>
  ));
};
