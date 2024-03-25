import React, { useMemo, useState, useEffect } from "react";
import { useTable, useFilters, usePagination } from "react-table";
import MOCK_DATA from "./mock-api.json";
import "./student-profile.css";
import { COLUMNS } from "./columns";

const StudentProfileList = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const [selectedRow, setSelectedRow] = useState(null);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    usePagination
  );

  useEffect(() => {
    if (selectedRow !== null) {
      openModal();
    }
  }, [selectedRow]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    page,
    gotoPage,
    pageCount,
    pageOptions,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
  } = tableInstance;

  const { pageIndex } = state;

  const openModal = () => {
    document.getElementById("modal").style.display = "block";
  };

  const closeModal = () => {
    document.getElementById("modal").style.display = "none";
    setSelectedRow(null);
  };

  const handleRowClick = (rowIndex) => {
    setSelectedRow(rowIndex);
  };

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table
              {...getTableProps()}
              className="table dataTable display custom-table"
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    {...headerGroup.getHeaderGroupProps()}
                  >
                    {headerGroup.headers.map((column) => (
                      <th key={column.id} {...column.getHeaderProps()}>
                        {column.render("Header")}
                        {column.canFilter ? column.render("Filter") : null}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} className="">
                {page.map((row, rowIndex) => {
                  prepareRow(row);
                  return (
                    <tr
                      key={rowIndex}
                      {...row.getRowProps()}
                      onClick={() => handleRowClick(rowIndex)}
                    >
                      {row.cells.map((cell, cellIndex) => {
                        return (
                          <td key={cellIndex} {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                      <td>
                        <button
                          onClick={() =>
                            console.log(`Delete row ${rowIndex}`)
                          }
                        >
                          <i className="la la-trash-o"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="d-flex justify-content-between">
              <span>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>
                {""}
              </span>
            </div>
            <div className="text-center mb-3">
              <div className="filter-pagination  mt-3">
                <button
                  className=" previous-button"
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                >
                  {"<<"}
                </button>

                <button
                  className="previous-button"
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  Previous
                </button>
                <button
                  className="next-button"
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  Next
                </button>
                <button
                  className=" next-button"
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                >
                  {">>"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedRow !== null && (
  <>
    <div id="modal-bg" className="modal-bg" style={modalBgStyle}></div>
    <div id="modal" className="modal" style={modalStyle}>
      <div className="modal-content" style={modalContentStyle}>
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>Modal Header</h2>
        <p>Some text in the Modal Body</p>
        <div className="modal-footer">
          <button className="btn" onClick={closeModal}>
            Close Modal
          </button>
        </div>
      </div>
    </div>
  </>
)}
    </div>
  );
};
const modalStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  zIndex: "1",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%", 
  height: "50%", 
  overflow: "auto",
};

const modalContentStyle = {
  backgroundColor: "#fefefe",
  padding: "20px",
  borderRadius: "8px",
};
const modalBgStyle = {
  position: "fixed",
  zIndex: "0",
  left: "0",
  top: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.4)",
};

export default StudentProfileList;
