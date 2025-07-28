import React from 'react';
import { Link } from 'react-router-dom';

const SettingNavber: React.FC = () => {
    return (
        <>
            <footer className="flex flex-col space-y-10 justify-center m-10 mt-20">
                <nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium text-sm">
                    <Link to={"/"}>Home</Link>
                    <Link to={"/blog"} target='_blank' >Blog</Link>
                    <a className="" href="#">Services</a>
                    <a className="" href="#">Media</a>
                    <a className="" href="#">Gallery</a>
                    <a className="" href="#">Contact</a>
                </nav>

                <div className="flex justify-center space-x-5 text-xs">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/linkedin-2.png" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" />
                    </a>
                    <a href="https://messenger.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/facebook-messenger--v2.png" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/twitter.png" />
                    </a>
                </div>
                <p className="text-center text-sm text-gray-700 font-medium">&copy; 2025 MemoEthiopia. All rights reservered.</p>
            </footer>
        </>
    );
};

export default SettingNavber;