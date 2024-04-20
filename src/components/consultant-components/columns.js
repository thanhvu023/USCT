import {format} from 'date-fns';
import { ColumnFilter } from './column-filter';
import { useDispatch, useSelector } from "react-redux";

const getConsultantEmail = (consultantId) => {

	const consultants = useSelector((state) => state.auth.consultants);

	const consultant = consultants.find((consultant) => consultant.consultantId === consultantId);
	return consultant ? consultant.email : 'Không biết';
  };
  const getFullName = (customerId) => {
    const userData = useSelector((state) => state.auth.userById);

    if (!Array.isArray(userData)) {
        return "Không biết"; 
    }

    const user = userData.find((user) => user.customerId === customerId);
    return user ? user.fullName : "Không biết";
};

export const COLUMNS = [
	
	{
		Header : 'Mã đơn tư vấn',
		Footer : 'Mã đơn tư vấn',
		accessor: 'registrationFormId',
		Filter: ColumnFilter,
		//disableFilters: true,
	},
	{
		Header : 'Họ và tên',
		Footer : 'Họ và tên',
		accessor: 'customerId',
			Cell: ({ row }) => getFullName(row.original.customerId),

		Filter: ColumnFilter,
	},	{
		Header : 'Email',
		Footer : 'Email',
		accessor: 'consultantId',
		Cell: ({ row }) => getConsultantEmail(row.original.consultantId),

		Filter: ColumnFilter,
	},

	{
		Header : 'Ngày tạo',
		Footer : 'Ngày tạo',
		accessor: 'createDate',
		// Cell: ({ value }) => {return format(new Date(value), 'mm/dd/yyyy')},
		Filter: ColumnFilter,
	},
	

]

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
