import React from 'react';
import dayjs from 'dayjs';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { FolderFilled, HomeFilled, IdcardFilled, InfoCircleFilled,  ScheduleFilled, UserOutlined } from '@ant-design/icons';

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
    folder: string;
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
        <div className={getClassNames("max-w-2xl  mx-auto p-4 space-y-4")}>
            <h1 className={getClassNames("text-3xl font-bold text-center")}>{note.title}</h1>

            <div className={getClassNames("flex flex-wrap justify-center gap-4 text-sm")}>
                <span><FolderFilled className='me-2'/>Folder: {note.folder}</span>
                <span><ScheduleFilled className='me-1' /> Created: {dayjs(note.created_at).format('DD MMM YYYY')}</span>
                <span><IdcardFilled className='me-1' /> ID: {note.id}</span>
            </div>

            <div className={getClassNames("border-t pt-4 space-y-2 text-sm")}>
                <p><UserOutlined className='me-2'/> Author: {note.user_info.username} ({note.user_info.email})</p>
                <p><HomeFilled /> Location: {note.user_info.location}</p>
                <p><ScheduleFilled /> DOB: {dayjs(note.user_info.date_of_birth).format('DD MMM YYYY')}</p>
                <p><InfoCircleFilled /> Bio: {note.user_info.bio}</p>
            </div>

            <a href={note.absolute_url} target="_blank" rel="noopener noreferrer" className={getClassNames("text-blue-600 underline block text-center")}>
                View on MemoEthiopia
            </a>
        </div>
    );
};

export default NoteDetail;
