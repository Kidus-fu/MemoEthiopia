import React, { useEffect } from 'react';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { ArrowRightOutlined } from '@ant-design/icons';

const SettingNotifications: React.FC = () => {
    const {  userinfo } = useSelector((state: RootState) => state);
    const DeveloperTest = useSelector((state: RootState) => state.developertest.border_test);
    const theme = useSelector((state: RootState) => state.theam.theme);

    const getClassNames = (base: string) => {
        const border = DeveloperTest ? "border border-red-700" : "";
        const themeStyle =
            theme === "dark" ? "text-white" : "text-black";
        return `${base} ${border} ${themeStyle}`;
    };

    useEffect(() => {
        document.title = 'Notifications'
    }, [])
    if (!userinfo?.loggedIn){
        window.location.href = "/"
    }
    return (
        <>
            <h2 className='text-center text-2xl p-2'>Notifications you receive</h2>
            <div className={getClassNames(`${theme == "dark" ? "bg-[#272424]":"bg-[#f3ebeb] shadow-xs"} sm:w-[800px] rounded-md px-7 py-6 text-md sm:text-md font-stretch-95%`)}>
                <div className={getClassNames(`flex justify-between p-2 border-b m-2 ${theme == "dark" ? "border-gray-700":"border-gray-100"}`)}>
                    <div className="">Notifications</div>
                    <div className="sm:text-sm"><ArrowRightOutlined className='text-xs m-2 cursor-pointer' /></div>
                </div>
                <div className={getClassNames(`flex justify-between p-2 border-b m-2 ${theme == "dark" ? "border-gray-700":"border-gray-100"}`)}>
                    <div className="">Blog Notifications</div>
                    <div className="sm:text-sm"> <ArrowRightOutlined className='text-xs m-2 cursor-pointer' /></div>
                </div>
                <div className={getClassNames(`flex justify-between p-2 opacity-55 cursor-not-allowed border-b m-2 ${theme == "dark" ? "border-gray-700":"border-gray-100"}`)}>
                    <div className="">Messages Notifications</div>
                    <div className="sm:text-sm"> <ArrowRightOutlined className='text-xs m-2 cursor-pointer' /></div>
                </div>
                <div className={getClassNames(`flex justify-between p-2 opacity-55 cursor-not-allowed m-2`)}>
                    <div className="">AI Agent Update Notifications</div>
                    <div className="sm:text-sm"> <ArrowRightOutlined className='text-xs m-2 cursor-pointer' /></div>
                </div>
            </div>
        </>
    );
};

export default SettingNotifications;