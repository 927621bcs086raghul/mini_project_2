import { Modal, Form, Input, Button, Flex } from "antd";
import React, { useEffect } from "react";
import { AddUserRequest,updateUserRequest } from "../../redux/utils";
import { useDispatch, useSelector } from "react-redux";
const EditUser = ({ handleClose, isModalOpen }) => {
  const dispatch=useDispatch();
  const [form] = Form.useForm();
  const {modal,userLoading,formerror,modalValue,EditUserData,userUpdateId} = useSelector(
    (state) => state.auth
  );
      if(!formerror){
      console.log("")
      form.resetFields();}

  const onFinish = (values) => {
    if(modalValue=='edit'){
      dispatch(updateUserRequest({values:values,id:userUpdateId}))
    }
    else{
dispatch(AddUserRequest(values));
        console.log(formerror)

    }
        console.log(formerror)

    
  };
  
useEffect(() => {
  console.log("22",EditUserData,modalValue)
  if (modalValue === "edit" && EditUserData && modal) {
    form.setFieldsValue({
      firstName: EditUserData.firstName || "",
      lastName: EditUserData.lastName || "",
      username: EditUserData.username || "",
      email: EditUserData.email || "",
    });
  } else {
    form.resetFields();
  }
  
}, [modalValue,EditUserData, form, modal]);
  const formButtonValue=(modalValue=='edit')?"Update":"Add user";

  return (
    <div>
      <Modal
        title="Edit User"
        open={modal}
        footer={false}
        onCancel={() => {
          handleClose();
        }}
        
      >
        <Form
          form={form}
          layout="vertical"
          name="new_user_form"
          onFinish={onFinish}
          preserve={false}
          initialValues={{
      firstName: EditUserData.firstName || "",
      lastName: EditUserData.lastName || "",
      username: EditUserData.username || "",
      email: EditUserData.email || "",
    }}
          
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
            rules={[{ required: true, message: "Please enter email" },
    { type: "email", message: "Please enter a valid email address" },]}
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
              {formButtonValue}
            </Button>
          </Flex>
        </Form>
      </Modal>
    </div>
  );
};

export default EditUser;
