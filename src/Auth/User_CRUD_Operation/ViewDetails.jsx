import { Modal, Form, Input, Button, Flex, Drawer } from "antd";
import React, { useEffect } from "react";
import { getUserdataReq,  drawerOperatorOpen,
  drawerOperatorClose, } from "../../redux/utils";
import { useDispatch, useSelector } from "react-redux";
import './NewUser.css'
const ViewDetails = ({ handleClose }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const {
    modal,
    userLoading,
    formerror,
    modalValue,
    EditUserData,
    userUpdateId,
    viewUserData,
    drawerViewUSer,
    drawer,
  } = useSelector((state) => state.auth);
useEffect(()=>{
    form.setFieldsValue({
            firstName:viewUserData?.firstName,
            lastName:viewUserData?.lastName,
            username:viewUserData?.username,
            email:viewUserData?.email,
            phone:viewUserData?.phone,
            birthDate:viewUserData?.birthDate,
          });
},[viewUserData])
  return (
    <div>
      <Drawer
        title="New user"
        open={drawerViewUSer}
        onClose={() => {
          handleClose();
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="new_user_form"
          preserve={false}
          initialValues={{
            firstName:viewUserData?.firstName,
            lastName:viewUserData?.lastName,
            username:viewUserData?.username,
            email:viewUserData?.email,
            phone:viewUserData?.phone,
            birthDate:viewUserData?.birthDate,
          }}
        >
            <Flex gap={10}>
          <Form.Item
            label="First name"
            name="firstName"
          >
            <Input placeholder="First name"  readOnly/>
          </Form.Item>

          <Form.Item
            label="Last name"
            name="lastName"
          >
            <Input placeholder="Last name"  readOnly/>
          </Form.Item>
</Flex>
          <Form.Item
            label="Username"
            name="username"
          >
            <Input placeholder="Username" readOnly/>
          </Form.Item>

          <Form.Item
            label="email"
            name="email"
            
          >
            <Input placeholder="email" readOnly />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone"
            
          >
            <Input placeholder="phone number"  readOnly/>
          </Form.Item>
          <Form.Item
            label="Birth Date"
            name="birthDate"
            
          >
            <Input placeholder="birth data"  readOnly/>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default ViewDetails;
