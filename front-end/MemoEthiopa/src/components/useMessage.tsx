import { message } from 'antd';

export const useMessage = () => {

    const showMessage = (type: 'error' | 'warning' | 'success', text: string) => {
        message.open({
            type,
            content: text,
            duration: 3,
        });
    };

    return showMessage;
};
