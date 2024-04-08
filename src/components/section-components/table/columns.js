import {format} from 'date-fns';
import { ColumnFilter } from './column-filter';
export const COLUMNS = [
	{
		Header : 'Mã hồ sơ',
		Footer : 'Mã hồ sơ',
		accessor: 'studentProfileId',
		Filter: ColumnFilter,
		//disableFilters: true,
	},
	{
		Header : 'Họ và tên',
		Footer : 'Họ và tên',
		accessor: 'fullName',
		Filter: ColumnFilter,
	},	{
		Header : 'Email',
		Footer : 'Email',
		accessor: 'email',
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
