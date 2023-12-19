import axios from "axios";
import React, { useState, useEffect, useDeferredValue } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../src/components/Style.css";
import { Header } from "./components/Table/Header";
import { Table } from "./components/Table/Table";
import { Rows } from "./components/Table/Rows";
import { Pagination } from "./components/Table/Pagination";
import updatedUrl from "./utils/updateUrl";
import { Loader } from "./components/Loader/Loader";

function sortBy(prop, order) {
  return function (a, b) {
    if (order === "asc") {
      return a[prop] < b[prop] ? -1 : a[prop] > b[prop] ? 1 : 0;
    }
    if (order === "desc") {
      return a[prop] > b[prop] ? -1 : a[prop] < b[prop] ? 1 : 0;
    }
  };
}

function App(props) {
  const [columns, setColumns] = useState(["id", "name", "created"]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApi, setSelectedApi] = useState("character");
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://rickandmortyapi.com/api/character/"
  );
  const [results, setResults] = useState([]);
  const [sorting, setSorting] = useState({ column: "id", order: "desc" });
  const [isLoading, setIsLoading] = useState(false);

  const sortTable = ({ newSorting, tableData }) => {
    setSorting(newSorting ? newSorting : sorting);
    const { order, column } = newSorting ? newSorting : sorting;
    const sortedTable = tableData
      ? [...tableData.sort(sortBy(column, order))]
      : [...results.sort(sortBy(column, order))];
    setResults(sortedTable);
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleApi = (name) => {
    setSelectedApi(name);
    switch (name) {
      case "location":
        setCurrentPage(1);
        setCurrentPageUrl("https://rickandmortyapi.com/api/location/");
        break;
      case "character":
        setCurrentPage(1);
        setCurrentPageUrl("https://rickandmortyapi.com/api/character/");
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    //перед выполнения запроса ставим экран загрузки
    setIsLoading(true);
    axios
      .get(`${currentPageUrl}?page=${currentPage}`)
      .then(({ data }) => {
        const { info, results } = data;
        sortTable({ tableData: results });
        setPages(info.pages);
        setColumns(Object.keys(results[0]));
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      });
  }, [currentPageUrl, currentPage]);

  if (isLoading) return <Loader />;
  return (
    <>
      <select value={selectedApi} onChange={(e) => handleApi(e.target.value)}>
        <option value="location">location</option>
        <option value="character">character</option>
      </select>
      <Table>
        <Header sortTable={sortTable} columns={columns} sorting={sorting} />
        <Rows entries={results} columns={columns} />
        <Pagination
          setPage={setCurrentPage}
          pages={pages}
          currentPage={currentPage}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </Table>
    </>
  );
}

export default App;
