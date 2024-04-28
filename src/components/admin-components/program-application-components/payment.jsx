import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PaymentContext from './context/payment-context';
import { getProgramFeesByProgramId, getAllProgramFees } from '../../../redux/slice/programFeeSlice';
import { getAllFeeTypes } from '../../../redux/slice/feeTypeSlice';
import { createPayment } from '../../../redux/slice/paymentSlice';

const Payment = () => {
    const responseBody = useSelector(state => state.payment.responseBody);

    const dispatch = useDispatch();

  const { selectedApp: selectedApplication } = useContext(PaymentContext);
// console.log("selectedApplication là ",selectedApplication)
const fees = useSelector(state => state.programFee.fees);
const feeTypes = useSelector(state => state.feeType.feeTypes); 

const [filteredFees, setFilteredFees] = useState([]);
const [selectedFeeId, setSelectedFeeId] = useState('');
const [selectedFee, setSelectedFee] = useState(null);
console.log("responseBody",responseBody)
const [note, setNote] = useState('');

console.log("feeTypes ",feeTypes)

  if (!selectedApplication) {
    return <div>Please select an application to make a payment.</div>;
  }
  useEffect(()=>{
    dispatch(getAllProgramFees());
    dispatch(getAllFeeTypes());
  },[dispatch]);

  useEffect(() => {
    if (selectedApplication) {

      dispatch(getProgramFeesByProgramId(selectedApplication.programId));
    }
  }, [dispatch, selectedApplication]);

  useEffect(() => {
    if (selectedApplication) {
      const filtered = fees.filter(fee => fee.programId === selectedApplication.programId);
      setFilteredFees(filtered);
    }
  }, [fees, selectedApplication]);

  const handleFeeSelection = (event) => {
    const feeId = event.target.value;
    const fee = filteredFees.find(f => f.programFeeId.toString() === feeId);
    setSelectedFee(fee);
    setSelectedFeeId(feeId);
  };
  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handlePaymentSubmit = () => {
    if (selectedFee) {
      const paymentData = {
        programApplicationId: selectedApplication.programApplicationId,
        method: "", 
        amount: selectedFee.amount,
        orderInfo: note,
        paymentDate: new Date().toISOString(),
        transactionNo: 0, 
      };
      dispatch(createPayment(paymentData));
      setSelectedFee(null);
      setSelectedFeeId('');
      setNote('');
    }
  };
  const getTypeNameById = (feeTypeId) => {
    const feeType = feeTypes.find(type => type.feeTypeId === feeTypeId);
    return feeType ? feeType.typeName : '';
  };
  return (
    <div>
    <h1>Payment Information</h1>
    <p>Application ID: {selectedApplication.programApplicationId}</p>
    <p>Program: {selectedApplication.applyStage.programStage.program.major.majorName}</p>
    <p>Program ID: {selectedApplication.applyStage.programStage.program.programId}</p>
    <p>Student Name: {selectedApplication.studentProfile.fullName}</p>
    <p>Trang thái hồ sơ : {selectedApplication.applyStage.programStage.stageName}</p>

    <form>
      <div>
        <label htmlFor="feeSelect">Chọn phí thủ tục:</label>
        <select id="feeSelect" value={selectedFee ? selectedFee.programFeeId : ''} onChange={handleFeeSelection}>
          <option value="">Lựa chọn phí theo trạng thái hồ sơ</option>
          {filteredFees.map(fee => (
            <option key={fee.programFeeId} value={fee.programFeeId}>
                {getTypeNameById(fee.feeTypeId)}
            </option>
          ))}
        </select>
        {selectedFee && <p>Selected Fee Amount: {selectedFee.amount}</p>}
      </div>
      <div>
          <label htmlFor="note">Thông tin thêm:</label>
          <input id="note" type="text" value={note} onChange={handleNoteChange} />
        </div>
        <button type="button" onClick={handlePaymentSubmit}>Gửi thanh toán</button>

    </form>
  </div>
  );
};

export default Payment;
