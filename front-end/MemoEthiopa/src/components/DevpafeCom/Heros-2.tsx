import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import GitHube from '../../../public/GitHub-Symbol.png';
import {
    GithubFilled,
    GlobalOutlined,
    InstagramOutlined,
    LinkedinFilled,
    MailOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Heros2: React.FC = () => {
    const theme = useSelector((state: RootState) => state.theam.theme);
    const DeveloperTest = useSelector((state: RootState) => state.developertest.border_test);
    const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
    const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.2 });

    const getClassNames = (base: string) => {
        const border = DeveloperTest ? 'border border-red-700' : '';
        const themeStyle =
            theme === 'dark'
                ? 'bg-[#1C1C1C] text-white'
                : 'bg-[#F3F6FB] text-black';
        return `${base} ${border} ${themeStyle}`;
    };

    return (
        <div className={getClassNames('relative mt-8 z-0')}>
            <div
                className={getClassNames(`absolute top-0 left-0 z-0 h-1/4 w-1/6 blur-3xl ${theme === 'dark' ? "bg-gradient-to-b from-violet-900/50 to-blue-900/15" : "bg-black/10"} blur-2xl`)}
            />
            <div
                className={getClassNames(`absolute bottom-0  right-0 z-0 h-1/4 w-1/6 blur-3xl ${theme === 'dark' ? "bg-gradient-to-b from-gray-600/50 to-violet-900/50" : "bg-black/10"} blur-2xl`)}
            />
            <h1 className='text-3xl text-center mb-4'>Where Do I Start? </h1>
            <div className={getClassNames('flex flex-col lg:flex-row items-center  gap-4 px-4')}>
                <motion.div
                    ref={ref1}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView1 ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className={getClassNames(`lg:flex lg:max-w-7xl lg:shadow-lg border p-2 ${theme === 'dark' ? 'border-gray-800' : 'border-gray-300 '} rounded-lg`)}
                >
                    <div className={getClassNames('lg:w-1/2')}>
                        <div
                            className="lg:scale-90 h-80 bg-cover lg:h-full rounded-b-none lg:rounded-lg"
                            style={{
                                backgroundImage: `url(${GitHube})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}
                        ></div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView1 ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className={getClassNames('py-12 max-w-xl lg:max-w-5xl lg:w-1/2 rounded-t-none lg:rounded-lg')}
                    >
                        <h2 className={getClassNames('text-3xl font-bold')}>Where Do I Start? <span className="text-indigo-600">GitHub</span></h2>
                        <p className="mt-4 leading-relaxed">
                            To get started with Memo Ethiopia :
                            <br /><br />
                            1. Clone the Project:  Go to the GitHub repository and clone it.
                            <br /><br />
                            2. Backend Setup:  Create and activate a virtual environment, install dependencies with <code>pip install -r requirements.txt</code>, and follow the README to run the Django server.
                            <br /><br />
                            3. Frontend Setup:  Navigate to the frontend directory, run <code>npm install</code>, then <code>npm run dev</code>.
                            <br /><br />
                            That’s it you’re ready to build, test, and contribute! 🚀
                        </p>
                        <div className="mt-8">
                            <a
                                href="https://github.com/Kidus-fu/MemoEthiopia"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-900 text-gray-100 px-5 py-3 font-semibold rounded"
                            >
                                Start Now
                            </a>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    ref={ref2}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={inView2 ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className={getClassNames(`w-full max-w-xl p-6 rounded-xl border ${theme === 'dark' ? 'border-gray-800 hover:bg-gray-800 hover:border-violet-700' : 'border-gray-300 hover:bg-violet-300 hover:border-violet-600'}`)}
                >
                    <h5 className="mb-2 text-2xl  tracking-tight">Contact a Developer</h5>
                    <p className="font-normal">
                        Have a question, suggestion, or issue? Feel free to reach out we’re always happy to connect and improve the platform based on your feedback.
                    </p>
                    <div className="flex mt-5 text-2xl gap-3">
                        <a href="https://github.com/Kidus-fu/" target='_blank'><GithubFilled /></a>
                        <a href="https://www.linkedin.com/in/kidus-surafel/" target='_blank'><LinkedinFilled /></a>
                        <a href="https://kidussurafel-porfolio.vercel.app/" target='_blank'><GlobalOutlined /></a>
                        <a href="https://www.instagram.com/_kida_18/" target="_blank"><InstagramOutlined /></a>
                        <a href="mailto:seeh51593@gmail.com"><MailOutlined /></a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Heros2;
