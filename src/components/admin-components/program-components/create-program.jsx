import React, { useState } from 'react';
import { Modal, Button, Form, Select } from 'antd';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { getAllProgram } from "../../../redux/slice/programSlice";

import Swal from "sweetalert2";
const CreateProgramModal = ({
  visible,
  onCreate,
  onCancel,
  universities,
  majors,
  semesters,
  programTypes,
}) => {
  const [form] = Form.useForm();
  const [responsibilities, setResponsibilities] = useState('');

  const handleChangeResponsibilities = (event, editor) => {
    const data = editor.getData();
    setResponsibilities(data);
  };

  return (
    <Modal
      visible={visible}
      title="Create New Program"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="nameProgram" label="Name">
          <Input />
        </Form.Item>
        <Form.Item name="duration" label="Duration">
          <Input />
        </Form.Item>
        <Form.Item name="tuition" label="Tuition">
          <InputNumber />
        </Form.Item>
        <Form.Item name="level" label="Level">
          <Select>
            <Select.Option value="beginner">Beginner</Select.Option>
            <Select.Option value="intermediate">Intermediate</Select.Option>
            <Select.Option value="advanced">Advanced</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="img" label="Image">
          <Input />
        </Form.Item>
        <Form.Item name="responsibilities" label="Responsibilities">
          <CKEditor data={responsibilities} onChange={handleChangeResponsibilities} />
        </Form.Item>
        <Form.Item name="requirement" label="Requirement">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="universityId" label="University">
          <Select>
            {universities.map(university => (
              <Select.Option key={university.id} value={university.id}>
                {university.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="majorId" label="Major">
          <Select>
            {majors.map(major => (
              <Select.Option key={major.id} value={major.id}>
                {major.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="semesterId" label="Semester">
          <Select>
            {semesters.map(semester => (
              <Select.Option key={semester.id} value={semester.id}>
                {semester.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="programTypeId" label="Program Type">
          <Select>
            {programTypes.map(programType => (
              <Select.Option key={programType.id} value={programType.id}>
                {programType.typeName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProgramModal;
