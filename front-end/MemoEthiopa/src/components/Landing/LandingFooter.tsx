import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Ethio_logo from "../../assets/MemoEthio_logo_4.png";
import { RootState } from '../../store/store';

const LandingFooter: React.FC = () => {
    const DeveloperTest: boolean = useSelector((state: RootState) => state.developertest.border_test)
    const getClassNames = (baseClass: string) => `${baseClass} ${DeveloperTest ? 'border border-red-700' : ''}`;
    return (
        <footer className={getClassNames("relative w-full text-white ")}>
            <div className={getClassNames("mx-auto w-full max-w-7xl px-8")}>
                <div className={getClassNames("mx-auto grid w-full grid-cols-1 gap-8 py-12 md:grid-cols-1 lg:grid-cols-3")}>
                    <ul>
                        <p className={getClassNames("font-sans antialiased text-base text-current mb-2 font-semibold opacity-50")}>Company</p>
                        <li>
                            <a href="#" className={getClassNames("font-sans antialiased text-base text-current py-1 hover:text-primary")}>About us</a>
                        </li>
                        <li>
                            <a href="#" className={getClassNames("font-sans antialiased text-base text-current py-1 hover:text-primary")}>Careers</a>
                        </li>
                        <li>
                            <a href="#" className={getClassNames("font-sans antialiased text-base text-current py-1 hover:text-primary")}>Press</a>
                        </li>
                        <li>
                            <a href="#" className={getClassNames("font-sans antialiased text-base text-current py-1 hover:text-primary")}>News</a>
                        </li>
                    </ul>
                    <ul>
                        <p className={getClassNames("font-sans antialiased text-base text-current mb-2 font-semibold opacity-50")}>Help Center</p>
                        <li>
                            <a href="#" className={getClassNames("font-sans antialiased text-base text-current py-1 hover:text-primary")}>Discord</a>
                        </li>
                        <li>
                            <a href="#" className={getClassNames("font-sans antialiased text-base text-current py-1 hover:text-primary")}>Twitter</a>
                        </li>
                        <li>
                            <a href="#" className={getClassNames("font-sans antialiased text-base text-current py-1 hover:text-primary")}>GitHub</a>
                        </li>
                        <li>
                            <a href="#" className={getClassNames("font-sans antialiased text-base text-current py-1 hover:text-primary")}>Contact Us</a>
                        </li>
                    </ul>
                    <ul>
                        <p className={getClassNames("font-sans antialiased text-base text-current mb-2 font-semibold opacity-50")}>Resources</p>
                        <li>
                            <a href="#" className={getClassNames("font-sans antialiased text-base text-current py-1 hover:text-primary")}>Blog</a>
                        </li>
                        <li>
                            <a href="#" className={getClassNames("font-sans antialiased text-base text-current py-1 hover:text-primary")}>Newsletter</a>
                        </li>
                        <li>
                            <a href="#" className={getClassNames("font-sans antialiased text-base text-current py-1 hover:text-primary")}>Developer options</a>
                        </li>
                        <li>
                            <a href="#" className={getClassNames("font-sans antialiased text-base text-current py-1 hover:text-primary")}>Affiliate Program</a>
                        </li>
                    </ul>
                </div>
                <div className={getClassNames("mt-10 flex w-full flex-col items-center justify-center gap-4 border-t border-stone-200 py-4 md:flex-row md:justify-between")}>
                    <small className={getClassNames("font-sans antialiased text-sm text-current text-center")}>
                        © 2025 Kidus. All Rights Reserved.
                    </small>
                    <div className={getClassNames("flex gap-1 sm:justify-center")}>
                        <Link to={"/"} className={getClassNames("cursor-default")}>
                            <img
                                src={Ethio_logo}
                                alt="MemoEthio Logo"
                                className={getClassNames("h-14 w-14")}
                                onDragStart={(e) => e.preventDefault()}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default LandingFooter;