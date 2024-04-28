import React, { useContext,useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable, useFilters, usePagination } from "react-table";
import jwtDecode from "jwt-decode";
import { getProgramFeesByProgramId, getAllProgramFees } from '../../../redux/slice/programFeeSlice';
import { getAllFeeTypes } from '../../../redux/slice/feeTypeSlice';
import { getProgramApplicationsByCustomerId } from "../../../redux/slice/programApplicationSlice";
import { COLUMNS } from "./student-profile-applied-columns";
import {
  Modal,
  Button,
  ListGroup, Row, Col, Card
} from "react-bootstrap";


import "./student-profile.css";

const StudentProfileAppliedList = () => {
  const dispatch = useDispatch();


  const [selectedProgramApplication, setSelectedProgramApplication] = useState(null);

  const paymentUrl = localStorage.getItem('paymentUrl');

  const layUrl = useSelector((state)=> state.payment.responseBody)
console.log("layUrl",layUrl)
  const columns = useMemo(() => COLUMNS, []);
  const token = useSelector(state => state.auth.token);
  const [customerId, setCustomerId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);



const handleCloseModal = () => {
  setIsModalOpen(false);
};
  useEffect(() => {
    try {
      const decoded = jwtDecode(token);
      setCustomerId(decoded.UserId);
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }, [token]);

  useEffect(() => {
    if (customerId) {
      dispatch(getProgramApplicationsByCustomerId(customerId));
    }
  }, [customerId, dispatch]);

  useEffect(() => {
    dispatch(getAllFeeTypes());
    dispatch(getAllProgramFees());
  }, [dispatch]);
  

  const fees = useSelector(state => state.programFee.fees);
  const feeTypes = useSelector(state => state.feeType.feeTypes); 
  const [selectedFee, setSelectedFee] = useState(null);


  const feeTypeName = feeTypes.find(
    fee => fee.programId === selectedProgramApplication?.applyStage?.programStage.program.programId
  )?.feeTypeId;

  const programApplications = useSelector(
    state => state.programApplication.programApplicationsByCustomerId || []
  );

  // const startDate = selectedProgramApplication.applyStage?.programStage.program.semester.startDate;
  // const endDate = selectedProgramApplication.applyStage?.programStage.program.semester.endDate;
  // const formattedStartDate = new Date(startDate).toLocaleDateString();
  // const formattedEndDate = new Date(endDate).toLocaleDateString();
  const data = useMemo(() => programApplications || [], [programApplications]);

  const handleRowClick = (programApplication) => {
    if (programApplication) {
      setSelectedProgramApplication(programApplication);
      setIsModalOpen(true);
    }
  };


  const tableInstance = useTable({ columns, data }, useFilters, usePagination);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageCount,
    pageOptions,
    state: { pageIndex }
  } = tableInstance;

  return (
    <div className="card">
      <div className="card-body">
        <div className="table-responsive">
          <table {...getTableProps()} className="table dataTable display custom-table">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th key={column.id} {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map(row => {
                prepareRow(row);
                return (
                  <tr key={row.id} {...row.getRowProps({
                    onClick: () => handleRowClick(row.original)
                  })}>
                    {row.cells.map(cell => (
                      <td key={cell.id} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Modal show={isModalOpen} onHide={handleCloseModal} centered>
     
      

<Modal.Body>
  {selectedProgramApplication && (
    <Card>
      <Card.Header as="h5">Thông tin chương trình đã đăng ký</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Row>
            <Col sm={4}><strong>Trường Đại học:</strong></Col>
            <Col sm={8}>
              {selectedProgramApplication.applyStage?.programStage.program.university.universityName} ({selectedProgramApplication.applyStage?.programStage.program.university.universityType.typeName})
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col sm={4}><strong>Tiểu bang:</strong></Col>
            <Col sm={8}>{selectedProgramApplication.applyStage?.programStage.program.university.state.stateName}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col sm={4}><strong>Chuyên ngành chính:</strong></Col>
            <Col sm={8}>{selectedProgramApplication.applyStage?.programStage.program.major.majorName}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col sm={4}><strong>Lộ trình học:</strong></Col>
            <Col sm={8}>{selectedProgramApplication.applyStage?.programStage.program.duration}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col sm={4}><strong>Trình độ đào tạo:</strong></Col>
            <Col sm={8}>{selectedProgramApplication.applyStage?.programStage.program.level}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col sm={4}><strong>Học kỳ:</strong></Col>
            {/* <Col sm={8}>bắt đầu từ {formattedStartDate} đến {formattedEndDate}</Col> */}
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col sm={4}><strong>Loại chương trình:</strong></Col>
            <Col sm={8}>{selectedProgramApplication.applyStage?.programStage.program.programType.typeName}</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
  <Row>
    <Col sm={4}><strong>Chi phí cần đóng:</strong></Col>
    <Col sm={8}>
    {layUrl && (
                    <div>
                        <a href={layUrl} target="_blank" rel="noopener noreferrer">Thanh toán ngay</a>
                    </div>
                )}
    </Col>
  </Row>
</ListGroup.Item>




      </ListGroup>
    </Card>
  )}
</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
                </div>
      </div>
    </div>
  );
};

export default StudentProfileAppliedList;
