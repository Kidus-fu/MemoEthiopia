import { List, Avatar, ConfigProvider, theme as antdTheme, Dropdown,  Empty } from "antd";
import { DeleteOutlined, EyeFilled, MoreOutlined, UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface Notification {
  id: number;
  message: string;
  is_read: boolean;
  user_name: {
    username: string;
    profile_picture: string | null;
  };
  created_at: string;
}

interface NotificationListProps {
  notifications: Notification[];
  theme: "dark" | "light" | string;
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications, theme }) => {
  return (
    <div className={`w-[440px]  h-[500px] rounded-2xl p-2 ${theme === "dark" ? "bg-[#242927]" : "bg-white"
      }`}>
      {
        notifications.length ?
          (
            <List
              itemLayout="horizontal"
              dataSource={notifications}
              className={`p-2 ${theme === "dark" ? "bg-[#242927]" : "bg-white"
                }`}
              locale={{ emptyText: "No notifications" }}
              renderItem={item => (
                <List.Item
                  className={`w-full cursor-pointer mt-2  rounded-md p-2 ${theme === "dark" ? "bg-[#242927] text-white hover:bg-[#2d3230]" : "bg-white hover:bg-gray-50"
                    }`}>
                  <List.Item.Meta
                    avatar={
                      <div className="relative inline-block">
                        <Avatar
                          // src={item.user_name.profile_picture || undefined}
                          icon={<UserOutlined />}
                        />
                        {!item.is_read && (
                          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-600 rounded-full border border-white"></span>
                        )}
                      </div>
                    }
                    title={
                      <>
                        <div
                          className="flex items-center justify-between w-full">
                          <span
                            className={`text-sm truncate ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                            {item.user_name.username}: {item.message}
                          </span>
                          <ConfigProvider theme={{
                            algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
                            components: {
                              Dropdown: {
                                paddingBlock: 10,
                              }
                            },
                          }}>
                            <Dropdown menu={{
                              items: [
                                {
                                  key: '1',
                                  label: 'show sender',
                                  icon: <EyeFilled />,
                                },
                                {
                                  key: '2',
                                  label: 'Delete',
                                  icon: <DeleteOutlined />,
                                  danger: true,
                                }
                              ]
                            }} trigger={["click"]} placement="bottomLeft"
                              overlayStyle={{ width: 220, height: 220, borderRadius: 20 }}>
                              <span className="text-lg text-gray-400 me-2"><MoreOutlined /></span>
                            </Dropdown>
                          </ConfigProvider>
                        </div>
                        <span className="text-xs text-gray-400">
                          {dayjs(item.created_at).fromNow()}
                        </span>
                      </>} />
                </List.Item>
              )}
            />) :
          (
            <div className={`flex justify-center items-center mt-40`}>
              <Empty description={"Empty Notification"}  className="text-white"/>
            </div>
          )
      }

    </div>
  );
};

export default NotificationList;
