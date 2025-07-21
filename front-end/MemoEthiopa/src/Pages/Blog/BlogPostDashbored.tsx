import React, { useEffect } from 'react';
import BlogNavber from '../../components/Blog/BlogNavber';
import BlogFooter from '../../components/Blog/BlogFooter';
import BlogDashborderCategory from '../../components/Blog/BlogDashborderCategory';
import BlogDeshbordCommingSoon from './BlogDeshbordCommingSoon';
import { fetchUserData } from '../../store/features/users/User';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';




const BlogAdminDashboard: React.FC = () => {
    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchUserData())
    }, [])

    if (!user.is_superuser) {
        return (
            <>
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                    <Result status={"403"} subTitle={"Sorry this page allowed for admin only"} extra={<Link to="/blog"><Button>Go Home</Button></Link>} />
                </div>
            </>
        )
    }

    return (
        <>
            <BlogNavber />
            <div className="max-w-7xl mx-auto px-4 py-8 overflow-hidden pt-15"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                <div className="pt-10 ">
                    <BlogDashborderCategory />
                    Comming soon
                    <div className="flex justify-center items-center h-screen opacity-40 blur-xs">
                        <BlogDeshbordCommingSoon />
                    </div>
                </div>
            </div>
            <BlogFooter />
        </>
    );
};

export default BlogAdminDashboard;
