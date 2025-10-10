import { Modal, Form, Input, Button, Flex, Drawer } from "antd";
import React, { useEffect } from "react";
import { AddUserRequest } from "../../redux/utils";
import { useDispatch, useSelector } from "react-redux";
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

  return (
    <div>
      <Drawer
        title="New user"
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
            label="First name"
            name="firstName"
            rules={[{ required: true, message: "Please enter first name" }]}
          >
            <Input placeholder="First name" />
          </Form.Item>

          <Form.Item
            label="Last name"
            name="lastName"
            rules={[{ required: true, message: "Please enter last name" }]}
          >
            <Input placeholder="Last name" />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter username" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            label="email"
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input placeholder="email" />
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
              AddUser
            </Button>
          </Flex>
        </Form>
      </Drawer>
    </div>
  );
};

export default NewUser;
