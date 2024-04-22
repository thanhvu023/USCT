import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStage } from "../../../redux/slice/applyStageSlice";

const Test2 = () => {
  const dispatch = useDispatch();
  const stages = useSelector((state) => state.applyStage.stages);
  console.log("stages là",stages)
  const loading = useSelector((state) => state.applyStage.loading);

  useEffect(() => {
    dispatch(getAllStage());
  }, [dispatch]);


  return (
    <div>
      <h2>All Apply Stages</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {stages.map((stage) => (
            <li key={stage.id}>
              ApplyStageId: {stage.applyStageId}, 
              programStageId: {stage.programStageId},
              updatedate: {stage.updateDate},
              programId:
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Test2;
