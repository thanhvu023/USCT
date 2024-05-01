import {format} from 'date-fns';
import { ColumnFilter } from './column-filter';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStage } from '../../../redux/slice/applyStageSlice';
import { getProgramById,getAllProgram } from '../../../redux/slice/programSlice';
// student-profile-applied-columns.js
const getProgramName = (programId) => {
    const dispatch = useDispatch();
  
    // Dispatch an action to fetch all users
    useEffect(() => {
      dispatch(getAllProgram());
    }, [dispatch]);
  
    // Dispatch an action to fetch user data for the consultantId
    useEffect(() => {
      if (programId) {
        dispatch(getProgramById(programId));
      }
    }, [programId, dispatch]);
  
    const programs = useSelector((state) => state?.program?.programs);
  

  
    const programName = programs.find(
      (program) => program?.programId === programId
    );
    return programName ? programName.nameProgram : "Không biết";
  };
const getStageStatus = (programApplicationId) =>{
  const dispatch = useDispatch();


  const stages = useSelector(state=>state.applyStage.stages)
    // Dispatch an action to fetch all users
    useEffect(() => {
      dispatch(getAllStage());
    }, [dispatch]);
  
    const status = stages.find(
      (applyStage) => applyStage?.programApplicationId === programApplicationId
    );
    return status ? status.applyStage : "Không biết status";
}

export const COLUMNS = [
  
  {
    Header: ' Mã hồ sơ ',
    Footer: ' Mã hồ sơ ',
    accessor: 'programApplicationId',
    Filter: ColumnFilter,
  },
    {
      Header: ' Hồ sơ đã ứng tuyển ',
      Footer: 'Hồ sơ đã ứng tuyển ',
      accessor: 'studentProfile.fullName',
      Filter: ColumnFilter,
    },
    {
      Header: 'Tên chương trình',
      Footer: 'Tên chương trình',
      accessor: 'programId', // Dựa vào mẫu API
      Cell: ({ row }) => getProgramName(row.original.programId),

      Filter: ColumnFilter,
    },
    {
      Header: 'Ngày tạo',
      Footer: 'Ngày tạo',
      accessor: 'studentProfile.createDate', 
    //   Cell: ({ value }) => {
    //     return format(new Date(value), 'dd/MM/yyyy');
    //   },
      Filter: ColumnFilter,
    },
    {
      Header: 'Tiến trình hồ sơ',
      Footer: 'Tiến trình hồ sơ',
      accessor: 'applyStageId',
      Cell: ({ row }) => {
        const activeStage = row.original.applyStage.find(stage => stage.status === 1);
        return activeStage ? activeStage.programStage.stageName : 'Hồ sơ đã hoàn tất ';
      },
      Filter: ColumnFilter,
    },
    // {
    //   Header: 'Phí',
    //   Footer: 'Phí',
    //   accessor: 'applyStage.programStage.isPayment', 
    //   Cell: ({ value }) => (value ? " Cần đóng phí" : "Không cần đóng"),

    //   Filter: ColumnFilter,
    // },
  ];
  
  