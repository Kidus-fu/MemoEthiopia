import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CloseOutlined, UpOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import img_400 from "../assets/404.png";
import Ethio_logo from "../assets/MemoEthio_logo_4.png";
import { usePathSuggestion } from '../hooks/E404_suggestion';

const Error404: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [suggestionClosed, setSuggestionClosed] = useState(false);

    const validRoutes = ['/singup', '/singin', '/otp', '/dashboard'];
    const { getSuggestion } = usePathSuggestion(validRoutes);
    const userPath = useLocation().pathname;
    const suggestion = getSuggestion(userPath);

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen bg-gray-900'>
                <div className="flex flex-col items-center">
                    <Spin size="large" className="mb-4" />
                    <p className="text-gray-300 text-lg">Loading, please wait...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen  text-white relative px-4 py-6 flex flex-col items-center justify-center">
            {/* Logo */}
            <Link to="/" className="absolute top-4 left-4">
                <img src={Ethio_logo} alt="Logo" className="h-16 w-16" onDragStart={e => e.preventDefault()} />
            </Link>

            {/* 404 Image & Text */}
            <div className="text-center max-w-xl">
                <img src={img_400} alt="404" className="mx-auto max-w-xs mb-4" onDragStart={e => e.preventDefault()} />
                <h1 className="text-5xl font-bold mb-2">404</h1>
                <p className="text-lg text-gray-400 mb-6">Oops! The page you're looking for doesn't exist.</p>
                <Link to="/" className="text-blue-500 underline text-lg hover:text-blue-300">Back to Home</Link>
            </div>

            {/* Suggestion Box */}
            <div className={`fixed bottom-6 right-4 max-w-md w-full transition-all duration-300 ${suggestionClosed ? 'hidden' : ''}`}>
                <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
                        <h2 className="text-lg font-semibold">Suggested Path</h2>
                        <button
                            onClick={() => setSuggestionClosed(true)}
                            className="p-1 rounded hover:text-gray-300 hover:bg-gray-700"
                        >
                            <CloseOutlined />
                        </button>
                    </div>
                    <div className="p-4 space-y-3 max-h-60 overflow-y-auto custom-scroll">
                        {suggestion ? (
                            <div>
                                <p className="text-sm">
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
                            <div className="flex flex-wrap gap-2 mt-2">
                                {validRoutes.filter(path => path !== suggestion).map(path => (
                                    <Link
                                        key={path}
                                        to={path}
                                        className="px-3 py-1 border border-gray-700 rounded-lg text-sm hover:underline"
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
                <div className="fixed bottom-6 right-4 bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-2xl flex items-center gap-2 cursor-pointer hover:bg-gray-700 transition"
                    onClick={() => setSuggestionClosed(false)}
                >
                    Show Suggestions <UpOutlined className="text-blue-500" />
                </div>
            )}
        </div>
    );
};

export default Error404;
