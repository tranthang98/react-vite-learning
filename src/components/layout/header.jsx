import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, message } from 'antd';
import {
    AuditOutlined, HomeOutlined, SettingOutlined, UsergroupAddOutlined,
    LoginOutlined, AliwangwangOutlined,
    UserAddOutlined
} from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { logOutAPI } from '../../services/api.service';

const Header = () => {

    const [current, setCurrent] = useState('');

    const { user, setUser } = useContext(AuthContext);

    const location = useLocation();

    useEffect(() => {
        if (location && location.pathname) {
            const allRoutes = ["users", "books"];
            const currentRoute = allRoutes.find(item => `/${item}` === location.pathname);
            if (currentRoute) {
                setCurrent(currentRoute);
            } else {
                setCurrent("home");
            }
        }
    }, [location])

    let navigate = useNavigate();

    const handleLogout = async () => {
        const res = await logOutAPI();
        if (res.data) {
            //clear data
            localStorage.removeItem("access_token");
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            })
            message.success("Đăng xuất thành công");

            //redirect to home
            navigate("/");
        }

    }

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
                    label: <span onClick={() => handleLogout()}>Đăng xuất</span>,
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