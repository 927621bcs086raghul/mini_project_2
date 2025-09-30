import React from "react";
import { Button, Form, Input, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../redux/utils";
const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const handleSubmit = (values) => {
    const { username,userId, password } = values;

    dispatch(registerRequest({ username:username,UserId: userId, Password: password }));
  };
  const { loading } = useSelector((state) => state.auth);
  return (
    <Flex justify="center" align="center" vertical className="flex">
      <div className="modal-signin-signup">
        <Form
          name="basic"
          form={form}
          className="login-box-signup"
          layout="vertical" 
          initialValues={{}}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Username"
            name="username"
            className="signup-label"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input className="input-field" placeholder="Please enter Username" />
          </Form.Item>
          <Form.Item
            label="UserId"
            name="userId"
            className="signup-label"
            rules={[
              { required: true, message: "Please input your username!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input className="input-field" placeholder="Please enter UserId"/>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            className="signup-label"
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
            <Input.Password className="input-field" placeholder="Please set password"/>
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            className="signup-label"
            name="password_confirmation"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 7, message: "Password must be at least 7 characters!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password className="input-field" placeholder="re-enter the password" />
          </Form.Item>
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
          <p className="signUp-describe">
            If already registered ?
            <strong
              className="signup-nav"
              onClick={() => {
                navigate("/login");
              }}
            >
              {" "}
              Login
            </strong>
          </p>
        </Form>
        <p></p>
      </div>
    </Flex>
  );
};

export default SignUp;
