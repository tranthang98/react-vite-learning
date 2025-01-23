import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import {
    AuditOutlined, HomeOutlined, SettingOutlined, UsergroupAddOutlined,
    LoginOutlined, AliwangwangOutlined,
    UserAddOutlined
} from '@ant-design/icons';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';

const Header = () => {

    const [current, setCurrent] = useState('');

    const { user } = useContext(AuthContext);

    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/users"}>Users</Link>,
            key: 'users',
            icon: <UsergroupAddOutlined />,
        },
        {
            label: <Link to={"/books"}>Books</Link>,
            key: 'books',
            icon: <AuditOutlined />
        },

        ...(!user.id ? [
            {
                label: <Link to={"/login"}>Đăng nhập</Link>,
                key: 'login',
                icon: <LoginOutlined />,
                style: {
                    marginLeft: "auto"
                },
            },
            {
                label: <Link to={"/register"}>Đăng Ký</Link>,
                key: 'signup',
                icon: <UserAddOutlined />
            }
        ] : []),

        ...(user.id ? [{
            label: `Welcome ${user.fullName}`,
            key: 'setting',
            style: {
                marginLeft: "auto"
            },
            icon: <AliwangwangOutlined />,
            children: [
                {
                    label: <Link to={"/login"}>Đăng xuất</Link>,
                    key: 'logout',
                },
            ],
        }] : []),
    ];

    const onClick = (e) => {
        setCurrent(e.key);
    };

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
            style={{ display: "flex" }}
        />
    )
}

export default Header;