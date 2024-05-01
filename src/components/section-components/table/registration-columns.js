import {format} from 'date-fns';
import { ColumnFilter } from './column-filter';
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Badge } from "react-bootstrap";
import { getConsultantById, getAllConsultants } from '../../../redux/slice/consultantSlice';
const getConsultantByConsultantId = (consultantId) => {
	const dispatch = useDispatch();
    const consultants = useSelector((state) => state?.auth?.consultants);


  
	// Dispatch an action to fetch user data for the consultantId
	useEffect(() => {
	  if (consultantId) {
		dispatch(getConsultantById(consultantId));
	  }
	}, [consultantId, dispatch]);
  
  
	// Check if consultants is undefined or empty
	if (!consultants || consultants?.length === 0) {
	  return "Loading..."; // or any other appropriate message
	}
  
	const consultant = consultants.find(
	  (consultant) => consultant?.consultantId === consultantId
	);
	return consultant ? consultant.userName : "Không biết";
  };
  
  const status = {
	0: "Chưa được tư vấn",
	1: "Tư vấn viên đã duyệt",
	2: "Đã được tư vấn",
  };
  
  const statusColor = {
	0: "badge-danger light ",
	1: "badge-warning light",
	2: "badge-success light",
  };

  const getStatusLabel = (statusNumber) => {
	return <Badge bg=" " className={statusColor[statusNumber]}>{status[statusNumber]}</Badge>;
  };
export const COLUMNS = [
	{
		Header : 'Mã đơn',
		Footer : 'Mã đơn',
		accessor: 'registrationFormId',
		Filter: ColumnFilter,
		//disableFilters: true,
	},
	{
		Header : 'Chuyên ngành tư vấn',
		Footer : 'Chuyên ngành tư vấn',
		accessor: 'majorChoose',
		Filter: ColumnFilter,
		//disableFilters: true,
	},
	{
		Header : 'Lý do gửi đơn',
		Footer : 'Lý do gửi đơn',
		accessor: 'destinationReason',
		Filter: ColumnFilter,
	},	
	// {
	// 	Header : 'Trường mong muốn',
	// 	Footer : 'Trường mong muốn',
	// 	accessor: 'programChoose',
	// 	Filter: ColumnFilter,
	// },
	{
		Header : ' Tư vấn viên phụ trách',
		Footer : ' Tư vấn viên phụ trách',
		accessor: 'consultantId',
		Cell: ({row}) => getConsultantByConsultantId(row.original.consultantId),
		Filter: ColumnFilter,
	},
	{
		Header : 'Trạng thái',
		Footer : 'Trạng thái',
		accessor: 'status',
		Cell: ({ value }) => {
			return getStatusLabel(value);
		  },
		Filter: ColumnFilter,
	},
	

];

// export const GROUPED_COLUMNS = [
// 	{
// 		Header : 'ID',
// 		Footer : 'ID',
// 		accessor: 'id'
// 	},
// 	{
// 		Header : 'Tên',
// 		Footer : 'Tên',
// 		columns: [
// 			{
// 				Header : 'Họ',
// 				Footer : 'Họ',
// 				accessor: 'program_name'
// 			},
// 			{
// 				Header : 'Tên',
// 				Footer : 'Tên',
// 				accessor: 'university_name'
// 			},
// 		]
// 	},
// 	{
// 		Header: 'Thông tin',
// 		Footer: 'Thông tin',
// 		columns: [
// 			{
// 				Header : 'Ngày tạo',
// 				Footer : 'Ngày tạo',
// 				accessor: 'date_of_application'
// 			},
// 			{
// 				Header : 'Quốc gia',
// 				Footer : 'Quốc gia',
// 				accessor: 'country',
// 			},
			
// 		]
// 	},
// ]
