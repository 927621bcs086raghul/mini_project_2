import React from "react";
import { Button, Form, Input, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../redux/utils";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const handleSubmit = (values) => {
    const { userId, password } = values;

    dispatch(loginRequest({ UserId: userId, Password: password }));
  };
  const { loading } = useSelector((state) => state.auth);
  return (
    <Flex justify="center" align="center" className="flex" vertical>
      <div>
        <Form
          name="basic"
          form={form}
          className="login-box"
          style={{ maxWidth: 400 }}
          onFinish={handleSubmit}
          initialValues={{
            userId: "",
            password: "",
          }}
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
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            className="login-label"
            rules={[
              { required: true, message: "Please input your password!" },
              { min:8,
                pattern: new RegExp(
                  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])"
                ),
                message:
                  "Minimum eight characters, at least one letter, one number and one special character:",
              },
            ]}
          >
            <Input.Password />
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
          <p className="signUp-describe">
            If not register means please register?
            <strong
              className="signup-nav"
              onClick={() => {
                navigate("/signUp");
              }}
            >
              {" "}
              SignUp
            </strong>
          </p>
        </Form>
        <p></p>
      </div>
    </Flex>
  );
};

export default Login;
