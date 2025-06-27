import React from "react";
import { MenuProps } from "antd";
import { CiOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined, EyeFilled, FileAddOutlined, GlobalOutlined, InboxOutlined, LogoutOutlined, SettingFilled, StarOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useMessage } from "../../components/useMessage";
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
  const copyToClipboard = async (text: string,mes:string) => {
    try {
      await navigator.clipboard.writeText(text);
      showMessage('success',mes)
      
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  
  return [
    {
      key: '1',
      className:"opacity-70",
      label: user?.usermore?.email || "No email",
      icon: <UserOutlined />,
      onClick: () => {copyToClipboard(`User-${user?.uuid}`,"Copied your User ID to clipboard")}
    },
    {
      key: '2',
      className:`${user?.paln === "free" ? "opacity-40":""}`,
      label: "Update",
      icon: <CiOutlined />,
    },
    {
      key: '3',
      label: 'Setting',
      icon: <SettingFilled />,
    },
    {
      label: 'Help',
      key: '4',
      icon: <GlobalOutlined />,
      type : 'submenu',
      children : [
        {
          key:"4-1",
          label:"what is GashaAI?",
          icon:<ExclamationCircleOutlined />,
          onClick : () => {alert("ii")}
        },
        {
          key:"4-2",
          label:"what is GashaAI?",
          icon:<ExclamationCircleOutlined />,
          onClick : () => {alert("ii")}
        },
      ]
    },
    {
      key:'5',
      type:'divider'
    },
    {
      key: '6',
      label: 'Logout',
      icon: <LogoutOutlined />,
      danger: true,
    }
  ];
};
export const useNoteItems = (): MenuProps['items'] => {
  const user = useSelector((state: RootState) => state.user);
  
  const showMessage = useMessage()
  const copyToClipboard = async (text: string,mes:string) => {
    try {
      await navigator.clipboard.writeText(text);
      showMessage('success',mes)
      
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  
  return [
    {
      key: '1',
      className:"p-2",
      label: "Add to favorites",
      icon: <StarOutlined />,
      onClick: () => {copyToClipboard(`User-${user?.uuid}`,"Copied your User ID to clipboard")}
    },
    {
      key: '2',
      className:`p-2`,
      label: "Archived",
      icon: <InboxOutlined />
    },
    {
      key:'3',
      type:'divider'
    },
    {
      key: '4',
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