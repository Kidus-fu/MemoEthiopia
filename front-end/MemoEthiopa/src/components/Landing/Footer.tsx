import React from "react";
import { GithubFilled, GlobalOutlined, LinkedinFilled } from "@ant-design/icons";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store'

const Footer: React.FC = () => {
    const theme = useSelector((state: RootState) => state.theam.theme);
    const DeveloperTest = useSelector((state: RootState) => state.developertest.border_test);

    const getClassNames = (base: string) => {
        const border = DeveloperTest ? 'border border-red-700' : '';
        const themeStyle = theme === 'dark'
            ? 'bg-[#1C1C1C] text-white p-2'
            : 'bg-[#F3F6FB] text-black p-2';
        return `${base} ${border} ${themeStyle}`;
    };
    return (
        <footer className={getClassNames("py-10 ")} id="footer">
            <div className={getClassNames(`max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-8 border-t ${theme === "dark" ? "border-gray-800" : "border-gray-300"}`)}>

                {/* Logo & Mission */}
                <div>
                    <h2 className={getClassNames("text-xl font-bold ")}>MemoEthiopia</h2>
                    <p className={getClassNames("mt-2 text-sm ")}>
                        Your AI-powered memory assistant. Built in Ethiopia with ❤️ to help you stay organized, smart, and stress-free.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className={getClassNames("text-lg font-semibold  mb-3")}>Quick Links</h3>
                    <ul className={getClassNames("space-y-2 text-sm ")}>
                        <li><a href="#" className={getClassNames("")}>Home</a></li>
                        <li><a href="#" className={getClassNames("")}>Features</a></li>
                        <li><a href="#" className={getClassNames("")}>Pricing</a></li>
                        <li><a href="#" className={getClassNames("")}>Login</a></li>
                        <li><a href="#" className={getClassNames("")}>Get Started</a></li>
                    </ul>
                </div>

                {/* Contact & Socials */}
                <div>
                    <h3 className={getClassNames("text-lg font-semibold  mb-3")}>Connect</h3>
                    <div className={getClassNames("flex space-x-4 mt-2")}>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-red-400">
                            <GithubFilled />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-800">
                            <LinkedinFilled />
                        </a>
                        <a href="#" className="text-blue-500">
                            <GlobalOutlined />
                        </a>
                    </div>
                    <p className={getClassNames("text-xs mt-4")}>© {new Date().getFullYear()} MemoEthiopia. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
