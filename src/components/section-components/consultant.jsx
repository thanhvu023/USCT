import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConsultants } from "../../redux/slice/authSlice";

function ConsultantPage() {
  const dispatch = useDispatch();
  const consultants = useSelector((state) => state.auth.consultants);
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(getConsultants());
  }, [dispatch]);

  return (
    <div className="container">
      <h2 className="mt-4 mb-4">Danh Sách Consultants</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {consultants.map((consultant) => (
            <div key={consultant.consultantId} className="col-lg-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{consultant.email}</h5>
                  <p className="card-text">
                    <strong>Introduction:</strong> {consultant.introduction}
                  </p>
                  <p className="card-text">
                    <strong>Education:</strong> {consultant.education}
                  </p>
                  <p className="card-text">
                    <strong>Specialize:</strong> {consultant.specialize}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ConsultantPage;
