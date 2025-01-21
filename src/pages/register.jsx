import { Button, Form, Input, notification } from "antd";
import { registerUserAPI } from "../services/api.service";
import { useNavigate } from "react-router";


const RegisterPage = () => {

    const [form] = Form.useForm();
    let navigate = useNavigate();


    const onFinish = async (values) => {
        console.log(values);

        const res = await registerUserAPI(
            values.fullName,
            values.email,
            values.password,
            values.phoneNumber
        );

        if (res.data) {
            notification.success({
                message: "Register user",
                description: "Đăng ký user thành công"
            })
            navigate("/login");
        } else {
            notification.error({
                message: "Register user error",
                description: JSON.stringify(res.message)
            })
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            name="basic"
            // labelCol={{
            //     span: 8,
            // }}
            // wrapperCol={{
            //     span: 16,
            // }}
            // style={{
            //     maxWidth: 600,
            // }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <div style={{
                margin: "50px",
            }}>
                <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your full name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
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
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Phone number"
                    name="phoneNumber"
                    rules={[
                        {
                            required: true,
                            pattern: new RegExp(/\d+/g),
                            message: "Wrong format!"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <div>
                    <Button
                        onClick={() => form.submit()}
                        type="primary">Register</Button>
                </div>
            </div>
        </Form>
    )
}

export default RegisterPage;