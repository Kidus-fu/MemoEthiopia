import React, { useState } from "react";
import {  useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
    Button,
    ConfigProvider,
    Input,
    Spin,
    Tooltip,
    theme as antdTheme,
} from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import type { GetProps } from 'antd';
import MemoEthiopLogo from "../../assets/MemoEthio_logo_4.png";
import { useMessage } from "../../components/useMessage";

type OTPProps = GetProps<typeof Input.OTP>;

const OTP: React.FC = () => {
    const theme = useSelector((state: RootState) => state.theam.theme);
    const DeveloperTest = useSelector((state: RootState) => state.developertest.border_test);
    const location = useLocation();
    const email = location.state?.email || "your email";
    const [loading, setLoading] = useState(false);
    const [otpValue, setOtpValue] = useState<string>("");
    const showMessage = useMessage();

    const getClassNames = (base: string) => {
        const border = DeveloperTest ? 'border border-red-700' : '';
        const themeStyle = theme === 'dark' ? ' bg-[#1C1C1C] text-white' : 'bg-[#F3F6FB] text-black';
        return `${base} ${border} ${themeStyle}`;
    };

    const handleOtpChange: OTPProps['onInput'] = (values) => {
        const value = values.join("");
        setOtpValue(value);
    };

    const handleVerifyOtp = () => {
        if (otpValue.length === 6) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                showMessage("error", "Invalid OTP");
            }, 3000);
        } else {
            showMessage("warning", "Please enter a valid 6-digit OTP");
        }
    };

    return (
        <>
            <div className={getClassNames("min-h-screen w-full flex justify-center items-center py-8 sm:px-0")}>
                <div className={getClassNames("p-10 shadow-2xl sm:text-xs rounded-2xl max-w-md w-full")}>
                    <ConfigProvider
                        theme={{
                            algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
                            components: {
                                Input: {
                                    activeBorderColor: "#4B0082",
                                    fontSize: 36,
                                    controlHeightLG: 70,
                                    borderRadius: 16,
                                },
                            },
                        }}
                    >
                        <Spin fullscreen spinning={loading} />
                        <div className="flex justify-end mb-4 ">
                            <Link to={'/'}>
                                <Button type="text" size="small">Skip <ArrowRightOutlined /></Button>
                            </Link>
                        </div>

                        <div className={getClassNames("text-center mb-6")}>
                            <img src={MemoEthiopLogo} alt="MemoEthioLogo" className="h-32 mx-auto" draggable={false} />
                            <h2 className="font-bold text-2xl mt-4">Verify OTP</h2>
                            <p className="mt-2 text-xs">Enter the 6-digit code sent to <span className="text-sky-600 underline">{email}</span></p>
                        </div>

                        <div className="flex flex-col items-center gap-6">
                            <Input.OTP
                                size="large"
                                length={6}
                                disabled={loading}
                                onInput={handleOtpChange}
                                inputMode="numeric"
                                style={{
                                    gap: '12px',
                                    justifyContent: 'center',
                                }}
                                formatter={(value) => value.replace(/\D/g, "")}
                            />

                            <Button
                                size="middle"
                                type="primary"
                                block
                                className="w-1/2 mt-4"
                                onClick={handleVerifyOtp}
                                disabled={loading}
                            >
                                Verify OTP
                            </Button>
                        </div>

                        <div className="text-center mt-8 ">
                            <p>Didn't receive the code?
                                <Tooltip title="Sometimes the email server might throw an error. If you don’t receive the OTP, just press the 'Skip' button at the top.">
                                    <span className="text-sky-600 px-2 cursor-pointer">Learn more</span>
                                </Tooltip>
                            </p>
                        </div>
                    </ConfigProvider>
                </div>
            </div>
        </>
    );
};

export default OTP;
