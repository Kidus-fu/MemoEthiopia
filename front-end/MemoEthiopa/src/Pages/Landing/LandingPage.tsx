import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import LandingNavBar from '../../components/Landing/LandingNavBer';
import ThemeSelector from '../../components/TheamSlecter';
import logo from '../../assets/MemoEthio_logo_4.png';
import { Popover, Spin } from 'antd';
import LandingPageCarousel from '../../components/Landing/Carousel';
import Services from '../../components/Landing/Services';
import { BugFilled, BugOutlined } from '@ant-design/icons';
import { backToClentMode, changeToDeveloperMode } from '../../store/features/Developer_test';
import Pricing from '../../components/Landing/Pricing';
import Footer from '../../components/Landing/Footer';
import FAQ from '../../components/Landing/FQA';

const LandingPage: React.FC = () => {
    const theme = useSelector((state: RootState) => state.theam.theme);
    const [loading, setLoading] = React.useState(true);
    const DeveloperTest = useSelector((state: RootState) => state.developertest.border_test);
    const dispatch = useDispatch()

    const getClassNames = (base: string) => {
        const border = DeveloperTest ? 'border border-red-700' : '';
        const themeStyle = theme === 'dark'
            ? 'bg-[#272727] text-white'
            : 'bg-[#f8f9fa]  text-black';
        return `${base} ${border} ${themeStyle}`;
    };
    useEffect(() => {
        document.title = 'Memo Ethiopia | Landing Page';
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Simulate loading for 2 seconds

        return () => clearTimeout(timer);
    }, []);
    const HandelerDeveloperTest = () => {
        dispatch(changeToDeveloperMode())
    }
    const HandelerClient = () => {
        dispatch(backToClentMode())
    }

    useEffect(() => {
        document.body.style.overflow = loading ? 'hidden' : 'auto';
    }, [loading]);

    return (
        <>
            {loading ? (
                <div className={getClassNames('flex items-center justify-center h-screen transition-all duration-300 ease-in ')}>
                    <div className="flex flex-col items-center justify-center p-6 rounded-xl  animate-fadeIn space-y-4">
                        <img
                            src={logo}
                            alt="Loading..."
                            className="h-72 w-72 animate-scaleUp"
                        />
                        <Spin
                            size="large"
                            style={{
                                fontSize: '36px',
                                color: theme === 'dark' ? '#ffffffcc' : '#000000cc',
                            }}
                        />
                        <p className="text-sm text-gray-500 animate-pulse">
                            Loading, please wait...
                        </p>
                    </div>
                    <small className={getClassNames("fixed bottom-0")}>@2025 provide Memo Ethiopia</small>
                </div>
            ) : (
                <>
                    <LandingNavBar />
                    <div className={getClassNames("min-h-screen flex flex-col")}>
                        <ThemeSelector />
                        <div className={getClassNames("")}>
                            <LandingPageCarousel />
                        </div>
                        <div className={getClassNames("")}>
                            <Services />
                        </div>
                        <div className={getClassNames("")}>
                            <Pricing />
                        </div>
                        <div className={getClassNames("")}>
                            <FAQ />
                        </div>
                        <Footer />

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
                    </div>
                </>
            )}
        </>
    );
};

export default LandingPage;
