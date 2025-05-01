import React, { useEffect, useState } from 'react';
import { ConfigProvider, Input, Popover, Spin, } from 'antd';
import type { GetProps } from 'antd';
import Ethio_logo from "../assets/MemoEthio_logo_4.png";
import { motion } from "framer-motion"
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { ArrowLeftOutlined, BugFilled, BugOutlined } from "@ant-design/icons";
import { backToClentMode, changeToDeveloperMode } from '../store/Developer_test';
type OTPProps = GetProps<typeof Input.OTP>;


const OTP: React.FC = () => {
    const [err, setErr] = useState(false)
    const [loading, setLoading] = useState(false)
    const otp_ready = useSelector((state: RootState) => state.userinfo.otp_ready)
    const navigate = useNavigate()
    const location = useLocation()
    const email = location.state?.email || null; 
    const DeveloperTest: boolean = useSelector((state: RootState) => state.developertest.border_test)
    const dispatch = useDispatch()
    const userready = () => {
        if (otp_ready) {
            navigate("/")
            return 0;
        }
        return 1;
    }

    const onInput: OTPProps['onInput'] = (values) => {

        if (values.length == 6) {
            const value = values.join("")
            console.log({"value": value, "email": email});
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                setErr(true)
            }, 3000)
        } else {
            setErr(false)
        }
    };

    const sharedProps: OTPProps = {
        onInput,
    };
    const BoxVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
    };
    useEffect(() => {
        document.title = "Memo Ethiopa | OTP "
        userready()
    })
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue = ''; // This is required for Chrome to show the prompt
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    // Helper function to add Developer_test class if needed
    const getClassNames = (baseClass: string) => `${baseClass} ${DeveloperTest ? 'border border-red-700' : ''}`;

    const HandelerDeveloperTest = () => {
        dispatch(changeToDeveloperMode())
    }
    const HandelerClient = () => {
        dispatch(backToClentMode())
    }

    return (
        <>
            <Spin fullscreen={true} spinning={loading} />
            <div className={getClassNames('bg-[#1E1E1F] fixed')}>
                <Link to={"/"} className={getClassNames('cursor-default')}>
                    <img src={Ethio_logo} alt="Memo Ethiopa Logo" onDragStart={e => e.preventDefault()} className={getClassNames('h-20 w-20')} />
                </Link>
            </div>
            <div className={getClassNames("flex justify-center items-center  min-h-screen w-full bg-[#1E1E1F] bg-cover bg-no-repeat")}
            >
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={BoxVariants}
                    transition={{ duration: 0.8 }}
                    whileInView={{ scale: 1.1 }}
                    className={getClassNames("flex justify-center shadow shadow-[#4b4b4e] md:scale-125 h-[50vh] items-center md:w-2/4 p-6 rounded-4xl bg-[#2D2D2F]")}
                >
                    <div className={getClassNames("fixed top-3 z-50 p-1 left-4 text-white")} title='Back'>
                        <Link to={"/singup"} className={getClassNames('cursor-default')}>
                        <ArrowLeftOutlined className={getClassNames('text-white p-1')} />
                        </Link>
                    </div>
                    <div className={getClassNames("w-full md:w-2/4 p-1 flex flex-col justify-center items-center mr-3")}>
                        <h2 className={getClassNames('text-2xl m-5 text-white shadow p-1 shadow-gary-500')} style={{ fontFamily: "Kaushan Script, cursive" }}>OTP Input</h2>
                        <small className={getClassNames('text-white opacity-60 p-1 mb-4 text-xs')}>OTP send in your email chack it</small>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Input: {
                                        colorBgContainer: "#4b4b4e",
                                        colorText: "#ffff",
                                        fontFamily: "Average",
                                        hoverBorderColor: "#4b4b4e",
                                        activeBorderColor: "#4b4b4e",
                                        colorBorder: `${err || DeveloperTest ? "#E4080A" : "#4b4b4e"}`,
                                    }
                                }
                            }}
                        >
                            <Input.OTP
                                size="large"
                                length={6}
                                disabled={loading}
                                {...sharedProps}
                                inputMode="numeric"
                                formatter={(value) => value.replace(/\D/g, "")} // Removes non-numeric characters
                            />
                        </ConfigProvider>
                    </div>

                    <div className={getClassNames("fixed bottom-0 text-xs text-white")}>
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

export default OTP;