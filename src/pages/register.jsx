import { Button, Form, Input } from "antd";

const RegisterPage = () => {

    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(values);
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
                            message: 'Please input your username!',
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
                            message: 'Please input your username!',
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
                            message: 'Please input your username!',
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
                            message: 'Please input your username!',
                        },
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