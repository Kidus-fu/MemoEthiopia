import React from 'react';
import dayjs from 'dayjs';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { FolderOpenFilled, HomeOutlined, IdcardOutlined,   InfoCircleOutlined, ScheduleOutlined, UserOutlined } from '@ant-design/icons';

interface UserInfo {
    bio: string;
    email: string;
    id: number;
    paln: string;
    profile_picture: string;
    username: string;
    uuid: string;
    phone_number: string;
    location: string;
    date_of_birth: string;
    gender: string;
    social_links: string[];
    preferred_language: string;
}

interface Note {
    absolute_url: string;
    category: number;
    color: string;
    content: string;
    created_at: string;
    file: string | null;
    folder: number;
    folder_name: string;
    is_trashed: boolean;
    id: number;
    image: string | null;
    is_archived: boolean;
    is_pinned: boolean;
    title: string;
    updated_at: string;
    user_info: UserInfo;
    uuid: string;
}

interface NoteDetailProps {
    note: Note;
}

const NoteDetail: React.FC<NoteDetailProps> = ({ note }) => {
    const theme = useSelector((state: RootState) => state.theam.theme);
    const DeveloperTest = useSelector((state: RootState) => state.developertest.border_test);
    const getClassNames = (base: string) => {
        const border = DeveloperTest ? 'border border-red-700' : '';
        const themeStyle = theme === 'dark' ? ' bg-transparent text-white p-1' : 'bg-transparent text-black p-1';
        return `${base} ${border} ${themeStyle}`;
    };
    return (
        <div className={getClassNames("max-w-2xl  mx-auto p-4 space-y-4 sm:text-xs")}>
            <h1 className={getClassNames("text-xl font-bold text-center")}>{note.title}</h1>

            <div className={getClassNames("flex flex-wrap justify-center gap-4 ")}>
                <span><FolderOpenFilled className='me-2'/>Folder: {note.folder_name}</span>
                <span><ScheduleOutlined className='me-1' /> Created: {dayjs(note.created_at).format('DD MMM YYYY')}</span>
                <span><IdcardOutlined className='me-1' /> ID: {note.id}</span>
            </div>

            <div className={getClassNames("border-t pt-4 space-y-2 ")}>
                <p><UserOutlined className='me-2'/> Author: {note.user_info.username} ({note.user_info.email})</p>
                <p><HomeOutlined /> Location: {note.user_info.location}</p>
                <p><ScheduleOutlined /> DOB: {dayjs(note.user_info.date_of_birth).format('DD MMM YYYY')}</p>
                <p><InfoCircleOutlined /> Bio: {note.user_info.bio}</p>
            </div>

            
        </div>
    );
};

export default NoteDetail;
