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
      return 'warning'; // Bổ sung tài liệu
    case 2:
      return 'success'; // Đăng ký thành công
    case 3:
      return 'error'; // Hủy bỏ đăng ký
    default:
      return 'default'; // Không xác định
  }
};

const statusMap = {
  0: 'Đang xử lí',
  1: 'Bổ sung tài liệu',
  2: 'Đăng ký thành công',
  3: 'Hủy bỏ đăng ký',
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
