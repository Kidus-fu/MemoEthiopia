import React from "react";
import { GithubFilled, GlobalOutlined, LinkedinFilled } from "@ant-design/icons";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store'
import { Link } from "react-router-dom";

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
        <footer className={getClassNames("relative py-10  ")} id="footer">
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
                        <li><Link to={"/"} className={getClassNames("")}>Home</Link></li> 
                        <li><Link to={"/aboutus"} className={getClassNames("")}> About </Link></li>
                        <li><Link to={"/pricing"} className={getClassNames("")}> Pricing </Link></li>
                        <li><Link to={"/signin"} className={getClassNames("")}>Login</Link></li>
                        <li><Link to={"/signup"} className={getClassNames("")}>Get Started</Link></li>
                    </ul>
                </div>

                {/* Contact & Socials */}
                <div>
                    <h3 className={getClassNames("text-lg font-semibold  mb-3")}>Connect</h3>
                    <div className={getClassNames("flex space-x-4 mt-2")}>
                        <a href="https://github.com/Kidus-fu/MemoEthiopia" target="_blank" rel="noopener noreferrer" className="text-red-400">
                            <GithubFilled />
                        </a>
                        <a href="https://www.linkedin.com/in/kidus-surafel/" target="_blank" rel="noopener noreferrer" className="text-blue-800">
                            <LinkedinFilled />
                        </a>
                        <a href="https://www.memoethiopia.pro.et/" className="text-blue-500">
                            <GlobalOutlined />
                        </a>
                    </div>
                    <p className={getClassNames("text-xs mt-4")}>© {new Date().getFullYear()} MemoEthiopia. All rights reserved.</p>
                </div>
            </div>
            <div
                className={getClassNames(`absolute top-0 right-0 z-0 h-1/2 w-1/6 blur-3xl ${theme === 'dark' ? "bg-gray-800" : "bg-black/10"} blur-2xl`)}
            />
            <div
                className={getClassNames(`absolute bottom-0 left-0 z-0 h-1/2 w-1/6 blur-3xl ${theme === 'dark' ? "bg-gray-800" : "bg-black/10"} blur-2xl`)}
            />
        </footer>
    );
};

export default Footer;
