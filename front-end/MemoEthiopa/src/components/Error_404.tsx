import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CloseOutlined, UpOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import img_400 from "../assets/404.png";
import Ethio_logo from "../assets/MemoEthio_logo_4.png";
import { usePathSuggestion } from '../hooks/E404_suggestion';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Error404: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [suggestionClosed, setSuggestionClosed] = useState(false);
    const theme = useSelector((state: RootState) => state.theam.theme);
    const DeveloperTest = useSelector((state: RootState) => state.developertest.border_test);
    const validRoutes = ['/signup', '/signin', '/otp_verification', '/developerOptions',"/feed",'/upgrade'];
    const { getSuggestion } = usePathSuggestion(validRoutes);
    const userPath = useLocation().pathname;
    const suggestion = getSuggestion(userPath);

    const getClassNames = (base: string) => {
        const border = DeveloperTest ? 'border border-red-700' : '';
        const themeStyle = theme === 'dark' ? ' bg-[#1C1C1C] text-white' : 'bg-[#F3F6FB] text-black';
        return `${base} ${border} ${themeStyle}`;
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className={getClassNames('flex justify-center items-center h-screen')}>
                <div className="flex flex-col items-center">
                    <Spin size="large" className="mb-4" />
                    <p className="text-gray-300 text-lg">Loading, please wait...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className={getClassNames("min-h-screen   relative px-4 py-6 flex flex-col items-center justify-center")}>
                {/* Logo */}
                <Link to="/" className="absolute top-4 left-4">
                    <img src={Ethio_logo} alt="Logo" className="h-16 w-16" onDragStart={e => e.preventDefault()} />
                </Link>

                {/* 404 Image & Text */}
                <div className="text-center max-w-xl sm:text-xs">
                    <img src={img_400} alt="404" className="mx-auto max-w-xs mb-4" onDragStart={e => e.preventDefault()} />
                    <h1 className="text-5xl font-bold mb-2">404</h1>
                    <small className="text-red-600 mb-4">Error</small>
                    <p className="text-sm text-red-500 mb-6">Oops! The page you're looking for doesn't exist.</p>
                    <Link to="/" className="text-blue-500 underline text-md hover:text-blue-300">Back to Home</Link>
                </div>

                {/* Suggestion Box */}
                <div className={getClassNames(`fixed bottom-0 right-0 text-white  md:bottom-2 md:right-2  md:w-2/6  max-w-md w-full transition-all duration-300 ${suggestionClosed ? 'hidden' : ''}`)}>
                    <div className="bg-gray-800 border rounded-none border-gray-700 md:rounded-lg shadow-lg">
                        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
                            <h2 className="sm:text-sm font-semibold">Suggested Path</h2>
                            <button
                                onClick={() => setSuggestionClosed(true)}
                                className="p-1 sm:text-xs rounded hover:text-gray-300 hover:bg-gray-700"
                            >
                                <CloseOutlined />
                            </button>
                        </div>
                        <div className="p-4 space-y-3 max-h-60 overflow-y-auto custom-scroll sm:text-sm">
                            {suggestion ? (
                                <div>
                                    <p className="sm:text-xs">
                                        Did you mean{' '}
                                        <Link to={suggestion} className="text-sky-400 underline">
                                            {suggestion}
                                        </Link>
                                        ?
                                    </p>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">No similar suggestions found.</p>
                            )}
                            <div>
                                <small className="text-gray-400">Other valid paths:</small>
                                <div className="flex flex-wrap gap-2 mt-2 ">
                                    {validRoutes.filter(path => path !== suggestion).map(path => (
                                        <Link
                                            key={path}
                                            to={path}
                                            className="px-3 py-1 border border-gray-700 rounded-lg sm:text-xs hover:underline"
                                        >
                                            {path}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reopen Suggestion Button */}
                {suggestionClosed && (
                    <div className="fixed bottom-6 right-4 bg-gray-800 border border-gray-700 text-white px-3 py-2 sm:text-xs rounded-2xl flex items-center gap-2 cursor-pointer hover:bg-gray-700 transition"
                        onClick={() => setSuggestionClosed(false)}
                    >
                        Show Suggestions <UpOutlined className="text-blue-500" />
                    </div>
                )}
            </div>
            <div
                className={getClassNames(`absolute bottom-0  left-0 z-0 h-1/2 w-1/4 blur-3xl ${theme === 'dark' ? "bg-gray-800" : "bg-black/10"} blur-2xl`)}
            />
            <div
                className={getClassNames(`absolute top-0  right-0 z-0 h-1/5 w-1/4 blur-3xl ${theme === 'dark' ? "bg-gray-800" : "bg-black/10"} blur-2xl`)}
            />
        </>
    );
};

export default Error404;
