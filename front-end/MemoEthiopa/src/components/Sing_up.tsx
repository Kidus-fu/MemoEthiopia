import React, { useEffect, useState } from 'react';

// router
import { Link, useNavigate } from 'react-router';

// ant design
import type { FormProps } from 'antd';
import { Button, Form, Input, ConfigProvider, notification, Result } from 'antd';

// animation
import { motion } from 'framer-motion'; // Import motion from framer-motion

// local files
import Ethio_logo from "../assets/MemoEthio_logo_4.png";
import singin_characters from "../assets/singin_characters.png";

// api requests
import api from '../api';

// store
import { RootState } from '../store/store';
import { login, logout } from '../store/Userinfo';
import { useDispatch, useSelector } from 'react-redux';

// config
import { REFRESH_TOKEN } from '../config';



type FieldType = {
    email?: string;
    username?:string
    password?: string;
    configpassword?:string;
};

interface NotificationProps {
    message: string;
}

const SingUp: React.FC = () => {
    
    const [loading, setLoading] = useState(false);
    const [notificationapi, contextHolder] = notification.useNotification();
    const loggedIn = useSelector((state: RootState) => state.userinfo.loggedIn)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        // change a title
        document.title = "MemoEthiopa | Sign In";
    }, []);

    const goToHome = () => {
        navigate("/")
    }

    // Success Notification
    const openSuccessNotification = (message: NotificationProps['message']) => {
        notificationapi.success({
            message: message,
            className: "bg-[#2D2D2F] rounded",
            showProgress: true,
            pauseOnHover: false,
        });
    };

    // Error Notification
    const openErrorNotification = (message: NotificationProps['message']) => {
        notificationapi.error({
            message: message,
            className: "bg-[#2D2D2F] rounded",
            showProgress: true,
            pauseOnHover: false,
        });
    };

    const saverefresh_token = (refresh_token: string) => {
        localStorage.setItem(REFRESH_TOKEN, refresh_token)
    }
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setLoading(true); // Set loading state to true when form is submitting

        if (emailRegex.test(values.username_email as string)) {
            // send an email login request
            // console.log("Email login attempt:",values);

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
                    if (error.status === 500) {
                        const notificationbtn = document.getElementById("notification-erro404username")
                        notificationbtn?.click()
                    }
                    setLoading(false)
                })}
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (error) => {
        setLoading(false); // Reset loading state on failure
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
    return (
        <>
            <button className='sr-only' id='notification-error'></button>
            <button onClick={() => openErrorNotification("Invalidate  email or password")} className='sr-only' id='notification-erro404email'></button>
            <button onClick={() => openErrorNotification("Invalidate username or password")} className='sr-only' id='notification-erro404username'></button>
            <button onClick={() => openSuccessNotification("Logined")} className='sr-only' id='notification-success'></button>
            <div className='bg-[#1E1E1F] fixed'>
                <Link to={"/"} className='cursor-default'>
                    <img src={Ethio_logo} alt="Memo Ethiopa Logo" onDragStart={e => e.preventDefault()} className='h-20 w-20' />
                </Link>
            </div>
            <div className="flex justify-center items-center min-h-screen w-full bg-[#1E1E1F] bg-cover bg-no-repeat">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={BoxVariants}
                    transition={{ duration: 0.8 }}
                    whileInView={{ scale: 1.1 }}
                    className="flex justify-center md:scale-125 items-center md:w-2/4 p-6 rounded-4xl bg-[#2D2D2F]"
                >
                    {/* Character Image - Hidden on Mobile */}
                    {!loggedIn &&
                        <div className="hidden md:block w-1/2 p-4 bg-cover h-[300px]"
                            style={{ backgroundImage: `url(${singin_characters})` }}
                        ></div>
                    }

                    {/* Form Section */}
                    <div className="w-full md:w-2/4 flex flex-col justify-center items-center mr-3">
                        {/* ConfigProvider with customized theme */}

                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: "#312EB5",
                                    colorText: "#fff",
                                },
                                components: {
                                    Button: {
                                        colorPrimary: "#312EB5",
                                        colorPrimaryBgHover: "#312EB5",
                                        borderRadius: 4,
                                        fontFamily: "Average",
                                    },
                                    Input: {
                                        borderRadius: 8,
                                        colorBgContainer: "#4b4b4e",
                                        colorBorder: "#4b4b4e",
                                        colorTextPlaceholder: "#99867F",
                                        fontFamily: "Average",
                                        colorText: "#ffff"
                                    },
                                    Form: {
                                        colorError: "#E33B3B"
                                    },
                                    Notification: {
                                        colorBgContainer: "#0000"
                                    }
                                }
                            }}
                        >
                            {contextHolder}
                            {/* Animated Form Section */}
                            {!loggedIn && (
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={formVariants}
                                    transition={{ duration: 0.8 }}
                                    className="w-full max-w-md mx-auto"
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
                                        <h3 className="text-center m-3 text-2xl" style={{ fontFamily: "Kaushan Script, cursive" }}>
                                            Sign in
                                        </h3>
                                        <p className="text-center mb-4">Enter your username or email to sign in</p>

                                        {/* Username/Email Field with custom validation */}
                                        <Form.Item<FieldType>
                                            label="Username"
                                            name="username_email"

                                            rules={[{ validator: validateUsernameEmail }]}
                                        >
                                            <div className="flex ">
                                                <Input placeholder="Username/Email" />
                                            </div>
                                        </Form.Item>

                                        <Form.Item<FieldType>
                                            label="Password"
                                            name="password"
                                            rules={[{ required: true, message: 'Please input your password!' }]}
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                        <Form.Item label={null}>
                                            <Button
                                                type="primary"
                                                className="w-2/4"
                                                htmlType="submit"
                                                loading={loading} // Set the loading prop here
                                            >
                                                Submit
                                            </Button>
                                        </Form.Item>
                                    </Form>

                                    <p className="text-white text-center cursor-default" style={{ fontFamily: "Kaushan Script, cursive" }}>
                                        have an account?{' '}
                                        <i className="text-sky-700 hover:underline hover:text-sky-300 cursor-pointer"><Link to={"signup/"} > Sign up</Link></i>
                                    </p>
                                </motion.div>
                            )}
                            {loggedIn && (
                                <Result title="Have a account in this devies" status={"warning"} children={<>
                                    <div className="flex justify-center gap-2">
                                        <Link to={"/"} >
                                            <Button type='primary' >Home</Button>
                                        </Link>
                                        <Link to={"/singin"}>
                                            <Button type='primary' danger onClick={() => dispatch(logout())}>Logout</Button>
                                        </Link>
                                    </div>
                                </>} />
                            )}
                        </ConfigProvider>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default SingUp;
