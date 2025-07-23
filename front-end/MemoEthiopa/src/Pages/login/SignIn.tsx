import React, { useEffect, useState } from 'react';
import { Badge, Button, Modal, Result } from 'antd';
import { ConfigProvider } from 'antd';
import { Form, Input, theme as antdTheme } from 'antd';
import {  FacebookFilled, GoogleCircleFilled, Loading3QuartersOutlined, LockFilled, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import SinginImg from "./singin.png"
import { validateUsernameEmail } from './FormValidaters';
import { SinginType } from '../type';
import { RootState } from '../../store/store';
import MemoEthiopaLogo from "../../assets/MemoEthio_logo_4.png"
import { useSigninForm } from '../../hooks/useSinginForm';

import LoginHelper from './LoginHelper';
import { Link } from 'react-router-dom';
import { logout } from '../../store/features/users/Userinfo';

const SignIn: React.FC = () => {
    const theme = useSelector((state: RootState) => state.theam.theme);
    const DeveloperTest = useSelector((state: RootState) => state.developertest.border_test);
    const { SinginonFinish, SinginonFinishFailed, SinginisLoading } = useSigninForm();
    const loggedIn = useSelector((state: RootState) => state.userinfo.loggedIn)
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        document.title = "MemoEthiopa | Sign In";
    }, []);
    const getClassNames = (base: string) => {
        const border = DeveloperTest ? 'border border-red-700' : '';
        const themeStyle = theme === 'dark' ? ' bg-[#1C1C1C] text-white p-1' : 'bg-[#F3F6FB] text-black p-1';
        return `${base} ${border} ${themeStyle}`;
    };

    return (
        <div className={getClassNames("min-h-screen sm:w-full  flex justify-center")}>
            <div className={getClassNames("rounded-md shadow-md w-full")}>
                <img src={MemoEthiopaLogo} alt="" className={getClassNames("w-18 h-18 m-2 fixed")} />
                <div className="min-h-screen w-full flex justify-center items-center  py-8 sm:px-0">
                    <ConfigProvider theme={{
                        algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
                        components: {
                            Input: {
                                borderRadius: 10,
                                lineHeight: 2,
                                activeBorderColor: "",
                                colorBgBase: "#EAEFE6"
                            },
                        },
                        token: {
                            colorBgMask: "rgb(1, 1, 1,0.7)"
                        }
                    }}>
                        {loggedIn ? (
                            <Result
                                status="info"
                                title="You're already logged in"
                                subTitle="It looks like you have an active session in this browser. You can continue using your account or log out if needed."
                                extra={
                                    <div className="flex gap-3 justify-center">
                                        <Button type="primary" key="home">
                                            <Link to="/">Go to Home</Link>
                                        </Button>
                                        <Link to={"/singin"}>
                                            <Button type="default" danger key="logout" onClick={() => dispatch(logout())}>
                                                Logout
                                            </Button>
                                        </Link>
                                    </div>
                                }
                            />
                        ) :
                            (
                                <div className={getClassNames("w-full max-w-md sm:p-4 sm:px-8")}>
                                    <h3 className={getClassNames("text-3xl sm:text-2xl font-semibold text-center ")}>LOGIN</h3>
                                    <div className={getClassNames("text-center mt-2 mb-2")}>
                                        <small className={getClassNames("sm:text-xs")}>
                                            How do I get started?{" "}
                                            <span className="text-blue-500 hover:underline cursor-pointer text-xs"
                                                onClick={() => setIsModalOpen(true)}
                                            >
                                                Learn more
                                            </span>
                                        </small>
                                        <Modal
                                            title="Login Helper"
                                            closable={{ 'aria-label': 'Custom Close Button' }}
                                            open={isModalOpen}
                                            onCancel={() => setIsModalOpen(false)}
                                            width={800}
                                            footer={
                                                <Button
                                                    onClick={() => setIsModalOpen(false)}
                                                >Understand</Button>
                                            }
                                        >
                                            <LoginHelper />
                                        </Modal>
                                    </div>
                                    <div className="flex justify-center items-center w-full ">
                                        <div className="w-4/5 max-w-md sm:text-xs">
                                            <Form
                                                name="basic"
                                                labelCol={{ span: 0 }}
                                                wrapperCol={{ span: 25 }}
                                                initialValues={{ remember: true }}
                                                onFinish={SinginonFinish}
                                                style={{ padding: 15 }}
                                                onFinishFailed={SinginonFinishFailed}
                                                autoComplete="off"
                                                className={getClassNames("")}
                                                disabled={SinginisLoading}
                                            >
                                                <Form.Item<SinginType>
                                                    name="usernameoremail"
                                                    rules={[{ required: true, message: 'Please input your username or email!', validator: validateUsernameEmail }]}
                                                >
                                                    <Input prefix={<UserOutlined />}  placeholder='username/email' />
                                                </Form.Item>

                                                <Form.Item<SinginType>
                                                    name="password"
                                                    rules={[
                                                        { required: true, message: 'Please input your password!' },
                                                        { min: 10 , message: 'Password must be at least 10 characters long'}
                                                    ]}
                                                >
                                                    <Input.Password prefix={<LockFilled />} placeholder='password' />
                                                </Form.Item>
                                                <p className="text-blue-500">Forgot password</p>
                                                <div className="flex justify-center">
                                                    <button
                                                        type="submit"
                                                        className={getClassNames(
                                                            "rounded-lg bg-gradient-to-r text-white from-[#6f6dcc] to-[#312EB5]  mt-1 font-bold w-4/5 max-w-sm mx-auto text-sm"
                                                        )}
                                                    >
                                                        {SinginisLoading ? <Loading3QuartersOutlined className='animate-spin' /> : ""}   Login Now
                                                    </button>
                                                </div>
                                            </Form>
                                            <div className={getClassNames("flex items-center my-4")}>
                                                <div className={getClassNames("flex-grow border-t border-gray-300 text-xs")}></div>
                                                <span className={getClassNames("mx-4 text-gray-500 font-medium text-xs")}>Login with others</span>
                                                <div className={getClassNames("flex-grow border-t border-gray-300")}></div>
                                            </div>
                                            <div className={getClassNames("flex justify-center items-center gap-2 mt-6 flex-wrap text-xs")}>
                                                <div className="flex flex-col items-center text-xs">
                                                    <Badge.Ribbon text="Comming soon" >
                                                        <button
                                                            className={getClassNames("flex items-center gap-2 px-4 py-2 rounded-md transition-all border border-transparent opacity-50 cursor-not-allowed text-xs")}
                                                            disabled
                                                        >
                                                            <span className={getClassNames('text-red-700 text-xl')}>
                                                                <GoogleCircleFilled />
                                                            </span>
                                                            <span className={getClassNames('text-gray-700')}>Login with Google</span>
                                                        </button>
                                                    </Badge.Ribbon>
                                                </div>
                                                <Badge.Ribbon text="Comming soon" >
                                                    <div className="flex flex-col items-center">
                                                        <button
                                                            className={getClassNames("flex items-center gap-2 px-3 py-2 rounded-md transition-all border border-transparent opacity-50 cursor-not-allowed text-xs")}
                                                            disabled
                                                        >
                                                            <span className={getClassNames('text-blue-800 text-xl')}>
                                                                <FacebookFilled />
                                                            </span>
                                                            <span className={getClassNames('text-gray-700')}>Login with Facebook</span>
                                                        </button>
                                                    </div>
                                                </Badge.Ribbon>
                                                <p className="text-gray-400 text-center">
                                                    Don't have any account?{' '}
                                                    <Link to="/signup" className="text-blue-500 hover:underline">
                                                        Sign up
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>)}
                    </ConfigProvider>
                </div>
            </div >

            <div className={getClassNames("rounded-sm  h-screen bg-gradient-to-r hidden lg:block shadow-lg shadow-black from-[#3633C7] to-[#312EB5] w-full")}
                style={{
                    backgroundImage: `url(${SinginImg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >
            </div>
        </div >
    );
};

export default SignIn;
