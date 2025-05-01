import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { FormProps } from 'antd';
import { Button, Form, Input, ConfigProvider, notification, Result } from 'antd';
import { motion } from 'framer-motion';
import Ethio_logo from "../assets/MemoEthio_logo_4.png";
import singin_characters from "../assets/singin_characters.png";
import api from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { login, logout } from '../store/Userinfo';
import { REFRESH_TOKEN } from '../config';

type FieldType = {
    email?: string;
    username?: string;
    frist_name?: string;
    last_name?: string;
    password?: string;
    configpassword?: string;
};

const SignUp: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [notificationapi, contextHolder] = notification.useNotification();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedIn = useSelector((state: RootState) => state.userinfo.loggedIn);

    useEffect(() => {
        document.title = "MemoEthiopa | Sign Up";
    }, []);

    const openSuccessNotification = (message: string) => {
        notificationapi.success({
            message,
            className: "bg-[#2D2D2F] rounded text-white",
        });
    };

    const openErrorNotification = (message: string) => {
        notificationapi.error({
            message,
            className: "bg-[#2D2D2F] rounded text-white",
        });
    };

    const saverefresh_token = (refresh_token: string) => {
        localStorage.setItem(REFRESH_TOKEN, refresh_token);
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        setLoading(true);
        api.post("api-v1/register/", values)
            .then((res) => {
                setLoading(false);
                openSuccessNotification("Successfully registered!");
                setLoading(true)
                
                api.post("api-v1/otp/send-otp/", { email: values.email })
                    .then(() => {
                        openSuccessNotification("OTP sent to your email!");
                        setTimeout(() => {
                            navigate("/otp", { state: { email: values.email } });
                            setLoading(false);
                        }, 2000);
                    })
                    .catch(() => {
                        setLoading(false);
                        openErrorNotification("Failed to send OTP. Try again.");
                    }
                );
            })
            .catch(() => {
                setLoading(false);
                openErrorNotification("Registration failed. Try again.");
            });
    };

    const formVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <>
            {contextHolder}
            <div className="min-h-screen w-full bg-gradient-to-br from-[#1E1E1F] via-[#252526] to-[#1E1E1F] flex items-center justify-center px-4">
                <motion.div
                    className="bg-[#2D2D2F] rounded-2xl shadow-2xl p-8 w-full max-w-4xl flex flex-col md:flex-row items-center justify-between"
                    initial="hidden"
                    animate="visible"
                    variants={formVariants}
                    transition={{ duration: 0.7 }}
                >
                    {/* Left Side - Logo & Image */}
                    <div className="hidden md:flex w-1/2 flex-col items-center justify-center">
                        <img src={Ethio_logo} alt="Logo" className="h-20 mb-6" draggable={false} />
                        <img src={singin_characters} alt="Characters" className="w-full max-w-xs" draggable={false} />
                    </div>

                    {/* Right Side - Form */}
                    <div className="w-full md:w-1/2 px-2">
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: "#312EB5",
                                    colorText: "#fff",
                                },
                                components: {
                                    Input: {
                                        colorBgContainer: "#3A3A3D",
                                        colorBorder: "#515155",
                                        borderRadius: 6,
                                        colorText: "#ffffff",
                                        colorTextPlaceholder: "#b0b0b0",
                                    },
                                    Button: {
                                        borderRadius: 6,
                                    },
                                    Form: {
                                        colorError: "#E33B3B",
                                    }
                                }
                            }}
                        >
                            {!loggedIn ? (
                                <Form
                                    name="signup"
                                    layout="vertical"
                                    onFinish={onFinish}
                                    autoComplete="off"
                                >
                                    <h2 className="text-3xl text-white font-semibold text-center mb-4">Create an Account</h2>
                                    <p className="text-center text-sm text-gray-400 mb-6">Join MemoEthiopa today!</p>

                                    <Form.Item<FieldType> label="Username" name="username" rules={[{ required: true, message: 'Please enter your username' }]}>
                                        <Input placeholder="Username" />
                                    </Form.Item>

                                    <Form.Item<FieldType> label="Email" name="email" rules={[{ type: 'email', required: true, message: 'Enter a valid email' }]}>
                                        <Input placeholder="example@email.com" />
                                    </Form.Item>

                                    <div className="flex gap-4">
                                        <Form.Item<FieldType> name="frist_name" className="w-1/2" rules={[{ required: true, message: 'Enter first name' }]}>
                                            <Input placeholder="First Name" />
                                        </Form.Item>
                                        <Form.Item<FieldType> name="last_name" className="w-1/2" rules={[{ required: true, message: 'Enter last name' }]}>
                                            <Input placeholder="Last Name" />
                                        </Form.Item>
                                    </div>

                                    <Form.Item<FieldType> label="Password" name="password" rules={[{ required: true, message: 'Enter your password' }]}>
                                        <Input.Password placeholder="Password" />
                                    </Form.Item>

                                    <Form.Item<FieldType> label="Confirm Password" name="configpassword" dependencies={['password']} rules={[{
                                        required: true,
                                        message: 'Confirm your password',
                                    }, ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Passwords do not match'));
                                        }
                                    })]}>
                                        <Input.Password placeholder="Confirm Password" />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" block loading={loading}>
                                            Sign Up
                                        </Button>
                                    </Form.Item>

                                    <p className="text-gray-400 text-center">
                                        Already have an account?{' '}
                                        <Link to="/singin" className="text-blue-500 hover:underline">
                                            Sign in
                                        </Link>
                                    </p>
                                </Form>
                            ) : (
                                <Result
                                    status="success"
                                    title="You're already signed in!"
                                    extra={[
                                        <Link to="/" key="home">
                                            <Button type="primary">Go Home</Button>
                                        </Link>,
                                        <Button key="logout" danger onClick={() => dispatch(logout())}>
                                            Logout
                                        </Button>
                                    ]}
                                />
                            )}
                        </ConfigProvider>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default SignUp;
