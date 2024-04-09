import React, { useMemo, useState, useEffect } from "react";
import { useTable, useFilters, usePagination } from "react-table";
import MOCK_DATA from "./mock-api.json";
import "./student-profile.css";
import { COLUMNS } from "./columns";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudentProfileByCustomerId } from "../../../redux/slice/studentSice";

const StudentProfileList = () => {
  const columns = useMemo(() => COLUMNS, []);

  const userId = useSelector((state) => state.auth.userById.customerId);

  const data = useSelector(
    (state) => state.student.studentProfileByCustomerId
  );

  // const studentProfileId = useSelector(
  //   (state) => state.student.studentProfileByCustomerId[0].studentProfileId
  // );
  // console.log("studentId là:", studentProfileId)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudentProfileByCustomerId(userId));
  }, [userId]);
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();

  const handleRowClick = (studentProfileId, fullName, email,createDate, phone, nationalId, gender, dateOfBirth, placeOfBirth, studyProcess) => {
    // Navigate to StudentProfileDetail with necessary information in URL
    navigate(`/student-profile-detail/${studentProfileId}/${fullName}/${email}/${createDate}/${dateOfBirth}/${gender}/${nationalId}/${phone}/${placeOfBirth}/${studyProcess}`);
  };
  
  const tableInstance = useTable(
    {
      columns,
      data,
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
                      onClick={() => handleRowClick(row.original.studentProfileId, row.original.fullName, row.original.email, row.original.createDate, row.original.phone, row.original.nationalId, row.original.gender, row.original.dateOfBirth, row.original.placeOfBirth, row.original.studyProcess)}
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
                  {pageIndex + 1} of {pageOptions.length}
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
    </div>
  );
};

export default StudentProfileList;
