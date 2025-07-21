import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useLeaveConfirm = (isBlocking: boolean, redirectPath: string) => {
    const navigate = useNavigate();

    // Warn on refresh/close
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isBlocking) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isBlocking]);

    // Call this when you want to leave programmatically
    const confirmAndLeave = () => {
        if (isBlocking) {
            const confirmed = window.confirm('You have unsaved changes. Leave anyway?');
            if (confirmed) {
                navigate(redirectPath);
            }
        } else {
            navigate(redirectPath);
        }
    };

    return { confirmAndLeave };
};
