import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import { getAllState } from '../../../redux/slice/stateSlice';
import { getAllStaff } from '../../../redux/slice/staffSlice';
const AutoCompleteInput = ({ value, onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const states = useSelector((state) => state.state.states); 


  useEffect(() => {
    dispatch(getAllState()); 
 
  }, [dispatch]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value); 
  };



  const filteredStates = states && states.length > 0 ? 
  states.filter((state) =>
    state.stateName && state.stateName.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];
  const handleSelectState = (selectedState) => {
    onChange(selectedState); 
    setSearchTerm(selectedState.stateName); 
  };
  return (
    <div>
      <Form.Control
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Tìm kiếm bang"
      />
    <ul className="row">
  {searchTerm !== '' && filteredStates.map((state) => (
    <li key={state.stateId} className="col-4 ml-4" onClick={() => handleSelectState(state)}>
      {state.stateName}
    </li>
  ))}
</ul>


    </div>
  );
};

export default AutoCompleteInput;
