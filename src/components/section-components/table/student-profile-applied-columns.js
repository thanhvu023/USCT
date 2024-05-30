import React, { useEffect } from 'react';
import { Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ColumnFilter } from './column-filter';
import { getAllStage } from '../../../redux/slice/applyStageSlice';
import { getProgramById, getAllProgram } from '../../../redux/slice/programSlice';

const getProgramName = (programId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProgram());
  }, [dispatch]);

  useEffect(() => {
    if (programId) {
      dispatch(getProgramById(programId));
    }
  }, [programId, dispatch]);

  const programs = useSelector((state) => state?.program?.programs);

  const programName = programs.find((program) => program?.programId === programId);
  return programName ? programName.nameProgram : 'Không biết';
};

const getChipColor = (status) => {
  switch (status) {
    case 0:
      return 'primary'; // Đang xử lí
    case 1:
      return 'info'; // Đã xét duyệt hồ sơ
    case 2:
      return 'success'; // Xét duyệt thành công
    case 3:
      return 'error'; // Xét duyệt thất bại
    case 4:
      return 'warning'; // Đóng hồ sơ
    case 5:
      return 'success'; // Hồ sơ đã hoàn tất
    case 6:
      return 'default'; // Hồ sơ đã hủy
    default:
      return 'default'; // Không xác định
  }
};

const statusMap = {
  0: 'Đang xử lí',
  1: 'Đã xét duyệt hồ sơ',
  2: 'Xét duyệt thành công',
  3: 'Xét duyệt thất bại',
  4: 'Đóng hồ sơ',
  5: 'Hồ sơ đã hoàn tất',
  6: 'Hồ sơ đã hủy',
};

export const COLUMNS = [
  {
    Header: 'Mã hồ sơ',
    Footer: 'Mã hồ sơ',
    accessor: 'programApplicationId',
    Filter: ColumnFilter,
  },
  {
    Header: 'Hồ sơ đã ứng tuyển',
    Footer: 'Hồ sơ đã ứng tuyển',
    accessor: 'studentProfile.fullName',
    Filter: ColumnFilter,
  },
  {
    Header: 'Tên chương trình',
    Footer: 'Tên chương trình',
    accessor: 'programId',
    Cell: ({ row }) => getProgramName(row.original.programId),
    Filter: ColumnFilter,
  },
  {
    Header: 'Ngày tạo',
    Footer: 'Ngày tạo',
    accessor: 'studentProfile.createDate',
    Filter: ColumnFilter,
  },
  {
    Header: 'Tiến trình hồ sơ',
    Footer: 'Tiến trình hồ sơ',
    accessor: 'applyStageId',
    Cell: ({ row }) => {
      const activeStage = row.original.applyStage.find(stage => stage.status === 1);
      return activeStage ? activeStage.programStage.stageName : 'Hồ sơ đã hoàn tất';
    },
    Filter: ColumnFilter,
  },
  {
    Header: 'Trạng thái',
    Footer: 'Trạng thái',
    accessor: 'status',
    Cell: ({ value }) => {
      return <Chip label={statusMap[value] || 'Không xác định'} color={getChipColor(value)} />;
    },
    Filter: ColumnFilter,
  },
];
