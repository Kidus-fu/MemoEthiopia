import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ExportOutlined } from '@ant-design/icons';

const DocmRev: React.FC = () => {
    const theme = useSelector((state: RootState) => state.theam.theme);
      const DeveloperTest = useSelector((state: RootState) => state.developertest.border_test);
    
      const getClassNames = (base: string) => {
        const border = DeveloperTest ? 'border border-red-700' : '';
        const themeStyle =
          theme === 'dark'
            ? 'bg-[#1C1C1C] text-white'
            : 'bg-[#F3F6FB] text-black';
        return `${base} ${border} ${themeStyle}`;
      };
    return (
        <div className={getClassNames("mt-8")}>
                <h1 className='text-3xl text-center '>Documentations</h1>
            <div className=" mx-auto p-5 sm:p-10 md:p-10">


    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

        <div className="rounded overflow-hidden shadow-lg flex flex-col">
            <a></a>
            <div className="relative"><a>
                    <img className="w-full"
                        src="https://cdn.pixabay.com/photo/2018/05/18/15/30/web-design-3411373_1280.jpg"
                        alt="Sunset in the mountains" />
                    <div
                        className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                    </div>
                </a>
                <a href="#!">
                    <div
                        className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                        Front End <ExportOutlined />
                    </div>
                </a>
            </div>
            <div className="px-6 py-4 mb-auto">
                <a
                    className="font-medium text-lg  hover:text-indigo-600 transition duration-500 ease-in-out  mb-2">Front end Documentation </a>
                <p className={`${theme === "dark"? "text-gray-200":"text-gray-600"}  text-sm`}>
                    Built with React and TypeScript, styled using TailwindCSS and Ant Design. It’s fast, responsive, and supports AI-powered note analysis.
                </p>
            </div>
            
        </div>



        <div className="rounded overflow-hidden shadow-lg flex flex-col">
            <a></a>
            <div className="relative"><a>
                    <img className="w-full"
                        src="https://cdn.pixabay.com/photo/2020/09/27/13/15/data-5606639_960_720.jpg"
                        alt="Sunset in the mountains" />
                    <div
                        className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                    </div>
                </a><a href="#!">
                    <div
                        className="text-xs absolute top-0 right-0 bg-indigo-800 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                        Back End <ExportOutlined />
                    </div>
                </a>
            </div>
            <div className="px-6 py-4 mb-auto">
                <a
                    className="font-medium text-lg  hover:text-indigo-600 transition duration-500 ease-in-out  mb-2">Back End Documentation </a>
                <p className={`${theme === "dark"? "text-gray-200":"text-gray-600"}  text-sm`}>
                    MemoEthiopia uses Django and Django REST Framework to handle user auth, secure APIs, and real-time note management with JWT protection.
                </p>
            </div>
           
        </div>


        
        <div className="rounded overflow-hidden shadow-lg flex flex-col ">
            <a></a>
            <div className="relative"><a>
                    <img className="w-full"
                        src="https://cdn.pixabay.com/photo/2025/03/01/20/18/ai-generated-9440737_960_720.png"
                        alt="Sunset in the mountains" />
                    <div
                        className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                    </div>
                </a><a href="#!">
                    <div
                        className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                        AI Agent <ExportOutlined /> 
                    </div>
                </a>
            </div>
            <div className="px-6 py-4 mb-auto">
                <a
                    className="font-medium text-lg  hover:text-indigo-600 transition duration-500 ease-in-out  mb-2">AI Agent Documentation </a>
                <p className={`${theme === "dark"? "text-gray-200":"text-gray-600"}  text-sm`}>
                    MemoEthiopia includes an AI agent designed to enhance note analysis and simplify your life by making note-taking smarter and more efficient.
                </p>
            </div>
            
        </div>

    </div>

</div>
        </div>
    );
};

export default DocmRev;