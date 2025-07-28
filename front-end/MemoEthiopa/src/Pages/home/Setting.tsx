import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { Link, Outlet } from 'react-router-dom';
import { BellFilled, LockFilled, SecurityScanFilled, UserOutlined } from '@ant-design/icons';
import { ConfigProvider, theme as antdTheme , Dropdown } from 'antd';
import { useUserMenuItems } from './MenuPropsC';
import { useParams } from 'react-router-dom';
import { fetchUserData } from '../../store/features/users/User';
import SettingNavber from '../../components/home/SettingNavber';

const Setting: React.FC = () => {
    const { user, userinfo } = useSelector((state: RootState) => state);
    const { settingport } = useParams<{ settingport: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const theme = useSelector((state: RootState) => state.theam.theme);
    const DeveloperTest = useSelector((state: RootState) => state.developertest.border_test);
    const [selectport, setSelectPort] = useState(settingport ? settingport : '')
    const useritems = useUserMenuItems();

    useEffect(() => {
        document.title = "Settings"
        dispatch(fetchUserData())
    },[])

    const getClassNames = (base: string) => {
        const border = DeveloperTest ? 'border border-red-700' : '';
        const themeStyle =
            theme === 'dark'
                ? 'bg-[#1C1C1C] text-white'
                : 'bg-[#F3F6FB] text-black';
        return `${base} ${border} ${themeStyle}`;
    };
    if (!userinfo?.loggedIn) {
        window.location.href = "/"
    }
    const avatarUrl = `https://placehold.co/150/?text=${user?.usermore?.username?.[0] ?? 'U'}`;

    return (
        <div className={getClassNames("h-screen")}>
            {/* Top Bar */}
            <div className={getClassNames(`sticky top-0 z-50 flex items-center justify-between border-b ${theme === "dark" ? "border-gray-800" : "border-gray-200"} p-2 shadow-sm`)}>
                <div className="text-xl font-bold"> <Link to="/" className="text-xl font-bold ps-4">MemoEthiopia</Link></div>
                <ConfigProvider theme={{
                    algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
                    components: {
                        Dropdown: {
                            paddingBlock: 10,
                            fontSize: 11
                        }
                    },
                }}>

                    <Dropdown menu={{ items: useritems }} trigger={["click"]} placement="bottomLeft"
                        overlayStyle={{ width: 220, height: 220, borderRadius: 20 }}>
                        <div className={getClassNames("h-6 w-6 mt-1 bg-transparent rounded-full cursor-pointer  overflow-hidden flex items-center justify-center")}>
                            {user?.profile_picture ? (
                                <img
                                    src={avatarUrl}
                                    alt="User Avatar"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <UserOutlined className={" text-lg "} />
                            )}
                        </div>
                    </Dropdown>
                </ConfigProvider>
            </div>

            {/* Main Content */}
            <div className={getClassNames("sm:flex h-[calc(100vh-64px)] w-full overflow-hidden")}>
                {/* Left Sidebar */}
                <aside className={getClassNames(`pt-6 ps-6 hidden  sm:block border-r ${theme === "dark" ? "border-gray-800" : "border-gray-300"}`)}>
                    <div className="flex items-center gap-4 mb-4">
                        <img
                            src={avatarUrl}
                            alt="User Avatar"
                            className="h-9 w-9 object-cover rounded-full "
                        />
                        <div>
                            <h2 className="text-3xl font-semibold">Setting</h2>

                        </div>
                    </div>
                    <ul className="space-y-5 text-xl pt-3 p-3 cursor-pointer">
                        <li className={`cursor-pointer pt-7 transition-all delay-300`}>
                            <Link to={'/setting/account'} className={selectport === 'account' ? "border-s-4 border-blue-900 text-blue-500 transition-all delay-300" : "border-s-4 border-transparent"}
                                onClick={() => setSelectPort('account')}
                            >
                                <UserOutlined className='text-xl p-3' /> Account preferences
                            </Link>
                        </li>
                        <li className="cursor-pointer pt-6">
                            <Link to={'/setting/sign-in-and-security'} className={selectport === 'sign-in-and-security' ? "border-s-4 border-blue-900 text-blue-500 transition-all delay-300" : "border-s-4 border-transparent"}
                                onClick={() => setSelectPort('sign-in-and-security')}
                            >
                                <LockFilled className='text-xl p-3' /> Sing in & security
                            </Link>
                        </li>
                        <li className="cursor-pointer pt-6">
                            <Link to={'/setting/privacy'} className={selectport === 'privacy' ? "border-s-4 border-blue-900 text-blue-500 transition-all delay-300" : "border-s-4 border-transparent"}
                                onClick={() => setSelectPort('privacy')}
                            >
                                <SecurityScanFilled className='text-xl p-3' /> Data Export
                            </Link>
                        </li>
                        <li className="cursor-pointer pt-6">
                            <Link to={'/setting/notifications'} className={selectport === 'notifications' ? "border-s-4 border-blue-900 text-blue-500 transition-all delay-300" : "border-s-4 border-transparent"}
                                onClick={() => setSelectPort('notifications')}
                            >
                                <BellFilled className='text-xl p-3' />Notfications
                            </Link>
                        </li>
                    </ul>
                </aside>
                {/* Mobile  */}
                <aside className={getClassNames(`pt-2 pb-4 ps-6 block w-full sm:hidden border-r ${theme === "dark" ? "border-gray-800" : "border-gray-300"}`)}>
                    <ul className="flex space-x-5 text-sm w-full cursor-pointer">
                        <li className={`cursor-pointer pt-6 transition-all delay-300`}>
                            <Link to={'/setting/account'} className={selectport === 'account' ? " text-blue-500 transition-all delay-300" : "border-s-4 border-transparent"}
                                onClick={() => setSelectPort('account')}
                            >
                                Account
                            </Link>
                        </li>
                        <li className="cursor-pointer pt-6">
                            <Link to={'/setting/sign-in-and-security'} className={selectport === 'sign-in-and-security' ? " text-blue-500 transition-all delay-300" : "border-s-4 border-transparent"}
                                onClick={() => setSelectPort('sign-in-and-security')}
                            >
                                Sing in
                            </Link>
                        </li>
                        <li className="cursor-pointer pt-6">
                            <Link to={'/setting/privacy'} className={selectport === 'privacy' ? " text-blue-500 transition-all delay-300" : "border-s-4 border-transparent"}
                                onClick={() => setSelectPort('privacy')}
                            >
                                Data Export
                            </Link>
                        </li>
                        <li className="cursor-pointer pt-6">
                            <Link to={'/setting/notifications'} className={selectport === 'notifications' ? " text-blue-500 transition-all delay-300" : "border-s-4 border-transparent"}
                                onClick={() => setSelectPort('notifications')}
                            >
                                Notfications
                            </Link>
                        </li>
                    </ul>
                </aside>

                {/* Right Content Area */}
                <main
                    className={getClassNames(`flex-1 h-screen sm:h-auto   overflow-y-auto ${theme === "dark" ? "sm:bg-[#141414]" : "bg-gray-200"}`)}
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <div className="flex justify-center items-center">
                        <div className="">
                            <Outlet />
                        </div>
                    </div>
                    <SettingNavber />
                </main>

            </div>
        </div>
    );
};

export default Setting;
