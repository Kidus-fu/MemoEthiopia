import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import MemoEthiopaLogo from "../../assets/MemoEthio_logo_4.png"
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, theme as antdTheme } from 'antd';

const Home: React.FC = () => {
    const theme = useSelector((state: RootState) => state.theam.theme);
    const DeveloperTest = useSelector((state: RootState) => state.developertest.border_test);
    const getClassNames = (base: string) => {
        const border = DeveloperTest ? 'border border-red-700' : '';
        const themeStyle = theme === 'dark' ? ' bg-[#1C1C1C] text-white' : 'bg-[#F3F6FB] text-black';
        return `${base} ${border} ${themeStyle}`;
    };
    return (
        <>
            <ConfigProvider theme={{
                algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
                components: {},
                token: {
                    colorBgMask: "rgb(1, 1, 1,0.7)"
                }
            }}>
                <div className={getClassNames("flex h-screen")}>
                    <aside className={getClassNames("w-64 shadow-lg flex flex-col justify-between p-3")}>
                        <div>
                            <div className={getClassNames("p-4 text-xl font-bold flex justify-between border-b border-gray-600")}>
                                <img src={MemoEthiopaLogo} alt="" className={getClassNames("w-18 h-18 m-2 ")} />
                                <span><SearchOutlined /></span>
                            </div>
                            <Button block={true} className=''><PlusOutlined /> New Note</Button>
                            <ul className="p-4 space-y-3">
                                <li><a href="#" className={getClassNames("block text-gray-700 hover:text-blue-600")}>Dashboard</a></li>
                                <li><a href="#" className={getClassNames("block text-gray-700 hover:text-blue-600")}>Projects</a></li>
                                <li><a href="#" className={getClassNames("block text-gray-700 hover:text-blue-600")}>Team</a></li>
                                <li><a href="#" className={getClassNames("block text-gray-700 hover:text-blue-600")}>Messages</a></li>
                            </ul>
                        </div>

                        <div className="p-4 space-y-2">
                            <button className={getClassNames("w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700")}>
                                Settings
                            </button>
                            <button className={getClassNames("w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600")}>
                                Logout
                            </button>
                        </div>
                    </aside>

                    <main className={getClassNames("flex-1 overflow-y-auto p-6")}>
                        <h1 className={getClassNames("text-2xl font-semibold mb-4")}>Welcome, Panda 👋</h1>

                        <div className="space-y-4">
                            <div className={getClassNames("p-4  rounded shadow")}>User Info 1</div>
                            <div className={getClassNames("p-4  rounded shadow")}>User Info 2</div>
                            <div className={getClassNames("p-4  rounded shadow")}>User Info 3</div>
                            <div className={getClassNames("p-4  rounded shadow")}>User Info 4</div>
                            <div className={getClassNames("p-4  rounded shadow")}>User Info 5</div>
                            <div className={getClassNames("p-4  rounded shadow")}>User Info 6</div>
                            <div className={getClassNames("p-4  rounded shadow")}>User Info 7</div>
                            <div className={getClassNames("p-4  rounded shadow")}>User Info 8</div>
                            <div className={getClassNames("p-4  rounded shadow")}>User Info 8</div>
                            <div className={getClassNames("p-4  rounded shadow")}>User Info 8</div>
                            <div className={getClassNames("p-4  rounded shadow")}>User Info 8</div>
                            <div className={getClassNames("p-4  rounded shadow")}>User Info 8</div>
                            <div className={getClassNames("p-4  rounded shadow")}>User Info 8</div>
                            <div className={getClassNames("p-4  rounded shadow")}>User Info 8</div>
                            <div className={getClassNames("p-4  rounded shadow")}>User Info 8</div>
                            <div className={getClassNames("p-4  rounded shadow")}>User Info 8</div>
                            <div className={getClassNames("p-4  rounded shadow")}>User Info 8</div>
                            <div className={getClassNames("p-4  rounded shadow")}>User Info 8</div>
                            <div className={getClassNames("p-4  rounded shadow")}>User Info 8</div>
                            <div className={getClassNames("p-4  rounded shadow")}>User Info 8</div>
                            <div className={getClassNames("p-4  rounded shadow")}>User Info 8</div>
                        </div>
                    </main>
                </div>
            </ConfigProvider>
        </>
    );
};

export default Home;