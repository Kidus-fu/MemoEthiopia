import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { FormProps } from 'antd';
import { Button, Form, Input, ConfigProvider, notification, Result, Popover } from 'antd';
import { motion } from 'framer-motion';
import Ethio_logo from "../assets/MemoEthio_logo_4.png";
import singin_characters from "../assets/singin_characters.png";
import api from '../api';
import { RootState } from '../store/store';
import { login, logout } from '../store/Userinfo';
import { useDispatch, useSelector } from 'react-redux';
import { REFRESH_TOKEN } from '../config';
import { backToClentMode, changeToDeveloperMode } from '../store/Developer_test';
import { BugFilled, BugOutlined } from '@ant-design/icons';

type FieldType = {
    username_email?: string;
    password?: string;
};

interface NotificationProps {
    message: string;
}

const SignIn: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [notificationapi, contextHolder] = notification.useNotification();
    const loggedIn = useSelector((state: RootState) => state.userinfo.loggedIn)
    const DeveloperTest: boolean = useSelector((state: RootState) => state.developertest.border_test)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const HandelerDeveloperTest = () => {
        dispatch(changeToDeveloperMode())
    }
    const HandelerClient = () => {
        dispatch(backToClentMode())
    }
    useEffect(() => {
        document.title = "MemoEthiopa | Sign In";
    }, []);

    const goToHome = () => {
        navigate("/")
    }

    const openSuccessNotification = (message: NotificationProps['message']) => {
        notificationapi.success({
            message: message,
            className: "bg-[#2D2D2F] rounded",
            showProgress: true,
            pauseOnHover: false,
        });
    };

    const openErrorNotification = (message: NotificationProps['message']) => {
        notificationapi.error({
            message: message,
            className: "bg-[#2D2D2F] rounded",
            showProgress: true,
            pauseOnHover: true,
        });
    };

    const saverefresh_token = (refresh_token: string) => {
        localStorage.setItem(REFRESH_TOKEN, refresh_token)
    }

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setLoading(true); // Set loading state to true when form is submitting
        if (emailRegex.test(values.username_email as string)) {
            // send a email login request
            api.post("api-v1/email/token/", { "email": values.username_email, "password": values.password })
                .then(repo => {
                    setLoading(false)
                    if (repo.status == 200) {
                        const notificationbtn = document.getElementById("notification-success")
                        notificationbtn?.click()
                        dispatch(login(repo.data.access))
                        saverefresh_token(repo.data.refresh)
                        goToHome()
                    }
                    setLoading(false)
                })
                .catch(error => {
                    if (error.status == 400) {
                        const notificationbtn = document.getElementById("notification-erro404email")
                        notificationbtn?.click()
                    }
                    if (error.code === "ERR_NETWORK") {
                        const notificationbtn = document.getElementById("notification-erro500")
                        notificationbtn?.click()
                    }
                    setLoading(false)
                })
        } else {
            // send username login request
            api.post("api-v1/username/token/", { "username": values.username_email, "password": values.password })
                .then(repo => {
                    if (repo.status == 200) {
                        const notificationbtn = document.getElementById("notification-success")
                        notificationbtn?.click()
                        dispatch(login(repo.data.access))
                        saverefresh_token(repo.data.refresh)
                        navigate("/")
                    }
                })
                .catch(error => {
                    if (error.status == 400) {
                        const notificationbtn = document.getElementById("notification-erro404username")
                        notificationbtn?.click()
                    }
                    if (error.code === "ERR_NETWORK") {
                        const notificationbtn = document.getElementById("notification-erro500")
                        notificationbtn?.click()
                    }

                    setLoading(false)
                })
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (error) => {

        setLoading(false);

        const notificationbtn = document.getElementById("notification-error");
        if (notificationbtn) {
            notificationbtn.onclick = () => openErrorNotification(error.errorFields[0].errors[0]);
        }
        notificationbtn?.click()

    };
    const validateUsernameEmail = (rule: any, value: string) => {
        rule
        if (!value) {
            return Promise.reject('Please input your username or email!');
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(value)) {
            return Promise.resolve();
        }
        if (value.length < 3) {
            return Promise.reject('Username must be at least 3 characters!');
        }
        return Promise.resolve();
    };
    // Animation settings using framer-motion
    const formVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    const BoxVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
    };
    const getClassNames = (baseClass: string) => `${baseClass} ${DeveloperTest ? 'border border-red-700' : ''}`;
    return (
        <>
            <div className='sr-only'>
                <button id='notification-error'></button>
                <button onClick={() => openErrorNotification("Invalidate  email or password")} id='notification-erro404email'></button>
                <button onClick={() => openErrorNotification("Invalidate username or password")} id='notification-erro404username'></button>
                <button onClick={() => openErrorNotification("Server Network Error Pleas Try liter")} id='notification-erro500'></button>
                <button onClick={() => openSuccessNotification("Logined")} id='notification-success'></button>
            </div>
            <div className={getClassNames('bg-[#1E1E1F] fixed ')}>
                <Link to={"/"} className={getClassNames('cursor-default')}>
                    <img src={Ethio_logo} alt="Memo Ethiopa Logo" onDragStart={e => e.preventDefault()} className={getClassNames('h-20 w-20')} />
                </Link>
            </div>
            <div className={getClassNames("flex justify-center items-center min-h-screen w-full bg-[#1E1E1F] bg-cover bg-no-repeat")}>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={BoxVariants}
                    transition={{ duration: 0.8 }}
                    whileInView={{ scale: 1.1 }}
                    className={getClassNames("flex justify-center md:scale-125 items-center md:w-2/4 p-6 rounded-4xl bg-[#2D2D2F] ")}
                >
                    {!loggedIn &&
                        <div className={getClassNames("hidden md:block w-1/2 p-4 bg-cover h-[293px] me-3 ")}
                            style={{ backgroundImage: `url(${singin_characters})` }}
                        ></div>
                    }
                    <div className={getClassNames("w-full md:w-2/4 flex flex-col justify-center items-center mr-3")}>
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
                            {contextHolder}
                            {!loggedIn && (
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={formVariants}
                                    transition={{ duration: 0.8 }}
                                    className={getClassNames("w-full max-w-md mx-auto ")}
                                >
                                    <Form
                                        name="basic"
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        style={{ maxWidth: 600 }}
                                        initialValues={{ remember: true }}
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                        autoComplete="off"
                                    >
                                        <h3 className={getClassNames("text-center mb-4 text-2xl ")} style={{ fontFamily: "Kaushan Script, cursive" }}>
                                            Sign in
                                        </h3>
                                        <p className={getClassNames("text-center mb-4  ")}>Enter your username or email to sign in</p>
                                        {/* Username/Email Field with custom validation */}
                                        <Form.Item<FieldType>
                                            label="Username"
                                            name="username_email"
                                            className={getClassNames('ms-3 ')}
                                            rules={[{ validator: validateUsernameEmail }]}
                                        >
                                            <div className={"flex "}>
                                                <Input placeholder="Username/Email" />
                                            </div>
                                        </Form.Item>

                                        <Form.Item<FieldType>
                                            label="Password"
                                            name="password"
                                            className={getClassNames('mt-3 ')}
                                            rules={[{ required: true, message: 'Please input your password!' }]}
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                        <Form.Item label={null}>
                                            <Button
                                                type="primary"
                                                className={getClassNames("w-2/4 ")}
                                                htmlType="submit"
                                                loading={loading}  >
                                                Submit
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                    <p className={getClassNames("text-gray-400 text-center")} >
                                        Don't have an account?{' '}
                                        <i className={getClassNames("text-blue-500 hover:underline")}><Link to={"/singup"} > Sign up</Link></i>
                                    </p>
                                </motion.div>
                            )}
                            {loggedIn && (
                                <Result title="Have a account in this devies" status={"warning"} children={<>
                                    <div className={getClassNames("flex justify-center gap-2 ")}>
                                        <Link to={"/"} >
                                            <Button type='primary' className={getClassNames('')}>Home</Button>
                                        </Link>
                                        <Link to={"/singin"}>
                                            <Button type='primary' danger className={getClassNames("")} onClick={() => dispatch(logout())}>Logout</Button>
                                        </Link>
                                    </div>
                                </>} />
                            )}
                        </ConfigProvider>
                    </div>
                </motion.div>
            </div>
            <Popover title="1 Click to Off, Double Click to On">
                <button
                    className={getClassNames("fixed bottom-0 text-white text-2xl border p-4 right-0 m-2 rounded-full border-red-800")}
                    onDoubleClick={HandelerDeveloperTest}
                    onClick={HandelerClient}
                >
                    {DeveloperTest ? <BugFilled /> : <BugOutlined />}
                </button>
            </Popover>
        </>
    );
};

export default SignIn;
