import React from 'react';
import BlogNavber from '../../components/Blog/BlogNavber';
import BlogFooter from '../../components/Blog/BlogFooter';

const BlogContactus: React.FC = () => {
    return (
        <>
            <BlogNavber />
            <section id="contact" className="relative py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
                <div className="container mx-auto px-4 max-w-7xl">
                    {/* Heading */}
                    <div className="text-center mb-12 max-w-2xl mx-auto">
                        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">Contact</p>
                        <h2 className="text-3xl sm:text-5xl font-bold mt-2">Get in Touch</h2>
                        <p className="mt-4 text-gray-600">Have a question, collaboration idea, or just want to say hello? Reach out anytime!</p>
                    </div>

                    {/* Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            {/* Address */}
                            <div className="flex items-start space-x-4">
                                <div className="flex items-center justify-center w-12 h-12  bg-blue-600 text-white">
                                    📍
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Address</h3>
                                    <p className="text-gray-600">123 Example Street, Addis Ababa, Ethiopia</p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start space-x-4">
                                <div className="flex items-center justify-center w-12 h-12  bg-blue-600 text-white">
                                    📞
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Contact</h3>
                                    <p className="text-gray-600">+251 900 000 000</p>
                                    <p className="text-gray-600">example@gmail.com</p>
                                </div>
                            </div>

                            {/* Hours */}
                            <div className="flex items-start space-x-4">
                                <div className="flex items-center justify-center w-12 h-12  bg-blue-600 text-white">
                                    🕒
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Working Hours</h3>
                                    <p className="text-gray-600">Mon - Fri: 8:00 AM - 5:00 PM</p>
                                    <p className="text-gray-600">Sat: 8:00 AM - 12:00 PM</p>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
                            <h3 className="text-2xl font-bold text-gray-800">Send a Message</h3>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input id="name" type="text" placeholder="Your name" className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input id="email" type="email" placeholder="Your email" className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                    <textarea id="message" rows={4} placeholder="Your message..." className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
                                </div>
                                <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-md shadow">
                                    Send Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Blurs */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 opacity-30 rounded-full filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-200 opacity-30 rounded-full filter blur-3xl animate-pulse"></div>
            </section>
            <BlogFooter />
        </>
    );
};

export default BlogContactus;