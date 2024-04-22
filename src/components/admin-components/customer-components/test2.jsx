import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Button } from 'react-bootstrap';
import { getStudentProfileByCustomerId } from '../../../redux/slice/studentSice';

const Test2 = () => {
  const dispatch = useDispatch();
  const studentProfiles = useSelector(state => state.student.studentProfileByCustomerId);

  useEffect(() => {
    // Gọi API để lấy thông tin student profiles khi component được mount
    dispatch(getStudentProfileByCustomerId(1)); // Thay 34 bằng customerId của bạn
  }, [dispatch]);

  const handleDownloadFile = (fileAttach) => {
    if (fileAttach) {
      // Tạo một link tải file từ URL
      const link = document.createElement('a');
      link.href = fileAttach;
      link.download = 'fileAttach'; // Tên mặc định của file khi tải xuống
      link.click();
    } else {
      alert('File không tồn tại');
    }
  };

  return (
    <div>
      <h1>Danh sách Student Profiles</h1>
      {studentProfiles.map(profile => (
        <div key={profile.studentProfileId}>
          <p>Họ và tên: {profile.fullName}</p>
          <p>Email: {profile.email}</p>
          <p>Ngày sinh: {profile.dateOfBirth}</p>
          {/* Hiển thị badge trạng thái */}
          <Badge variant="primary">{profile.gender}</Badge>
          <Button onClick={() => handleDownloadFile(profile.fileUploads[0].fileAttach)}>
            Tải file
          </Button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Test2;
