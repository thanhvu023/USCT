import React from "react";
import { Grid, Button } from "@mui/material";
import Select from "react-select";

const PdfProfileContent = ({ programDetail, universityIdDetail, studentProfileDetail, profileStudent, handleSelectChange, handleCreateProfile }) => {
  return (
    <div>
     
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <div className="form-group">
            <label htmlFor="fullName" style={{ fontWeight: "bold", fontSize: "16px" }}>
              Họ và tên
            </label>
            <input type="text" id="fullName" className="form-control" defaultValue={studentProfileDetail.fullName} disabled />
          </div>
        </Grid>
        <Grid item xs={12} sm={3}>
          <div className="form-group">
            <label htmlFor="phone" style={{ fontWeight: "bold", fontSize: "16px" }}>
              Số điện thoại
            </label>
            <input type="text" id="phone" className="form-control" defaultValue={studentProfileDetail.phone} disabled />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="form-group">
            <label htmlFor="address" style={{ fontWeight: "bold", fontSize: "16px" }}>
              Địa chỉ
            </label>
            <input type="text" id="address" className="form-control" defaultValue={studentProfileDetail.address} disabled />
          </div>
        </Grid>
        <Grid item xs={12} sm={3}>
          <div className="form-group">
            <label htmlFor="createDate" style={{ fontWeight: "bold", fontSize: "16px" }}>
              Ngày tạo hồ sơ
            </label>
            <input type="text" id="createDate" className="form-control" defaultValue={studentProfileDetail.createDate} disabled />
          </div>
        </Grid>
        <Grid item xs={12} sm={3}>
          <div className="form-group">
            <label htmlFor="placeOfBirth" style={{ fontWeight: "bold", fontSize: "16px" }}>
              Nơi sinh
            </label>
            <input type="text" id="placeOfBirth" className="form-control" defaultValue={studentProfileDetail.placeOfBirth} disabled />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="form-group">
            <label htmlFor="studyProcess" style={{ fontWeight: "bold", fontSize: "16px" }}>
              Quá trình học tập
            </label>
            <textarea id="studyProcess" className="form-control" defaultValue={studentProfileDetail.studyProcess} disabled />
          </div>
        </Grid>
        <Grid item xs={12} sm={3}>
          <div className="form-group">
            <label htmlFor="englishLevel" style={{ fontWeight: "bold", fontSize: "16px" }}>
              Trình độ tiếng Anh
            </label>
            <input type="text" id="englishLevel" className="form-control" defaultValue={studentProfileDetail.englishLevel} disabled />
          </div>
        </Grid>
        <Grid item xs={12} sm={3}>
          <div className="form-group">
            <label htmlFor="grade" style={{ fontWeight: "bold", fontSize: "16px" }}>
              Học lực
            </label>
            <input type="text" id="grade" className="form-control" defaultValue={studentProfileDetail.grade} disabled />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="form-group">
            <label htmlFor="cvFile" style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "5px" }}>
              Hồ sơ học sinh:
            </label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: "1" }}>
                {profileStudent?.length > 0 ? (
                  <Select
                    options={profileStudent.map((profile) => ({
                      value: profile.studentProfileId,
                      label: profile.fullName,
                    }))}
                    placeholder="Chọn hồ sơ học sinh"
                    onChange={handleSelectChange}
                  />
                ) : (
                  <p style={{ fontStyle: "italic" }}>Không có hồ sơ học sinh.</p>
                )}
              </div>
              <div style={{ marginLeft: "10px", height: "50px" }}>
                <Button variant="primary" onClick={handleCreateProfile} style={{ height: "100%", fontSize: "14px" }}>
                  Tạo hồ sơ
                </Button>
              </div>
            </div>
          </div>
        </Grid>
        
      </Grid>
    </div>
  );
};

export default PdfProfileContent;
