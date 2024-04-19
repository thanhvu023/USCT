import {format} from 'date-fns';
import { ColumnFilter } from './column-filter';
export const COLUMNS = [
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
	},	{
		Header : 'Trường mong muốn',
		Footer : 'Trường mong muốn',
		accessor: 'programChoose',
		Filter: ColumnFilter,
	},
	{
		Header : 'Mã tư vấn viên',
		Footer : 'Mã tư vấn viên',
		accessor: 'consultantId',
		Filter: ColumnFilter,
	},
	{
		Header : 'Trạng thái',
		Footer : 'Trạng thái',
		accessor: 'status',
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
