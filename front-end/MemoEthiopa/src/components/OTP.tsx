import React, { useEffect, useState } from 'react';
import { ConfigProvider, Input, Spin, } from 'antd';
import type { GetProps } from 'antd';
import Ethio_logo from "../assets/MemoEthio_logo_4.png";
import { motion } from "framer-motion"
import { Link, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { ArrowLeftOutlined } from "@ant-design/icons";

type OTPProps = GetProps<typeof Input.OTP>;


const OTP: React.FC = () => {
    const [err, setErr] = useState(false)
    const [loading, setLoading] = useState(false)
    const otp_ready = useSelector((state: RootState) => state.userinfo.otp_ready)
    const navigate = useNavigate()
    console.log(otp_ready);
    const userready = () => {
        if (otp_ready) {
            navigate("/")
            return 0;
        }
        return 1;
    }

    const onInput: OTPProps['onInput'] = (values) => {

        if (values.length == 7) {
            const value = values.join("")
            console.log(value);
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
    return (
        <>
            <Spin fullscreen={true} spinning={loading} />
            <div className='bg-[#1E1E1F] fixed'>
                <Link to={"/"} className='cursor-default'>
                    <img src={Ethio_logo} alt="Memo Ethiopa Logo" onDragStart={e => e.preventDefault()} className='h-20 w-20' />
                </Link>
            </div>
            <div className="flex justify-center items-center  min-h-screen w-full bg-[#1E1E1F] bg-cover bg-no-repeat"
            >
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={BoxVariants}
                    transition={{ duration: 0.8 }}
                    whileInView={{ scale: 1.1 }}
                    className="flex justify-center shadow shadow-[#4b4b4e] md:scale-125 h-[50vh] items-center md:w-2/4 p-6 rounded-4xl bg-[#2D2D2F]"
                >
                    <div className="fixed top-3 z-50 left-4 text-white" title='Back'>
                        <ArrowLeftOutlined className='text-white' />
                    </div>
                    <div className="w-full md:w-2/4 flex flex-col justify-center items-center mr-3">
                        <h2 className='text-2xl m-5 text-white shadow shadow-gary-500' style={{ fontFamily: "Kaushan Script, cursive" }}>OTP Input</h2>
                        <small className='text-white opacity-60 mb-4 text-xs'>OTP send in your email chack it</small>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Input: {
                                        colorBgContainer: "#4b4b4e",
                                        colorText:"#ffff",
                                        fontFamily: "Average",
                                        hoverBorderColor:"#4b4b4e",
                                        activeBorderColor:"#4b4b4e",
                                        colorBorder: `${err ? "#E4080A" : "#4b4b4e"}`,
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

                    <div className="fixed bottom-0 text-xs text-white">
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default OTP;