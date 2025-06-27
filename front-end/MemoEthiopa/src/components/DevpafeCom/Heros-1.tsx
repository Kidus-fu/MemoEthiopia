import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import LandingNavBar from '../Landing/LandingNavBer';
import bgImg from '../../../public/Contactbg-white.png';
import { motion } from 'framer-motion';

const Heros1: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theam.theme);
  const DeveloperTest = useSelector((state: RootState) => state.developertest.border_test);

  const getClassNames = (base: string) => {
    const border = DeveloperTest ? 'border border-red-700' : '';
    const themeStyle =
      theme === 'dark' ? 'bg-[#1C1C1C] text-white' : 'bg-[#F3F6FB] text-black';
    return `${base} ${border} ${themeStyle}`;
  };

  return (
    <div className={getClassNames('relative z-10 mt-1')}>
      <LandingNavBar />
      <div className={getClassNames('p-2')}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* Main Content Section with BG */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center lg:col-span-3 text-black p-4 py-20 px-4 rounded-xl"
            style={{
              backgroundImage: `url(${bgImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="text-gray-200 p-3 bg-[#1C1C1C]/80 backdrop-blur-md rounded-2xl m-5 lg:w-2/4"
            >
              <h1 className="text-3xl font-bold mb-4 text-center">Developer Panel</h1>
              <p className="text-center mb-6 p-2">
                Memo Ethiopia is an open-source, real-time note-taking app built with Django and DRF. It helps you create, manage, and share notes effortlessly with powerful backend support and smooth real-time updates.
              </p>
            </motion.div>
          </motion.div>

          {/* Side Info Cards */}
          <div className="flex flex-col gap-4 sm:px-5">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={getClassNames('cursor-pointer select-none max-w-xl p-6 rounded-xl border hover:shadow-md') + (theme === 'dark' ? ' border-gray-800 hover:bg-gray-800 hover:border-violet-700' : ' border-gray-300 hover:bg-violet-300 hover:border-violet-600')}
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight">MemoEthiopia Frontend</h5>
              <p className="font-normal">
                Built with React and TypeScript, styled using Tailwind CSS, and powered by Ant Design for a smooth, component-based UI experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={getClassNames('cursor-pointer select-none max-w-xl p-6 rounded-xl border hover:shadow-md') + (theme === 'dark' ? ' border-gray-800 hover:bg-gray-800 hover:border-violet-700' : ' border-gray-300 hover:bg-violet-300 hover:border-violet-600')}
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight">MemoEthiopia Backend</h5>
              <p className="font-normal">
                Developed with Python using Django and Django REST Framework. Includes JWT authentication, secure password validation, and scalable API features.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
       <div
                className={getClassNames(`absolute bottom-0 right-0 z-0 h-1/5 w-1/6 blur-3xl ${theme === 'dark' ? "bg-gray-700" : "bg-black/10"} blur-2xl`)}
            />
    </div>
  );
};

export default Heros1;
