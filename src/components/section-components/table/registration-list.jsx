import React, { useMemo, useState, useEffect } from "react";
import { useTable, useFilters, usePagination } from "react-table";
import "./student-profile.css";
import { COLUMNS } from "./registration-columns";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import "./registration-list.css";
import { getRegistrationByCustomerId } from "../../../redux/slice/registrationSlice";
import { Backdrop, CircularProgress } from "@mui/material";
const RegistrationList = () => {
  const columns = useMemo(() => COLUMNS, []);
  const token = useSelector((state) => state?.auth?.token);
  const customerId = jwtDecode(token).UserId;
  const data = useSelector(
    (state) => state?.registration?.registrationByCustomerId
  );
  // console.log("data là:", data)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true); // Set loading to true before fetching data
    if (customerId) {
      dispatch(getRegistrationByCustomerId(customerId))
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [customerId, dispatch]);
  

  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();

  const handleRowClick = (registrationFormId) => {
    navigate(`/student-profile/registration-detail/${registrationFormId}`);
  };

  const normalizedData = Array.isArray(data) ? data : [data];

  const tableInstance = useTable(
    {
      columns,
      data: normalizedData,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    usePagination
  );

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

  return (
    <div>
      <div className="card">
      <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
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
                      onClick={() =>
                        handleRowClick(
                          row.original.registrationFormId,
                          
                        )
                      }
                    >
                      {row.cells.map((cell, cellIndex) => {
                      return (
                        <td key={cellIndex} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      );
                      
                      })}

                      <td>
                        {/* <button
                          onClick={() =>
                            console.log(`Delete row ${rowIndex}`)
                          }
                        >
                          <i className="la la-trash-o"></i>
                        </button> */}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="d-flex justify-content-between">
              <span>
                Page
                <strong>
                  {pageIndex + 1} of {pageOptions?.length}
                </strong>
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
                  style={{ color: "black" }}
                >
                  Previous
                </button>
                <button
                  className="next-button "
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                  style={{ color: "black" }}
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
    </div>
  );
};

export default RegistrationList;
