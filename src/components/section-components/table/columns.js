import {format} from 'date-fns';
import { ColumnFilter } from './column-filter';
export const COLUMNS = [
	{
		Header : 'ID',
		Footer : 'ID',
		accessor: 'id',
		Filter: ColumnFilter,
		//disableFilters: true,
	},
	{
		Header : 'Chương trình',
		Footer : 'Chương trình',
		accessor: 'program_name',
		Filter: ColumnFilter,
	},
	{
		Header : 'Trường đại học',
		Footer : 'Trường đại học',
		accessor: 'university_name',
		Filter: ColumnFilter,
	},
	{
		Header : 'Ngày tạo',
		Footer : 'Ngày tạo',
		accessor: 'date_of_application',
		Cell: ({ value }) => {return format(new Date(value), 'dd/mm/yyyy')},
		Filter: ColumnFilter,
	},
	{
		Header : 'Bang',
		Footer : 'Bang',
		accessor: 'state',
		Filter: ColumnFilter,
	},

]

export const GROUPED_COLUMNS = [
	{
		Header : 'ID',
		Footer : 'ID',
		accessor: 'id'
	},
	{
		Header : 'Tên',
		Footer : 'Tên',
		columns: [
			{
				Header : 'Họ',
				Footer : 'Họ',
				accessor: 'program_name'
			},
			{
				Header : 'Tên',
				Footer : 'Tên',
				accessor: 'university_name'
			},
		]
	},
	{
		Header: 'Thông tin',
		Footer: 'Thông tin',
		columns: [
			{
				Header : 'Ngày tạo',
				Footer : 'Ngày tạo',
				accessor: 'date_of_application'
			},
			{
				Header : 'Quốc gia',
				Footer : 'Quốc gia',
				accessor: 'country',
			},
			
		]
	},
]
