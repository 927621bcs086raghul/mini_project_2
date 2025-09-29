import React from "react";
import { Button, Form, Input, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import './Login.css'
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../redux/utils";
const Login = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [form]=Form.useForm();
  const handleSubmit = (values)=>{
     const { username, password } = values;
    console.log(username, password);
    
    dispatch(loginRequest({ Username: username, Password: password }));
  };
  const {loading} = useSelector((state) => state.auth)
  return (
    
    <Flex justify="center" align="center" className="flex" vertical>
    <div>
        <Form
          name="basic"
          form={form}
          className="login-box"
          style={{ maxWidth: 400 }}
          initialValues={{

          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" },
            { type: 'email', message: 'Please enter a valid email!' }
            ]
        }
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" },
            { min: 7, message: "Password must be at least 7 characters!" }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <p className="forgot-password" onClick={()=>{navigate("/resetPassword")}}>
            Forgot Password
          </p>

          <Form.Item label={null}>
            {<Button type="primary" htmlType="submit" className="signin-botton" loading={loading}>
              Submit
            </Button>}
          </Form.Item>
          <p className="signUp-describe">
            If not register means please register?<strong className="signup-nav" onClick={()=>{
            navigate("/signUp")
          }}> SignUp</strong>
          </p>
        </Form>
        <p>
        </p>
    </div>
    
      </Flex>
  );
};

export default Login;
