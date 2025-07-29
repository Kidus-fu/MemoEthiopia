import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Footer from "../../components/Landing/Footer";
import LandingNavBar from "../../components/Landing/LandingNavBer";



const AboutUs = () => {
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
        <>
            <div className={getClassNames("")}>
                <LandingNavBar />
                <section className={getClassNames("overflow-hidden pt-15 pb-12 lg:pt-[50px] px-2 lg:pb-[120px]")}>
                    <div className="container mx-auto">
                        <div className="flex flex-wrap items-center justify-between -mx-4">
                            <div className="w-full px-4 lg:w-6/12">
                                <div className="flex items-center -mx-3 sm:-mx-4">
                                    <div className="w-full px-5 sm:px-4 xl:w-1/2">
                                        <div className="py-3 sm:py-4">
                                            <img
                                                src="https://img.pikbest.com/origin/10/51/03/3pIkbEsTCpIkbEsTIDf.jpg!bw700"
                                                alt=""
                                                className="w-full rounded-2xl"
                                            />
                                        </div>
                                        <div className="py-3 sm:py-4">
                                            <img
                                                src="https://thumbs.dreamstime.com/b/smile-portrait-black-man-office-confidence-strategic-planning-information-review-male-intern-arms-crossed-happy-326196315.jpg"
                                                alt=""
                                                className="w-full rounded-2xl"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full px-5 sm:px-4 xl:w-1/2">
                                        <div className="relative z-10 my-4">
                                            <img
                                                src="https://tse1.mm.bing.net/th/id/OIP.DCTm3UpoDnYbto3liTtgJAHaE1?w=514&h=336&rs=1&pid=ImgDetMain&o=7&rm=3"
                                                alt=""
                                                className="w-full rounded-2xl"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full px-9 lg:w-1/2 xl:w-5/12">
                                <span className="block mb-4 text-lg font-semibold text-primary">
                                    Welcome to MemoEthiopia
                                </span>
                                <h2 className="mb-5 text-3xl font-bold text-dark sm:text-[40px]/[48px]">
                                    Empowering Notes, Ideas, and Intelligence
                                </h2>
                                <p className="mb-5 text-base text-body-color dark:text-dark-6">
                                    MemoEthiopia is a modern AI-powered platform built to redefine how Ethiopians and beyond take notes, organize thoughts, and get things done. Whether you’re a student, entrepreneur, researcher, or creative thinker MemoEthiopia helps you capture and structure your ideas effortlessly.
                                </p>
                                <p className="mb-5 text-base text-body-color dark:text-dark-6">
                                    From personal memos to collaborative note sharing, intelligent search to daily summaries, MemoEthiopia is designed to be your everyday productivity companion. As we scale, our goal is to create a simple, powerful, and secure experience accessible to all.
                                </p>
                                <p className="mb-8 text-base text-body-color dark:text-dark-6">
                                    Join thousands of users who are building a smarter note culture. Start free today, and be part of the future of digital memory in Ethiopia.
                                </p>
                                <a
                                    href="/signup"
                                    className="inline-flex items-center justify-center py-3 text-base font-medium text-center border border-transparent rounded-md px-7 bg-primary hover:bg-opacity-90"
                                >
                                    Get Started with MemoEthiopia
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    );
};

export default AboutUs;
