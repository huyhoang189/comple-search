import { useEffect, useState } from "react";
import { Layout, Form, Input, Row, Col, Button, Image } from "antd";
import { useDispatch } from "react-redux";
import { LoginWrapper } from "../../assets/style/login.style";
import Logo from "../../assets/logo.png";
import axios from "axios";
import { notification } from "antd";

const { Header, Content } = Layout;
export default function Login() {
  const onFinish = (values) => {
    console.log("Login form values:", values);
    // window.location.pathname = "/";
    // You can add your login logic here.
    axios
      .post("http://103.149.28.238:3001/api/auth/login", {
        username: values.username,
        password: values.password,
      })
      .then((res) => {
        const temp = res.data;
        const token = temp.token;
        const user = temp.user;
        console.log("bbb");
        localStorage.setItem("tokens", token);
        localStorage.setItem("user", JSON.stringify(user));
        notification.success({ message: "Đăng nhập thành công" });
        window.location.pathname = "/";
      })
      .catch((err) => {
        notification.error({ message: "Sai tên đăng nhập hoặc mật khẩu!" });
      });
  };

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <LoginWrapper>
      <Layout
        style={{
          height: windowSize.innerHeight,
        }}
      >
        <Row className="content" gutter={0}>
          <Col xs={{ span: 24 }} md={{ span: 16 }} className="right-image">
            <img
              src="https://static.vecteezy.com/system/resources/previews/004/092/965/large_2x/character-focused-back-to-work-with-employee-free-vector.jpg"
              alt="Background"
              className="background-image"
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 8 }} className="login-form">
            <Form
              name="login"
              onFinish={onFinish}
              initialValues={{
                remember: true,
              }}
              layout="vertical"
              style={{ width: "70%" }}
            >
              <Image src={Logo} preview={false} />
              <Form.Item
                label={<label style={{ color: "white" }}>Tài khoản</label>}
                name="username"
                rules={[
                  { required: true, message: "Vui lòng nhập tài khoản!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={<label style={{ color: "white" }}>Mật khẩu</label>}
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password />
              </Form.Item>
              <Button
                type="primary"
                style={{ width: "100%", marginTop: 13 }}
                className="blue-button"
                htmlType="submit"
              >
                Đăng nhập
              </Button>
            </Form>
          </Col>
        </Row>
      </Layout>
    </LoginWrapper>
  );
}

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
