import React, { useState, useEffect } from "react";
import { Button, Form, Input, Flex, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest, registerRequest } from "../redux/utils";
import { LoginOutlined, PauseCircleOutlined } from "@ant-design/icons";
import SignUp from "./SignUp";
import { icons } from "antd/es/image/PreviewGroup";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const { formerror } = useSelector((state) => state.auth);
  const [form] = Form.useForm();
  const [activeKey, setActiveKey] = useState("login");

  const items = [
    {
      key: "login",
      label: "Login",
      icon: <LoginOutlined />,
      children: <LoginForm />,
    },
    {
      key: "signup",
      label: "Signup",
      icon: <PauseCircleOutlined />,
      children: <SignUp />,
    },
  ];
  const handleSubmit = (values) => {
    const { username, password } = values;
    dispatch(loginRequest({ username: username, password: password }));
  };
  useEffect(()=>{
    if(localStorage.getItem("token")){
  navigate("/dashboard")
}
  },[localStorage.getItem("token")])
  if (!formerror) {
    form.resetFields();
  }
  const onchange = (key) => {
    setActiveKey(key);
  };
  function LoginForm() {
    return (
      <>
        <Form
          name="basic"
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{}}
        >
          <Form.Item
            label="User Name"
            name="username"
            className="login-label"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Please enter your Username" />
          </Form.Item>
          {/* <Form.Item
            label="email"
            name="email"
            className="login-label"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Please enter your UserId" />
          </Form.Item> */}

          <Form.Item
            label="Password"
            name="password"
            className="login-label"
            rules={[
              { required: true, message: "Please input your password!" },
              {
                min: 8,

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
          <Form.Item label={null}
           style={{marginBottom:"12px"}}>
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
    );
  }

  return (
    <Flex justify="center" align="center" className="flex" vertical>
      <div className="modal-signin-signup login-box">
        <Tabs onChange={onchange} activeKey={activeKey} className="login-tab" items={items}></Tabs>
      </div>
    </Flex>
  );
};

export default Login;
