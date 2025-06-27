import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store'
const ContactUs: React.FC = () => {
    const theme = useSelector((state: RootState) => state.theam.theme);
    const DeveloperTest = useSelector((state: RootState) => state.developertest.border_test);

    const getClassNames = (base: string) => {
        const border = DeveloperTest ? 'border border-red-700' : '';
        const themeStyle = theme === 'dark'
            ? 'bg-[#1C1C1C] text-white '
            : 'bg-[#F3F6FB] text-black ';
        return `${base} ${border} ${themeStyle}`;
    };
    return (
        <section className={getClassNames(`relative mt-1`)} id="contact">
            <div className={getClassNames("mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20 ")}>
                <div className="mb-4">
                    <div className={getClassNames("mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12")}>
                        <p className={getClassNames("text-base font-semibold uppercase tracking-wide ")}>
                            Contact
                        </p>
                        <h2
                            className={getClassNames("font-heading mb-4 font-bold tracking-tight  text-3xl sm:text-5xl")}>
                            Get in Touch
                        </h2>
                        <p className={getClassNames("mx-auto mt-4 max-w-3xl text-xl ")}>In hac habitasse platea
                            dictumst
                        </p>
                    </div>
                </div>
                <div className={getClassNames("flex items-stretch justify-center")}>
                    <div className={getClassNames("grid md:grid-cols-2")}>
                        <div className={getClassNames("h-full pr-6")}>
                            <p className={getClassNames("mt-3 mb-12 text-lg ")}>
                                Class aptent taciti sociosqu ad
                                litora torquent per conubia nostra, per inceptos himenaeos. Duis nec ipsum orci. Ut scelerisque
                                sagittis ante, ac tincidunt sem venenatis ut.
                            </p>
                            <ul className={getClassNames("mb-6 md:mb-0")}>
                                {/* Address */}
                                <li className={getClassNames("flex")}>
                                    <div className={getClassNames("flex h-10 w-10 items-center justify-center rounded bg-blue-900")}>
                                        {/* Location Icon */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" className="h-6 w-6 text-white">
                                            <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                                            <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                                        </svg>
                                    </div>
                                    <div className={getClassNames("ml-4 mb-4")}>
                                        <h3 className={getClassNames("mb-2 text-lg font-medium leading-6")}>Address</h3>
                                        <p>Addis Ababa, Ethiopia</p>
                                        <p>123 Example Street</p>
                                    </div>
                                </li>

                                {/* Contact */}
                                <li className={getClassNames("flex")}>
                                    <div className={getClassNames("flex h-10 w-10 items-center justify-center rounded bg-blue-900")}>
                                        {/* Phone Icon */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" className="h-6 w-6 text-white">
                                            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                                            <path d="M15 7a2 2 0 0 1 2 2"></path>
                                            <path d="M15 3a6 6 0 0 1 6 6"></path>
                                        </svg>
                                    </div>
                                    <div className={getClassNames("ml-4 mb-4")}>
                                        <h3 className={getClassNames("mb-2 text-lg font-medium leading-6")}>Contact</h3>
                                        <p>Phone: +251 900 000 000</p>
                                        <p>Email: example@gmail.com</p>
                                    </div>
                                </li>

                                {/* Working Hours */}
                                <li className={getClassNames("flex")}>
                                    <div className={getClassNames("flex h-10 w-10 items-center justify-center rounded bg-blue-900")}>
                                        {/* Clock Icon */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" className="h-6 w-6 text-white">
                                            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                                            <path d="M12 7v5l3 3"></path>
                                        </svg>
                                    </div>
                                    <div className={getClassNames("ml-4 mb-4")}>
                                        <h3 className={getClassNames("mb-2 text-lg font-medium leading-6")}>Working Hours</h3>
                                        <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                                        <p>Saturday: 8:00 AM - 12:00 PM</p>
                                    </div>
                                </li>
                            </ul>

                        </div>
                        <div className={getClassNames("card h-fit max-w-6xl p-5 md:p-12")} id="form">
                            <h2 className={getClassNames("mb-4 text-2xl font-bold")}>Ready to Get Started?</h2>
                            <div className={getClassNames("mb-6")}>
                                <div className={getClassNames("mx-0 mb-1 sm:mb-4")}>
                                    <div className={getClassNames("mx-0 mb-1 sm:mb-4")}>
                                        <label htmlFor="name" className="pb-1 text-xs uppercase tracking-wider"></label><input type="text" id="name" autoComplete="given-name" placeholder="Your name" className={getClassNames(`mb-2 w-full rounded-md border ${theme === 'dark' ? "border-gray-800" : "border-gray-300"}  py-2 pl-2 pr-4 shadow-md sm:mb-0 focus:outline-none`)} name="name" />
                                    </div>
                                    <div className="mx-0 mb-1 sm:mb-4">
                                        <label htmlFor="email" className="pb-1 text-xs uppercase tracking-wider"></label><input type="email" id="email" autoComplete="email" placeholder="Your email address" className={getClassNames(`mb-2 w-full rounded-md border ${theme === 'dark' ? "border-gray-800" : "border-gray-300"}  py-2 pl-2 pr-4 shadow-md sm:mb-0 focus:outline-none`)} name="email" />
                                    </div>
                                </div>
                                <div className="mx-0 mb-1 sm:mb-4">
                                    <label htmlFor="textarea" className="pb-1 text-xs uppercase tracking-wider"></label><textarea id="textarea" name="textarea" cols={30} rows={5} placeholder="Write your message..." className={getClassNames(`mb-2 w-full focus:outline-none rounded-md border ${theme === 'dark' ? "border-gray-800 placeholder:text-gray-400 " : "border-gray-300"}  py-2 pl-2 pr-4 shadow-md sm:mb-0`)}></textarea>
                                </div>
                            </div>
                            <div className={getClassNames("text-center ")}>
                                <button className={getClassNames("w-full bg-blue-800 text-white px-6 py-3 font-xl rounded-md sm:mb-0")}>Send Message</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={getClassNames(`absolute bottom-0  left-0 z-0 h-1/2 w-1/12 blur-3xl ${theme === 'dark' ? "bg-gray-800" : "bg-black/10"} blur-2xl`)}
            />
            <div
                className={getClassNames(`absolute top-0  right-0 z-0 h-1/2 w-1/12 blur-3xl ${theme === 'dark' ? "bg-gray-800" : "bg-black/10"} blur-2xl`)}
            />
        </section>
    );
};

export default ContactUs;