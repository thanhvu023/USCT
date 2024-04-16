import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProgramApplication } from '../../../redux/slice/programApplicationSlice'

const ProgramApplicationPage = () => {
  const dispatch = useDispatch();
  const { programApplications, loading, error } = useSelector((state) => state.programApplication);

  useEffect(() => {
    dispatch(getAllProgramApplication());
  }, [dispatch]);
console.log("programApplications:",programApplications)
  return (
    <div>
      <h1>All Program Applications</h1>
      {loading || !programApplications ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        programApplications.map((application) => (
          <div key={application.programApplicationId}>
            <h2>{application.programId.nameProgram}</h2>
            <p>Apply Stage: {application.applyStage.stageName}</p>
            <p>Update Date: {application.updateDate}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ProgramApplicationPage;
