import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { BulbOutlined, MoonOutlined, DesktopOutlined } from '@ant-design/icons';
import { ConfigProvider, Select, theme as antdTheme } from 'antd';
import { getSystemTheme, setTheme } from '../store/features/Theam/theam';

const { Option } = Select;

const themes = [
    { id: 'light', label: 'Light', icon: <BulbOutlined /> },
    { id: 'dark', label: 'Dark', icon: <MoonOutlined /> },
    { id: 'system', label: 'System', icon: <DesktopOutlined /> },
];

const ThemeSelector: React.FC = () => {
    const theme = useSelector((state: RootState) => state.theam.theme);
    const dispatch = useDispatch();

    const handleThemeChange = (selectedTheme: string) => {
        if (selectedTheme === 'system') {
            dispatch(setTheme(getSystemTheme()));
        } else {
            dispatch(setTheme(selectedTheme));
        }
    };
    useEffect(() => {
        document.body.className = `${theme === 'dark' ? 'bg-[#272727] text-white' : ' bg-[#f8f9fa]  text-black'}`;
    }, [theme]);

return (
    <ConfigProvider
        theme={{
            algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
            token: {
                colorPrimary: '#f8f9fa',
                fontSize: 12,
            },
        }}
    >
        <div className="">
            <Select
                value={theme}
                onChange={handleThemeChange}
                optionLabelProp="label"
                dropdownStyle={{ backgroundColor: theme === 'dark' ? '#141414' : '#f8f9fa' }}
                style={{ width: 90 }}
            >
                {themes.map((t) => (
                    <Option
                        key={t.id}
                        value={t.id}
                        label={
                            <div className="flex items-center gap-2">
                                {t.icon}
                                <span>{t.label}</span>
                            </div>
                        }
                    >
                        <div className="flex items-center gap-2">
                            {t.icon}
                            <span>{t.label}</span>
                        </div>
                    </Option>
                ))}
            </Select>
        </div>
    </ConfigProvider>
);
};

export default ThemeSelector;
