import { format } from "date-fns";
import { ColumnFilter } from "./column-filter";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getUserById } from "../../redux/slice/authSlice";
import React, { useEffect } from "react";
import { Badge } from "react-bootstrap";

const getConsultantEmail = (consultantId) => {
  const dispatch = useDispatch();

  // Dispatch an action to fetch all users
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Dispatch an action to fetch user data for the consultantId
  useEffect(() => {
    if (consultantId) {
      dispatch(getUserById(consultantId));
    }
  }, [consultantId, dispatch]);

  const consultants = useSelector((state) => state?.auth?.consultants);

  // Check if consultants is undefined or empty
  if (!consultants || consultants.length === 0) {
    return "Loading..."; // or any other appropriate message
  }

  const consultant = consultants.find(
    (consultant) => consultant?.consultantId === consultantId
  );
  return consultant ? consultant.email : "Không biết";
};
const status = {
  0: "Chưa tư vấn",
  1: "Đang tư vấn",
  2: "Đã tư vấn",
};

const statusColor = {
  0: "badge-danger light ",
  1: "badge-warning light",
  2: "badge-success light",
};

const getStatusLabel = (statusNumber) => {
  return <Badge bg=" " className={statusColor[statusNumber]}>{status[statusNumber]}</Badge>;
};
const getFullName = (customerId) => {
  const dispatch = useDispatch();

  // Dispatch an action to fetch user data for the customerId
  useEffect(() => {
    if (customerId) {
      dispatch(getAllUsers());
      dispatch(getUserById(customerId));
    }
  }, [customerId, dispatch]);

  const userData = useSelector((state) => state.auth.user);

  if (!Array.isArray(userData)) {
    return "Không biết";
  }

  const user = userData.find((user) => user.customerId === customerId);
  return user ? user.fullName : "Không biết";
};

export const COLUMNS = [
  {
    Header: "Mã đơn tư vấn",
    Footer: "Mã đơn tư vấn",
    accessor: "registrationFormId",
    Filter: ColumnFilter,
    //disableFilters: true,
  },
  {
    Header: "Họ và tên",
    Footer: "Họ và tên",
    accessor: "customerId",
    Cell: ({ row }) => getFullName(row.original.customerId),
    Filter: ColumnFilter,
  },
  {
    Header: "Chuyên ngành",
    Footer: "Chuyên ngành",
    accessor: "majorChoose",
    // Cell: ({ value }) => {return format(new Date(value), 'mm/dd/yyyy')},
    Filter: ColumnFilter,
  },
  {
    Header: "Ngày tạo",
    Footer: "Ngày tạo",
    accessor: "createDate",
    // Cell: ({ value }) => {return format(new Date(value), 'mm/dd/yyyy')},
    Filter: ColumnFilter,
  },
  {
    Header: "Trạng thái",
    Footer: "Trạng thái",
    accessor: "status",
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
