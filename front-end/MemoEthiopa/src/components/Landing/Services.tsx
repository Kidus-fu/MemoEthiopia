import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store'

// ... import statements remain the same

const Services: React.FC = () => {
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
        <div className='py-2'>
            <div className={getClassNames("")}>
                <section
                    id="features"
                    className={getClassNames("relative block px-6 py-10 md:py-20 md:px-10 ")}
                >
                    <div className={getClassNames("relative mx-auto max-w-5xl text-center")}>
                        <span className={getClassNames("my-3 flex items-center justify-center font-medium uppercase tracking-wider")}>
                            Discover Memo Ethiopia
                        </span>
                        <h2 className={getClassNames("block w-full bg-gradient-to-b font-bold  text-3xl sm:text-4xl")}>
                            Smart. Simple. Ethiopian.
                        </h2>
                        <p className={getClassNames("mx-auto my-4 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wid")}>
                            Memo Ethiopia helps you capture thoughts, organize ideas, and access your notes anytime powered by AI and built for productivity.
                        </p>
                    </div>

                    <div className={getClassNames("relative mx-auto max-w-7xl z-10  bg-transparent grid grid-cols-1 gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-3")}>
                        {/* Feature Card 1 */}
                        <div className={getClassNames(`rounded-md ${theme === 'dark' ? 'border-gray-700 shadow-[rgb(30,27,51)]' : ' border-gray-300'} shadow-2xl p-8 text-center border hover:scale-110 transition-transform duration-300 `)}>
                            <div
                                className={getClassNames(" button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border ")}
                                style={{
                                    backgroundImage: "linear-gradient(rgb(46,6,192) 0%, rgb(43, 49, 203) 100%)",
                                    borderColor: "rgb(93, 79, 240)",
                                }}
                            >
                                {/* You can replace this with a note icon */}
                                🧠
                            </div>
                            <h3 className="mt-6">AI-Powered Notes</h3>
                            <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide">
                                Let Memo AI help you summarize, translate, generate ideas, and retrieve important data instantly.
                            </p>
                        </div>

                        {/* Feature Card 2 */}
                        <div className={getClassNames(`rounded-md ${theme === 'dark' ? 'border-gray-700 shadow-[rgb(30,27,51)]' : 'border-gray-300'} shadow-2xl  p-8 text-center border hover:scale-110 transition-transform duration-300 `)}>
                            <div
                                className="button-text mx-auto flex h-12 w-12  items-center justify-center rounded-md border"
                                style={{
                                    backgroundImage: "linear-gradient(rgb(80, 70, 229) 0%, rgb(43, 49, 203) 100%)",
                                    borderColor: "rgb(93, 79, 240)",
                                }}
                            >
                                🌐
                            </div>
                            <h3 className="mt-6">Accessible Anywhere</h3>
                            <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide">
                                Your memos are synced securely in the cloud. Access them from any device, any time with peace of mind.
                            </p>
                        </div>

                        {/* Feature Card 3 */}
                        <div className={getClassNames(`rounded-md p-8 text-center border hover:scale-110 transition-transform duration-300 ${theme === 'dark' ? 'border-gray-700 shadow-[rgb(30,27,51)]' : 'border-gray-300'} shadow-2xl`)}>
                            <div
                                className="button-text mx-auto text-white  flex h-12 w-12 items-center justify-center rounded-md border"
                                style={{
                                    backgroundImage: "linear-gradient(rgb(80, 70, 229) 0%, rgb(43, 49, 203) 100%)",
                                    borderColor: "rgb(93, 79, 240)",
                                }}
                            >
                                ⚙️
                            </div>
                            <h3 className="mt-6">Built for Ethiopia</h3>
                            <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide">
                                Designed for local users, supporting Amharic and optimized for low-bandwidth use cases.
                            </p>
                        </div>
                    </div>


                    <div
                        className={getClassNames(`absolute bottom-0  z-0 h-1/3 w-1/6 blur-3xl ${theme === 'dark' ? "bg-gray-800" : "bg-black/5"} blur-2xl`)}
                    />
                    <div
                        className={getClassNames(`absolute top-0 right-0 z-0 h-1/3 w-1/6 blur-3xl ${theme === 'dark' ? "bg-gray-800" : "bg-black/5"} blur-2xl`)}
                    />
                </section>
            </div>
        </div>
    );
};


export default Services;