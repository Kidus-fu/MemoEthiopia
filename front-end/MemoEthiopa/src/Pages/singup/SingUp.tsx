import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Badge, Button, ConfigProvider, Form, Input, Popover, Result, theme as antdTheme } from "antd";
import { Link } from "react-router-dom";
import { BugFilled, BugOutlined, CaretLeftOutlined, CaretRightOutlined, FacebookFilled, GoogleCircleFilled } from "@ant-design/icons";
import { backToClentMode, changeToDeveloperMode } from "../../store/features/Developer_test";
import MemoEthiopaLogo from "../../assets/MemoEthio_logo_4.png"
import SingUpImg from "./singin.png"
import SingUpImg2 from "./MemoEthiop_singin.png"
import { logout } from "../../store/features/users/Userinfo";
import ThemeSelector from "../../components/TheamSlecter";
import { SingupType } from "../type";
import { useSingupFrom } from "../../hooks/useSingupForm";


const SingUp: React.FC = () => {
    const theme = useSelector((state: RootState) => state.theam.theme);
    const DeveloperTest = useSelector((state: RootState) => state.developertest.border_test);
    const dispatch = useDispatch()
    const [SelecteImg, setSelecteImg] = useState(SingUpImg)
    const { SinguponFinish, SinguponFinishFailed, SingupisLoading } = useSingupFrom()
    const HandelBgChange = () => {
        if (SelecteImg == SingUpImg) {
            setSelecteImg(SingUpImg2)
        } else {
            setSelecteImg(SingUpImg)
        }
    }
    const HandelerDeveloperTest = () => {
        dispatch(changeToDeveloperMode())
    }
    const HandelerClient = () => {
        dispatch(backToClentMode())
    }
    useEffect(() => {
        document.title = "MemoEthiopa | Sign Up";
    }, []);

    const loggedIn = useSelector((state: RootState) => state.userinfo.loggedIn)
    const getClassNames = (base: string) => {
        const border = DeveloperTest ? 'border border-red-700' : '';
        const themeStyle = theme === 'dark' ? ' bg-[#1C1C1C] text-white' : 'bg-[#F3F6FB] text-black';
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
                                lineHeight: 2.5,
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
                                <div className={getClassNames("w-full max-w-md p-4 sm:px-8")}>
                                    <h3 className={getClassNames("text-xl font-semibold text-center ")}>Create an Account</h3>
                                    <div className={getClassNames("text-center mt-2 mb-2")}>
                                        <small className={getClassNames("")}>
                                            How do I get started?{" "}
                                            <span className="text-blue-500 hover:underline cursor-pointer"                                            >
                                                Learn more
                                            </span>
                                        </small>
                                    </div>
                                    <div className={getClassNames("flex justify-center items-center gap-4 mt-6 mb-4 flex-wrap")}>
                                        <div className="flex flex-col items-center">
                                            <Badge.Ribbon text="Comming soon" >
                                                <button
                                                    className={getClassNames("flex items-center gap-2 px-4 py-2 rounded-md transition-all border border-transparent opacity-50 cursor-not-allowed")}
                                                    disabled
                                                >
                                                    <span className={getClassNames('text-red-700 text-2xl')}>
                                                        <GoogleCircleFilled />
                                                    </span>
                                                    <span className={getClassNames('text-gray-700')}>Login with Google</span>
                                                </button>
                                            </Badge.Ribbon>
                                        </div>
                                        <Badge.Ribbon text="Comming soon" >
                                            <div className="flex flex-col items-center">
                                                <button
                                                    className={getClassNames("flex items-center gap-2 px-3 py-2 rounded-md transition-all border border-transparent opacity-50 cursor-not-allowed")}
                                                    disabled
                                                >
                                                    <span className={getClassNames('text-blue-800 text-2xl')}>
                                                        <FacebookFilled />
                                                    </span>
                                                    <span className={getClassNames('text-gray-700')}>Login with Facebook</span>
                                                </button>
                                            </div>
                                        </Badge.Ribbon>

                                    </div>
                                    <div className={getClassNames("flex items-center my-4")}>
                                        <div className={getClassNames("flex-grow border-t border-gray-300")}></div>
                                        <span className={getClassNames("mx-4 text-gray-500 font-medium text-sm")}>or contine with email</span>
                                        <div className={getClassNames("flex-grow border-t border-gray-300")}></div>
                                    </div>
                                    <div className="flex justify-center items-center w-full ">
                                        <Form
                                            name="signup"
                                            layout="vertical"
                                            onFinish={SinguponFinish}
                                            onFinishFailed={SinguponFinishFailed}
                                            autoComplete="off"
                                            disabled={SingupisLoading}
                                        >
                                            <Form.Item<SingupType> name="username" rules={[{ required: true, message: 'Please enter your username' }]}>
                                                <Input placeholder="Username" />
                                            </Form.Item>

                                            <Form.Item<SingupType> name="email" rules={[{ type: 'email', required: true, message: 'Enter a valid email' }]}>
                                                <Input placeholder="example@email.com" />
                                            </Form.Item>

                                            <div className="flex gap-4">
                                                <Form.Item<SingupType> name="frist_name" className="w-1/2" rules={[{ required: true, message: 'Enter first name' }]}>
                                                    <Input placeholder="First Name" />
                                                </Form.Item>
                                                <Form.Item<SingupType> name="last_name" className="w-1/2" rules={[{ required: true, message: 'Enter last name' }]}>
                                                    <Input placeholder="Last Name" />
                                                </Form.Item>
                                            </div>

                                            <Form.Item<SingupType> name="password" rules={[{ required: true, message: 'Enter your password' }]}>
                                                <Input.Password placeholder="Password" />
                                            </Form.Item>
                                            <Form.Item<SingupType> name="configpassword" dependencies={['password']} rules={[{
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
                                                <Button type="primary" htmlType="submit" block loading={SingupisLoading}>
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
                                    </div>
                                    <div className="fixed bottom-4 left-4">
                                        <ThemeSelector />
                                    </div>
                                </div>)}
                    </ConfigProvider>
                </div>
            </div >

            <div className={getClassNames("rounded-sm  hidden lg:block shadow-lg w-full")}
                style={{
                    backgroundImage: `url(${SelecteImg})`,
                }}
            >
                <div className="fixed bottom-3 right-72 ">
                    <button onClick={HandelBgChange}><CaretLeftOutlined /></button>
                    <button onClick={HandelBgChange}><CaretRightOutlined /></button>
                </div>
            </div>

            <Popover title="1 Click to Off, Double Click to On">
                <button
                    className={getClassNames("fixed bottom-0  text-xl border p-4 right-0 m-2 rounded-full border-red-800 ")}
                    onDoubleClick={HandelerDeveloperTest}
                    onClick={HandelerClient}
                    onTouchStartCapture={HandelerDeveloperTest}
                    onTouchEnd={HandelerClient}
                >
                    {DeveloperTest ? <BugFilled /> : <BugOutlined />}
                </button>
            </Popover>
        </div >
    );
};

export default SingUp