import React, { useEffect } from 'react';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import UserProfileUpdateForm from './UserProfileUpdateForm';


const AccountSetting: React.FC = () => {
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
        document.title = 'Account preferences'
    }, [])
    if (!userinfo?.loggedIn){
        window.location.href = "/"
    }
    return (
        <>
            <h2 className='text-center text-2xl m-4'>Profile information</h2>
            <div className={getClassNames(`${theme == "dark" ? "bg-[#272424]":"bg-[#f3ebeb] shadow-xs"} p-10 sm:w-[700px] rounder-lg`)}>
                <UserProfileUpdateForm userData={user} onUpdate={() => { }} />
            </div>
        </>
    );
};

export default AccountSetting;