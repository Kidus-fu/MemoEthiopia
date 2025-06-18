import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import MemoEthiopaLogo from "../../assets/MemoEthio_logo_4.png"
import ChatBot from '../../components/Chatbot';
import ThemeSelector from '../../components/TheamSlecter';
import { logout } from '../../store/features/users/Userinfo';

const Home: React.FC = () => {
    const theme = useSelector((state: RootState) => state.theam.theme);
    const DeveloperTest = useSelector((state: RootState) => state.developertest.border_test);
    const dispatch = useDispatch()
    const getClassNames = (base: string) => {
        const border = DeveloperTest ? 'border border-red-700' : '';
        const themeStyle = theme === 'dark' ? ' bg-[#1C1C1C] text-white' : 'bg-[#F3F6FB] text-black';
        return `${base} ${border} ${themeStyle}`;
    };
    const handelLogout = () => {
        dispatch(logout())
        window.location.href = "/"
    }
    return (
        <>
            <div className={getClassNames("fixed")}>
                <img src={MemoEthiopaLogo} className='h-20' alt="" />
            </div>
            <div className={getClassNames("flex items-center justify-center h-screen ")}>
                <div className={getClassNames("shadow-xl rounded-2xl p-8 text-center")}>
                    <h1 className={getClassNames("text-3xl font-bold mb-4 ")}>Welcome back 👋</h1>
                    <small>Coming soon</small>
                    <br />
                    <button
                        className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition duration-300"
                        onClick={() => handelLogout()}
                    >
                        Logout
                    </button>
                </div>
                <div className="bg-transparent fixed bottom-0 left-0 right-0 z-10 flex justify-between items-center p-4">
                    <ThemeSelector />
                </div>
                <ChatBot />
            </div>
        </>
    );
};

export default Home;