import React, { useEffect } from 'react';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { ArrowRightOutlined } from '@ant-design/icons';

const SignInAndSecurity: React.FC = () => {
    const { user, userinfo } = useSelector((state: RootState) => state);
    const DeveloperTest = useSelector((state: RootState) => state.developertest.border_test);
    const theme = useSelector((state: RootState) => state.theam.theme);

    const getClassNames = (base: string) => {
        const border = DeveloperTest ? "border border-red-700" : "";
        const themeStyle =
            theme === "dark" ? "text-white" : "text-black";
        return `${base} ${border} ${themeStyle}`;
    };

    useEffect(() => {
        document.title = 'Sign In & Security'
    }, [])
    if (!userinfo?.loggedIn){
        window.location.href = "/"
    }
    return (
        <>
            <h2 className='text-center text-2xl p-2'>Account access</h2>
            <div className={getClassNames(`${theme == "dark" ? "bg-[#272424]":"bg-[#f3ebeb] shadow-xs"} sm:w-[800px] rounded-md px-7 py-6 text-md sm:text-md font-stretch-95%`)}>
                <div className={getClassNames(`flex justify-between p-2 border-b m-2 ${theme == "dark" ? "border-gray-700":"border-gray-100"}`)}>
                    <div className="">Email addresses</div>
                    <div className="sm:text-sm">{user?.usermore?.email} <ArrowRightOutlined className='text-xs m-2 cursor-pointer' /></div>
                </div>
                <div className={getClassNames(`flex justify-between p-2 border-b m-2 ${theme == "dark" ? "border-gray-700":"border-gray-100"}`)}>
                    <div className="">Phone numbers</div>
                    <div className="sm:text-sm"> <ArrowRightOutlined className='text-xs m-2 cursor-pointer' /></div>
                </div>
                <div className={getClassNames(`flex justify-between p-2 border-b m-2 ${theme == "dark" ? "border-gray-700":"border-gray-100"}`)}>
                    <div className="">Change Password</div>
                    <div className="sm:text-sm"> <ArrowRightOutlined className='text-xs m-2 cursor-pointer' /></div>
                </div>
                <div className={getClassNames(`flex justify-between p-2 opacity-55 cursor-not-allowed border-b m-2 ${theme == "dark" ? "border-gray-700":"border-gray-100"}`)}>
                    <div className="">Passkeys</div>
                    <div className="sm:text-sm"> <ArrowRightOutlined className='text-xs m-2 cursor-pointer' /></div>
                </div>
                <div className={getClassNames(`flex justify-between p-2 opacity-55 cursor-not-allowed border-b m-2 ${theme == "dark" ? "border-gray-700":"border-gray-100"}`)}>
                    <div className="">Devices that remember your password</div>
                    <div className="sm:text-sm"> <ArrowRightOutlined className='text-xs m-2 cursor-pointer' /></div>
                </div>
                <div className={getClassNames(`flex justify-between p-2 opacity-55 cursor-not-allowed  m-2`)}>
                    <div className="">Two-step verification</div>
                    <div className="sm:text-sm"> <ArrowRightOutlined className='text-xs m-2 cursor-pointer' /></div>
                </div>
            </div>
        </>
    );
};

export default SignInAndSecurity;