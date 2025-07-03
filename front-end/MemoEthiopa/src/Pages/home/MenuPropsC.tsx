import React from "react";
import { MenuProps } from "antd";
import { CiOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined, EyeFilled, FileAddOutlined, GlobalOutlined, InboxOutlined, LogoutOutlined, SettingFilled, StarOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useMessage } from "../../components/useMessage";
import { getSystemTheme, setTheme } from "../../store/features/Theam/theam";
import { logout } from "../../store/features/users/Userinfo";
export const Folderitems: MenuProps['items'] = [
  {
    label: 'Open a folder',
    key: '1',
    icon: <EyeFilled />,
  },
  {
    label: 'Rename',
    key: '2',
    icon: <EditOutlined />,
  },
  {
    label: 'New file',
    key: '3',
    icon: <FileAddOutlined />,
  },
  {
    label: 'Delete',
    key: '4',
    icon: <DeleteOutlined />,
    danger: true,
  },
];

export const useUserMenuItems = (): MenuProps['items'] => {
  const user = useSelector((state: RootState) => state.user);
  const showMessage = useMessage()
  const dispatch = useDispatch();
  const copyToClipboard = async (text: string, mes: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showMessage('success', mes)

    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return [
    {
      key: '1',
      className: "opacity-70 p-2",
      label: user?.usermore?.email || "No email",
      icon: <UserOutlined />,
      onClick: () => { copyToClipboard(`User-${user?.uuid}`, "Copied your User ID to clipboard") }
    },
    {
      key: '2',
      className: `p-2 ${user?.paln === "free" ? "opacity-40" : ""}`,
      label: "Update",
      icon: <CiOutlined />,
    },
    {
      key: '3',
      label: 'Setting',
      className : '',
      icon: <SettingFilled />,
      type: 'submenu',
      children: [
        {
          key: '3-1',
          className: `p-2`,
          label: "Profile",
        },
        {
          key: '3-2',
          className: `p-2`,
          label: "Settings",
        },
        {
          key: '3-3',
          className: `p-2`,
          label: "Keyboard Shortcut",
        },
        {
          key: '3-4',
          className: `p-2`,
          label: "Themes",
          type: 'submenu',
          children: [
            {
              key: '3-4-1',
              className: `p-2`,
              label: "Dark",
              onClick: () => {
                dispatch(setTheme('dark'))
              }
            },
            {
              key: '3-4-2',
              className: `p-2`,
              label: "Light",
              onClick: () => {
                dispatch(setTheme('light'))
              }
            },
            {
              key: '3-4-3',
              className: `p-2`,
              label: "System",
              onClick: () => {
                dispatch(setTheme(getSystemTheme()))
              }
            },
          ]
        },
      ]
    },
    {
      label: 'Help',
      key: '4',
      icon: <GlobalOutlined />,
      type: 'submenu',
      children: [
        {
          key: "4-1",
          label: "what is GashaAI?",
          icon: <ExclamationCircleOutlined />,
          onClick: () => { alert("ii") }
        },
        {
          key: "4-2",
          label: "what is GashaAI?",
          icon: <ExclamationCircleOutlined />,
          onClick: () => { alert("ii") }
        },
      ]
    },
    {
      key: '5',
      type: 'divider'
    },
    {
      key: '6',
      label: 'Logout',
      icon: <LogoutOutlined />,
      danger: true,
      onClick : () => {
        dispatch(logout())
      }
    }
  ];
};
export const useNoteItems = (): MenuProps['items'] => {
  // const user = useSelector((state: RootState) => state.user);

  // const showMessage = useMessage()


  return [
    {
      key: '1',
      className: "p-2",
      label: "Edit",
      icon: <EditOutlined />,
    },
    {
      key: '2',
      className: "p-2",
      label: "Add to favorites",
      icon: <StarOutlined />,
    },
    {
      key: '3',
      className: `p-2`,
      label: "Archived",
      icon: <InboxOutlined />
    },
    {
      key: '4',
      type: 'divider'
    },
    {
      key: '5',
      label: 'Add to Trash',
      icon: <DeleteOutlined />,
      danger: true,
    }
  ];
};
const Items: React.FC = () => {
  return null
};

export default Items;