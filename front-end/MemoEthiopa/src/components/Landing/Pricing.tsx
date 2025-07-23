import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store'
import { ExportOutlined } from '@ant-design/icons';


const Pricing: React.FC = () => {
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
        <section className={getClassNames("py-20 relative z-30 ")}>
            <div className={getClassNames("container px-4 mx-auto z-50")}>
                <div className={getClassNames("max-w-2xl mx-auto mb-16 text-center")}>
                    <span className={getClassNames("font-bold tracking-wider  uppercase ")}>Pricing</span>
                    <h2 className={getClassNames(" font-bold lg:text-3xl")}>Choose your best plan</h2>
                    <p className='cursor-pointer sm:text-sm text-blue-500'>Full price <ExportOutlined /></p>
                </div>
                <div className={getClassNames(" flex flex-wrap items-stretch -mx-4 z-50")}>
                    <div className={getClassNames(`flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0 border  ${theme === 'dark' ? 'border-gray-700 shadow-[rgb(30,27,51)]' : ' border-gray-300'} shadow-2xl`)}>
                        <div className={getClassNames("flex flex-grow flex-col p-6 space-y-6 rounded  sm:p-8")}>
                            <div className="space-y-2">
                                <h4 className="text-xl font-bold">Beginner</h4>
                                <span className="text-4xl font-bold">Free</span>
                            </div>
                            <p className={getClassNames("mt-3 leading-relaxed sm:text-sm")}>Perfect for students and casual users just getting started.</p>
                            <ul className={getClassNames("flex-1 mb-6 sm:text-sm")}>
                                <li className={getClassNames("flex mb-2 space-x-2")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span> Up to 100 memos per month</span>
                                </li>
                                <li className={getClassNames("flex mb-2 space-x-2")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>AI Agent (basic features only)</span>
                                </li>
                                <li className={getClassNames("flex mb-2 space-x-2")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span> 1 Language Translation</span>
                                </li>
                            </ul>
                            <button type="button" className={getClassNames("inline-block px-5 py-3 font-semibold tracking-wider text-center rounded bg-[rgb(83,56,231)] text-white")}>Get Started</button>
                        </div>
                    </div>
                    <div className={getClassNames(`flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0 border  ${theme === 'dark' ? 'border-gray-700 shadow-[rgb(30,27,51)]' : ' border-gray-300'} scale-110 shadow-2xl `)}>
                        <div className={getClassNames("flex flex-grow flex-col p-6 space-y-6 rounded sm:p-8")}>
                            <div className="space-y-2">
                                <h4 className="text-xl font-bold">Pro</h4>
                                <span className="text-4xl font-bold">530 Birr
                                    <span className="text-sm tracking-wide">/month</span>
                                </span>
                            </div>
                            <p className="leading-relaxed sm:text-sm">or professionals who need more power and flexibility.</p>
                            <ul className="flex-1 space-y-2 sm:text-sm">
                                <li className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span> Unlimited memos</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>Full AI Agent access (chat, joke, weather, reminders)</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span> Multi-language support</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>Custom Tags & Memo Search</span>
                                </li>
                            </ul>
                            <a rel="noopener noreferrer" href="#" className={getClassNames("inline-block w-full px-5 py-3 font-bold tracking-wider text-center rounded  dark:bg-violet-600 text-white")}>Get Started</a>
                        </div>
                    </div>
                    <div className={getClassNames(`flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0 border  ${theme === 'dark' ? 'border-gray-700 shadow-[rgb(30,27,51)]' : ' border-gray-300'}   shadow-2xl`)}>
                        <div className={getClassNames("flex flex-grow flex-col p-6 space-y-6 rounded  sm:p-8")}>
                            <div className="space-y-2">
                                <h4 className="text-xl font-bold">Team</h4>
                                <span className="text-4xl font-bold">1,650 Birr
                                    <span className="text-sm tracking-wide">/month</span>
                                </span>
                            </div>
                            <p className={getClassNames("leading-relaxed sm:text-sm")}>For schools, teams, or businesses that need collaboration and more.</p>
                            <ul className={getClassNames("space-y-2 sm:text-sm")}>
                                <li className="flex items-start space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>Everything in Pro</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>Multi-user accounts with shared notes</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>Admin dashboard for user control</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>Priority Support + Custom Integrations</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>Early access to AI tools (image gen tools)</span>
                                </li>
                            </ul>
                            <a rel="noopener noreferrer" href="#" className="inline-block w-full px-5 py-3 font-semibold tracking-wider text-center rounded dark:bg-violet-600 dark:text-gray-50">Get Started</a>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Pricing;