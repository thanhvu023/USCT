import { format } from 'date-fns';
import { ColumnFilter } from './column-filter';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { Chip } from '@mui/material';
import { getConsultantById, getAllConsultants } from '../../../redux/slice/consultantSlice';

const getConsultantByConsultantId = (consultantId) => {
  const dispatch = useDispatch();
  const consultants = useSelector((state) => state?.auth?.consultants);

  useEffect(() => {
    if (consultantId) {
      dispatch(getConsultantById(consultantId));
    }
  }, [consultantId, dispatch]);

  if (!consultants || consultants?.length === 0) {
    return 'Loading...';
  }

  const consultant = consultants.find(
    (consultant) => consultant?.consultantId === consultantId
  );
  return consultant ? consultant.userName : 'Không biết';
};

const status = {
  0: 'Chưa được tư vấn',
  1: 'Tư vấn viên đã duyệt',
  2: 'Đã được tư vấn',
};

const statusColor = {
  0: 'error', // Red
  1: 'warning', // Yellow
  2: 'success', // Green
};

const getStatusLabel = (statusNumber) => {
  return (
    <Chip
      label={status[statusNumber]}
      color={statusColor[statusNumber]}
      variant="container"
    />
  );
};

export const COLUMNS = [
  {
    Header: 'Mã đơn',
    Footer: 'Mã đơn',
    accessor: 'registrationFormId',
    Filter: ColumnFilter,
  },
  {
    Header: 'Chuyên ngành tư vấn',
    Footer: 'Chuyên ngành tư vấn',
    accessor: 'majorChoose',
    Filter: ColumnFilter,
  },
  {
    Header: 'Lý do gửi đơn',
    Footer: 'Lý do gửi đơn',
    accessor: 'destinationReason',
    Filter: ColumnFilter,
  },
  {
    Header: 'Tư vấn viên phụ trách',
    Footer: 'Tư vấn viên phụ trách',
    accessor: 'consultantId',
    Cell: ({ row }) => getConsultantByConsultantId(row.original.consultantId),
    Filter: ColumnFilter,
  },
  {
    Header: 'Trạng thái',
    Footer: 'Trạng thái',
    accessor: 'status',
    Cell: ({ value }) => {
      return getStatusLabel(value);
    },
    Filter: ColumnFilter,
  },
];
