import React, { useEffect } from 'react';
import BlogList from '../../components/Blog/BlogList';
import BlogNavber from '../../components/Blog/BlogNavber';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../store/features/users/User';

const Blog: React.FC = () => {
    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        document.title = "Blog"
        dispatch(fetchUserData())
        user
    }, [])

    return (
        <main className="flex-1 overflow-hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
            {/* your content here */}
            <div className="">
                <BlogNavber />
            </div>
            <BlogList />
        </main>
        
    );
};

export default Blog;