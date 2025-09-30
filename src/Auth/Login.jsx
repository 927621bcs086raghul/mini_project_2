import React, { useState,useEffect } from "react";
import { Button, Form, Input, Flex, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest,registerRequest } from "../redux/utils";
import { LoginOutlined, PauseCircleOutlined } from "@ant-design/icons";
import SignUp from "./SignUp";
import { icons } from "antd/es/image/PreviewGroup";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading,registrationError } = useSelector((state) => state.auth);
  const [form] = Form.useForm();
    const [activeKey, setActiveKey] = useState("login");

const items = [
  { key: 'login', label: 'Login',icon:<LoginOutlined/>, children: <LoginForm/> },
  { key: 'signup', label: 'Signup',icon:<PauseCircleOutlined/>, children: <SignUp/> },
];
  const handleSubmit = (values) => {

    const { userId, password } = values;
    dispatch(loginRequest({ UserId: userId, Password: password }));
          

  };
  useEffect(() => {
  if (!registrationError) {
    form.resetFields();
  }
}, [registrationError]);
  const onchange=(key)=>{
    setActiveKey(key)
  }
  function LoginForm(){
    return(
      <>
      <Form
          name="basic"
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{}}
        >
      <Form.Item
            label="UserId"
            name="userId"
            className="login-label"
            rules={[
              { required: true, message: "Please input your username!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Please enter your UserId" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            className="login-label"
            rules={[
              { required: true, message: "Please input your password!" },
              {
                min: 8,
                pattern: new RegExp(
                  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])"
                ),
                message:
                  "Minimum eight characters, at least one letter, one number and one special character:",
              },
            ]}
          >
            <Input.Password placeholder="please enter your password" />
          </Form.Item>
          <p
            className="forgot-password"
            onClick={() => {
              navigate("/resetPassword");
            }}
          >
            Forgot Password
          </p>   
          <Form.Item label={null}>
            {
              <Button
                type="primary"
                htmlType="submit"
                className="signin-botton"
                loading={loading}
              >
                Submit
              </Button>
            }
          </Form.Item>  
          </Form>    
      </>
    )
  }
 
  return (
    <Flex justify="center" align="center" className="flex" vertical>
      <div className="modal-signin-signup login-box">
        <Tabs
          onChange={onchange}
          activeKey={activeKey}
          items={items}
          >
          </Tabs>
        <p></p>
      </div>
    </Flex>
  );
};

export default Login;
