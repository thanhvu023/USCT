// import React, { useState } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';

// const EditProgramModal = ({ show, handleClose, program }) => {
//   const [formData, setFormData] = useState({
//     name: program.name,
//     type: program.type,
//     field: program.field,
//     createdDate: program.createdDate,
//     modifiedDate: program.modifiedDate,
//     university: '',
//     semester: '',
//     tuitionFee: '',
//     englishLevel: '',
//     description: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission here
//     // You can use formData to send data to backend or update state
//     console.log(formData);
//     // Close the modal after handling submission
//     handleClose();
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Chỉnh sửa chương trình</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="formName">
//             <Form.Label>Tên chương trình</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Nhập tên chương trình"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="formType">
//             <Form.Label>Loại chương trình</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Nhập loại chương trình"
//               name="type"
//               value={formData.type}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="formField">
//             <Form.Label>Chuyên ngành</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Nhập chuyên ngành"
//               name="field"
//               value={formData.field}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="formCreatedDate">
//             <Form.Label>Ngày tạo</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Nhập ngày tạo"
//               name="createdDate"
//               value={formData.createdDate}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="formModifiedDate">
//             <Form.Label>Ngày sửa đổi</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Nhập ngày sửa đổi"
//               name="modifiedDate"
//               value={formData.modifiedDate}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <hr />
//           <h5>Thông tin thêm</h5>
//           <Form.Group controlId="formUniversity">
//             <Form.Label>Tên trường đại học</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Nhập tên trường đại học"
//               name="university"
//               value={formData.university}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="formSemester">
//             <Form.Label>Học kỳ</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Nhập học kỳ"
//               name="semester"
//               value={formData.semester}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="formTuitionFee">
//             <Form.Label>Học phí</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Nhập học phí"
//               name="tuitionFee"
//               value={formData.tuitionFee}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="formEnglishLevel">
//             <Form.Label>Trình độ tiếng Anh</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Nhập trình độ tiếng Anh"
//               name="englishLevel"
//               value={formData.englishLevel}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="formDescription">
//             <Form.Label>Mô tả</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               placeholder="Nhập mô tả"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Button variant="primary" type="submit">
//             Lưu thay đổi
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default EditProgramModal;
