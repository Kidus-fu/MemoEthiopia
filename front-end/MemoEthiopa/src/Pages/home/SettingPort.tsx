import React from 'react';
import { useParams } from 'react-router-dom';
import AccountSetting from '../../components/home/AccountSetting';
import SignInAndSecurity from '../../components/home/SignInAndSecurity';
import SettingNotifications from './SettingNotifications';


const SettingPort: React.FC = () => {
    const { settingport } = useParams();

    if (settingport === "account") {
        return (
            <>
            <AccountSetting />
            </>
        )
    }
    if (settingport === "sign-in-and-security") {
        return (
            <>
              <SignInAndSecurity />
            </>
        )
    }
    if (settingport === "privacy") {
        return (
            <>
            <div className="flex justify-center items-center h-screen">
                <h1 className='text-3xl font-semibold'>Comming Soon</h1>
            </div>
            </>
        )
    }
    if (settingport === "notifications") {
        return (
            <>
            <SettingNotifications />
            </>
        )
    }

};

export default SettingPort;