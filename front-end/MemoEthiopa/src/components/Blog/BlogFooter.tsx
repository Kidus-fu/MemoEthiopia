import React from 'react';
import { Link } from 'react-router-dom';

const BlogFooter: React.FC = () => {
    return (
        <footer className="bg-[#1f1f1f] text-gray-300 py-8">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
                {/* Logo */}
                <div>
                    <h3
                        className="text-white text-2xl font-bold font-[Cinzel Decorative] text-center md:text-left"
                    >
                        MemoEthiopia
                    </h3>
                </div>

                {/* Navigation */}
                <div className="flex flex-wrap gap-4 text-sm justify-center">
                    <Link to="/blog" className="hover:text-white transition">Home</Link>
                    <Link to="/blog/aboutus" className="hover:text-white transition">About Us</Link>
                    <Link to="/blog/contactus" className="hover:text-white transition">Contact Us</Link>
                </div>

                {/* Copyright */}
                <div className="text-xs text-gray-400 text-center md:text-right">
                    © 2025 MemoEthiopia. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default BlogFooter;
