import { Modal, Form, Input, Button, Flex, Drawer } from "antd";
import React, { useEffect } from "react";
import { AddUserRequest } from "../../redux/utils";
import { useDispatch, useSelector } from "react-redux";
import './NewUser.css'
const NewUser = ({ handleClose }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const {
    modal,
    userLoading,
    formerror,
    modalValue,
    EditUserData,
    userUpdateId,
    drawer,
  } = useSelector((state) => state.auth);


  const onFinish = (values) => {
    dispatch(AddUserRequest(values));
  };
  useEffect(()=>{

    if(!formerror){
      form.resetFields();
    }
  },[formerror])
  return (
    <div>
      <Drawer
        title="Add user"
        open={drawer}
        onClose={() => {
          handleClose();
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="new_user_form"
          onFinish={onFinish}
          preserve={false}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "Please enter first name" }]}
          >
            <Input placeholder="First name" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please enter last name" }]}
          >
            <Input placeholder="Last name" />
          </Form.Item>

          <Form.Item
            label="User Name"
            name="username"
            rules={[{ required: true, message: "Please enter username" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input placeholder="email" className="email-input-field"/>
          </Form.Item>
          <Flex justify="end" gap={10} className="form-buttons">
            <Button
              type="default"
              className="cancel-button"
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={userLoading}>
              Add
            </Button>
          </Flex>
        </Form>
      </Drawer>
    </div>
  );
};

export default NewUser;
