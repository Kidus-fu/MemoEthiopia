import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { ExportOutlined,  ReloadOutlined, UserOutlined } from "@ant-design/icons";
import { ConfigProvider, Dropdown, theme as antdTheme } from "antd";
import NotificationList from "../../Pages/home/NotificationList";
import api from "../../api";
import { useUserMenuItems } from "../../Pages/home/MenuPropsC";

const MinNavbar: React.FC = () => {
    const theme = useSelector((state: RootState) => state.theam.theme);
    const DeveloperTest = useSelector((state: RootState) => state.developertest.border_test);
    const [notificationCount, setnotificationCount]: any = useState();
    const [notifications, setNotifications]: any = useState();
    const user = useSelector((state: RootState) => state.user);
    const useritems = useUserMenuItems();

    const getClassNames = (base: string) => {
        const border = DeveloperTest ? 'border border-red-700' : '';
        const themeStyle = theme === 'dark' ? ' bg-[#1C1C1C] text-white' : 'bg-[#F3F6FB] text-gray-600';
        return `${base} ${border} ${themeStyle}`;
    };

    useEffect(() => {
        api.get('api-v1/notification/')
            .then(res => {
                const data = res.data.results
                setNotifications(data);
                setnotificationCount(data.length)
            })
    }, [])

    const handelNotificationopen = () => {
        setnotificationCount(0)
        notifications.map((notifi: any) => {
            api.patch(`api-v1/notification/${notifi.id}/`,
                {
                    message: notifi.message,
                    is_read: true
                })
        })
    }
    return (
        <>
            <div className={`sticky hidden px-5 sm:text-xs justify-between md:flex top-0 z-50 ${theme === "dark" ? "bg-[#1f1f1f]" : "bg-[#ffffff33]"} w-full`}
                onContextMenu={(e) => e.preventDefault()}
            >
                <div className={getClassNames(`sm:flex gap-2 sm:text-xs ${theme === "dark" ? "bg-[#1f1f1f]" : "bg-[#ffffff33]"}`)}>
                    <Link to={"/blog"}
                        onClick={(e) => {
                            e.preventDefault(); // Prevent default navigation
                            window.open("/blog", "_blank", "noopener,noreferrer");
                        }}
                    >
                        <div className=" p-1 cursor-pointer sm:text-xs">
                            Blog <ExportOutlined />
                        </div>
                    </Link>
                    <div className=" p-1 cursor-pointer">
                        Shop <ExportOutlined />
                    </div>
                    <div className="p-1 cursor-pointer">
                        {notificationCount ? (
                            <>
                                <Dropdown
                                    trigger={["click"]}
                                    placement="bottomRight"
                                    dropdownRender={() => <NotificationList notifications={notifications} theme={theme} />}>
                                    <div className="relative inline-block" onClick={handelNotificationopen}>
                                        <button className={" cursor-pointer border border-transparent"} title='notfication' >
                                            Notification
                                        </button>
                                        <span className="absolute -top-1 -right-2 sm:text-xs bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full" title={notificationCount}>
                                            {notificationCount}
                                        </span>
                                    </div>
                                </Dropdown>
                            </>
                        ) : (
                            <>
                                <Dropdown
                                    trigger={["click"]}
                                    placement="bottomRight"
                                    dropdownRender={() => <NotificationList notifications={notifications} theme={theme} />}>
                                    <button className=' cursor-pointer border border-transparent' title='notfication'>Notification</button>
                                </Dropdown>
                            </>
                        )}
                    </div>
                    <div className=" p-1 cursor-pointer opacity-50 sm:text-xs text-blue-400" title="GashaAI">
                        GashaAI
                        {/* <ThemeSelector /> */}
                    </div>
                    <div className=" p-1 opacity-35 sm:text-xs cursor-pointer" title='Chat'>
                        Chat
                    </div>
                    <div className=" p-1 cursor-pointer" title='Reload' onClick={() => {
                        window.location.reload()
                    }}>
                        <ReloadOutlined />
                    </div>
                </div>
                <div className="flex gap-2">
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
                                        // src={`https://memoethiopia.onrender.com${user.profile_picture}`}
                                        src={`https://placehold.co/150/?text=${user?.usermore?.username[0]}`}
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
            </div>
        </>
    );
};

export default MinNavbar;