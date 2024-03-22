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
		Header : 'Họ',
		Footer : 'Họ',
		accessor: 'first_name',
		Filter: ColumnFilter,
	},
	{
		Header : 'Tên',
		Footer : 'Tên',
		accessor: 'last_name',
		Filter: ColumnFilter,
	},
	{
		Header : 'Email',
		Footer : 'Email',
		accessor: 'email',
		Filter: ColumnFilter,
	},
	{
		Header : 'Ngày sinh',
		Footer : 'Ngày sinh',
		accessor: 'date_of_birth',
		Cell: ({ value }) => {return format(new Date(value), 'dd/mm/yyyy')},
		Filter: ColumnFilter,
	},
	{
		Header : 'Quốc gia',
		Footer : 'Quốc gia',
		accessor: 'country',
		Filter: ColumnFilter,
	},
	{
		Header : 'Số điện thoại',
		Footer : 'Số điện thoại',
		accessor: 'phone',
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
				accessor: 'first_name'
			},
			{
				Header : 'Tên',
				Footer : 'Tên',
				accessor: 'last_name'
			},
		]
	},
	{
		Header: 'Thông tin',
		Footer: 'Thông tin',
		columns: [
			{
				Header : 'Ngày sinh',
				Footer : 'Ngày sinh',
				accessor: 'date_of_birth'
			},
			{
				Header : 'Quốc gia',
				Footer : 'Quốc gia',
				accessor: 'country',
			},
			{
				Header : 'Số điện thoại',
				Footer : 'Số điện thoại',
				accessor: 'phone'
			},
		]
	},
]
