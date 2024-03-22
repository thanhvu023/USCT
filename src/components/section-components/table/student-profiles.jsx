import React, { useMemo, useState } from 'react';
import { useTable, useFilters, usePagination } from 'react-table';
import MOCK_DATA from './mock-api.json';
import './student-profile.css';
import Select from "react-select";
import { COLUMNS } from './columns';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import {Modal, Button} from "react-bootstrap";
const options = [
	{ value: "basic_english", label: "Tiếng Anh cơ bản" },
	{ value: "ielts", label: "IELTS" },
	{ value: "toefl", label: "TOEFL" },
	{ value: "toeic", label: "TOEIC" },
	{ value: "esol", label: "ESOL" },
  ];
  

const StudenProfileList = () => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);
    const [modalCentered, setModalCentered] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const tableInstance = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 }
    }, useFilters, usePagination);

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

    const {  pageIndex } = state;



    const openModal = (rowIndex) => {
        setModalCentered(true);
        setSelectedRow(rowIndex);
    };
	const handleSubmit = (e) => {
		e.preventDefault();
		// Add your submit logic here
	  };
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> */}
                        <table {...getTableProps()} className="table dataTable display custom-table">
                            <thead>
                                {headerGroups.map(headerGroup => (
                                    <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map(column => (
                                            <th key={column.id} {...column.getHeaderProps()}>
                                                {column.render('Header')}
                                                {column.canFilter ? column.render('Filter') : null}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()} className="">
                                {page.map((row, rowIndex) => {
                                    prepareRow(row);
                                    return (
                                        <tr key={rowIndex} {...row.getRowProps()} onClick={() => openModal(rowIndex)}>
										
                                            {row.cells.map((cell, cellIndex) => {
                                                return <td key={cellIndex} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            })}
                                            <td>
                                                <button onClick={() => console.log(`Delete row ${rowIndex}`)}> 
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
                                Page{' '}
                                <strong>
                                    {pageIndex + 1} of {pageOptions.length}
                                </strong>{''}
                            </span>
                        </div>
                        <div className="text-center mb-3">
                            <div className="filter-pagination  mt-3">
                                <button className=" previous-button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
        
                                <button className="previous-button" onClick={() => previousPage()} disabled={!canPreviousPage}>
                                    Previous
                                </button>
                                <button className="next-button" onClick={() => nextPage()} disabled={!canNextPage}>
                                    Next
                                </button>
                                <button className=" next-button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

			
                {/* <!-- Modal --> */}
                <Modal className="fade" show={modalCentered} onHide={setModalCentered} centered>
                  <Modal.Header>
                    <Modal.Title>Chỉnh sửa hồ sơ </Modal.Title>
                    <Button
                      onClick={() => setModalCentered(false)}
                      variant=""
                      className="btn-close"
                    >
                      
                    </Button>
                  </Modal.Header>
                  <Modal.Body>
				
			
					<div className="pt-3">
                        <div className="settings-form">
                          <h4 className="text-primary">Chỉnh sửa thông tin </h4>
                          <form onSubmit={handleSubmit}>
                            <div className="row">
                              <div className="form-group mb-3 col-md-6">
                                <label className="form-label">Họ và tên</label>
                                <input
                                  type="text"
                                  placeholder="Họ và tên"
                                  className="form-control"
                                  value={selectedRow}
                                  disabled
                                />
                              </div>
                              <div className="form-group mb-3 col-md-6">
                                <label className="form-label">
                                  ID khách hàng
                                </label>
                                <input
                                  type="text"
                                  placeholder="ID khách hàng"
                                  className="form-control"
                                  value={"CustomerId"}
                                  disabled
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="form-group mb-3 col-md-6">
                                <label className="form-label">Ngày sinh</label>
                                <input type="date" className="form-control" />
                              </div>
							  <div className="form-group mb-3 col-md-6">
                                <label className="form-label">
									ID Quốc gia
                                </label>
                                <input
                                  type="text"
                                  placeholder="căn cước công dân"
                                  className="form-control"
                                  value={"08941234712"}
                                  
                                />
                              </div>
                            </div>
                            <div className="form-group mb-3">
                              <label className="form-label">
                                Qúa trình học tập
                              </label>
                              <div className="card h-auto">
                                <div className="card-body">
                                  <form></form>
                                  <label className="form-label">
                                    Mô tả ở đây
                                  </label>
                                  <div className="custom-ekeditor cms-radius add-content-ckeditor ">
                                    <CKEditor
                                      editor={ClassicEditor}
                                      // onReady={ editor => {

                                      // } }
                                      // onChange={ ( event, editor ) => {
                                      //     // const data = editor.getData();
                                      // } }
                                      // onBlur={ ( event, editor ) => {

                                      // } }
                                      // onFocus={ ( event, editor ) => {

                                      // } }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="form-group mb-3 ">
                              <label className="form-label">
                                Chứng chỉ tiếng Anh
                              </label>
                              <Select
                                options={options}
                                className="basic-multi-select"
                                isMulti
                                classNamePrefix="select"
                              />
                            </div>
                            
                          </form>
                        </div>
                      </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      onClick={() => setModalCentered(false)}
                      variant="danger light"
                    >
                      Close
                    </Button>
                    <Button variant="primary"
							type='submit'
					>Cập nhật</Button>
                  </Modal.Footer>
                </Modal>
        </>
    );
};

export default StudenProfileList;
