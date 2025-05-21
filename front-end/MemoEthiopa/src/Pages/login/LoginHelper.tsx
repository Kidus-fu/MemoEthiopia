import { Button, ConfigProvider, Select, theme as antdTheme } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import HelperEng from './HelperEng';
import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import HelperSpe from "./tts.wav"
import useSound from 'use-sound';
import HelperAmh from './HelperAmh';
import HelperAO from './HelperAO';

const LoginHelper: React.FC = () => {
    const theme = useSelector((state: RootState) => state.theam.theme);
    const handleLangChange = (selectedLang: string) => {
        setSelectlang(selectedLang)
    };
    const [selectlan, setSelectlang] = useState("English")
    const [isPlaying, setIsPlaying] = useState(false);

    const [play , {stop}] = useSound(HelperSpe, {
        onplay: () => setIsPlaying(true),
        onend: () => setIsPlaying(false),
        onstop: () => setIsPlaying(false),
    });
    const handlePlay = () => {
        play();
    };
    const handleStop = () => {
        stop();
    };
    const lang = [
        { id: 'English', label: 'English', },
        { id: 'Amharic', label: 'Amharic', },
        { id: 'Oromo', label: 'Oromo', },
    ];

    return (
        <>
            <ConfigProvider theme={{
                algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
            }}>
                <div className='flex gap-2'>
                    <Select
                        title='Lang'
                        value={selectlan}
                        onChange={handleLangChange}
                        optionLabelProp="label"
                        dropdownStyle={{ backgroundColor: theme === 'dark' ? '#141414' : '#fff' }}
                        style={{ width: 90 }}
                    >
                        {lang.map((t) => (
                            <Select.Option
                                key={t.id}
                                value={t.id}
                                label={
                                    <div className="flex items-center gap-2">
                                        <span>{t.label}</span>
                                    </div>
                                }
                            >
                                <div className="flex items-center gap-2">
                                    <span>{t.label}</span>
                                </div>
                            </Select.Option>
                        ))}
                    </Select>
                    {selectlan === "English" ? (
                        <Button
                            onClick={isPlaying ? handleStop :handlePlay}
                            title='Sound play' >
                                { isPlaying ? <PauseCircleOutlined />: <PlayCircleOutlined /> }
                        </Button>
                    ) :
                        <Button
                            disabled={true}
                            title="Isn't supporting" ><PlayCircleOutlined />
                        </Button>
                    }
                </div>
                {selectlan === "English" && <HelperEng />}
                {selectlan === "Amharic" && <HelperAmh />}
                {selectlan === "Oromo" && <HelperAO />}
            </ConfigProvider>
        </>
    );
};

export default LoginHelper;