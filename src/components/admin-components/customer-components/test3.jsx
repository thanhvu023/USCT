import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProgramStages } from "../../../redux/slice/programStageSlice";
import { getAllStage, selectApplyStageById, updateApplyStageById } from "../../../redux/slice/applyStageSlice";

const Test3 = () => {
  const dispatch = useDispatch();
  const programStages = useSelector((state) => state.programStages.stages);

  const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [selectedApplyStageId, setSelectedApplyStageId] = useState(null);
  const [selectedProgramStageId, setSelectedProgramStageId] = useState(null); 
  const applyStages = useSelector((state) => state.applyStage.stages);
  const selectedApplyStage = useSelector(selectApplyStageById(selectedApplyStageId));
  const uniqueProgramIds = [...new Set(programStages.map(stage => stage.programId))];

  const getProgramStageInfo = (programStageId) => {
    const stageInfo = programStages.find((stage) => stage.programStageId === programStageId);
    return stageInfo ? { programId: stageInfo.programId, stageName: stageInfo.stageName } : null;
  };

  const getProgramStagesByProgramId = (programId) => {
    const stages = programStages.filter((stage) => stage.programId === programId);
    return stages.map((stage) => ({ programStageId: stage.programStageId, programId: stage.programId, stageName: stage.stageName }));
  };

  useEffect(() => {
    dispatch(getAllProgramStages());
    dispatch(getAllStage());
  }, [dispatch]);

  const handleApplyStageChange = (e) => {
    setSelectedApplyStageId(parseInt(e.target.value));
  };

  const handleProgramStageChange = (e) => {
    setSelectedProgramStageId(parseInt(e.target.value));
  };

  const handleUpdateProgramStage = () => {
    if (selectedApplyStageId && selectedProgramStageId) {
      dispatch(updateApplyStageById({ applyStageId: selectedApplyStageId, programStageId: selectedProgramStageId }));
    } else {
      alert("Please select both ApplyStage and ProgramStage to update.");
    }
  };

  return (
    <div>
      <h2>All Program Stages</h2>
      {programStages.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <select value={selectedApplyStageId} onChange={handleApplyStageChange}>
            {applyStages.map((stage) => (
              <option key={stage.applyStageId} value={stage.applyStageId}>
                ApplyStage {stage.applyStageId}
              </option>
            ))}
          </select>
          <select value={selectedProgramStageId} onChange={handleProgramStageChange}>
            <option value="">Select ProgramStage</option>
            {getProgramStagesByProgramId(getProgramStageInfo(selectedApplyStage?.programStageId)?.programId).map((stage) => (
              <option key={stage.programStageId} value={stage.programStageId}>
                ProgramStage {stage.programStageId}
              </option>
            ))}
          </select>

          <button onClick={handleUpdateProgramStage}>Update Program Stage</button>
          {selectedApplyStage && (
            <div>
              ApplyStageId: {selectedApplyStage.applyStageId},
              ProgramStageId: {selectedApplyStage.programStageId},
              ProgramId: {selectedApplyStage.programStageId ? getProgramStageInfo(selectedApplyStage.programStageId)?.programId : null},
              StageName: {selectedApplyStage.programStageId ? getProgramStageInfo(selectedApplyStage.programStageId)?.stageName : null}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Test3;
