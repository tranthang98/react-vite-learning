import { Button, Checkbox, Col, Divider, Form, Input, message, notification, Row } from "antd";
import { loginUserAPI } from "../services/api.service";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useState } from "react";

const LoginPage = () => {

    let navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    // const { setUser } = useContext(AuthContext);

    const onFinish = async (values) => {
        setLoading(true);
        const res = await loginUserAPI(
            values.email,
            values.password
        );

        if (res.data) {
            message.success("Đăng nhập user thành công");
            localStorage.setItem("access_token", res.data.access_token);
            // setUser(res.data.user);
            navigate("/");
        } else {
            notification.error({
                message: "Login user error",
                description: JSON.stringify(res.message)
            })
        }
        setLoading(false);
    };

    return (
        <Row justify="center" style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={6}>
                <fieldset style={{
                    padding: "15px",
                    margin: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px"
                }}>
                    <legend>Đăng Nhập</legend>
                    <Form
                        form={form}
                        name="basic"
                        layout="vertical"
                        style={{
                            margin: "10px",
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password onKeyDown={(event) => {
                                if (event.key === 'Enter') form.submit();
                            }} />
                        </Form.Item>
                        <Form.Item>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <Button
                                    loading={loading}
                                    type="primary"
                                    onClick={() => form.submit()}>
                                    Login
                                </Button>
                                <Link to="/">Go to homepage <ArrowRightOutlined /></Link>
                            </div>
                        </Form.Item>
                        <Divider />
                        <div style={{ textAlign: "center" }}>
                            Chưa có tài khoản? <Link to={"/register"}>Đăng ký tại đây</Link>
                        </div>
                    </Form>
                </fieldset>
            </Col>
        </Row >
    )
}

export default LoginPage;