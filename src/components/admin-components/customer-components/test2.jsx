import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProgramStages, getProgramStageById } from '../../../redux/slice/programStageSlice';

const Test2 = () => {
  const dispatch = useDispatch();
  const programStages = useSelector((state) => state.programStages.stages);
  const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [selectedProgramStage, setSelectedProgramStage] = useState(null);
  const [uniqueProgramIds, setUniqueProgramIds] = useState([]);
 console.log("selectedProgramStage",selectedProgramStage)
  useEffect(() => {
    dispatch(getAllProgramStages());
  }, [dispatch]);

  useEffect(() => {
    // Lọc các programId duy nhất từ danh sách programStages
    if (programStages.length > 0) {
      const uniqueIds = Array.from(new Set(programStages.map(stage => stage.programId)));
      setUniqueProgramIds(uniqueIds);
      if (uniqueIds.length === 1) {
        setSelectedProgramId(uniqueIds[0]);
      }
    }
  }, [programStages]);

  const handleProgramChange = (e) => {
    setSelectedProgramId(parseInt(e.target.value));
    setSelectedProgramStage(null); // Reset selectedProgramStage when changing program
  };

  const handleProgramStageChange = async (e) => {
    const programStageId = parseInt(e.target.value);
    setSelectedProgramStage(await dispatch(getProgramStageById(programStageId)));
  };

  return (
    <div>
      <div>
        <h2>Select ProgramStage</h2>
        <select value={selectedProgramId} onChange={handleProgramChange}>
          {uniqueProgramIds.map(programId => (
            <option key={programId} value={programId}>
              Program {programId}
            </option>
          ))}
        </select>
        <select value={selectedProgramStage?.programStageId} onChange={handleProgramStageChange}>
  <option value="">Select ProgramStage</option>
  {programStages
    .filter(stage => stage.programId === selectedProgramId)
    .map(stage => (
      <option key={`programStage_${stage.programStageId}`} value={stage.programStageId} disabled={stage.programStageId === selectedProgramStage?.programStageId}>
        ProgramStage {stage.programStageId}
      </option>
    ))}
</select>

{selectedProgramStage && (
  <ul>
    <li>
      ProgramStageId: {selectedProgramStage.payload.programStageId}
    </li>
    <li>
      ProgramId: {selectedProgramStage.payload.programId}
    </li>
    <li>
      StageName: {selectedProgramStage.payload.stageName}
    </li>
    {/* Add other fields you want to display */}
  </ul>
)}


      </div>
    </div>
  );
};

export default Test2;
