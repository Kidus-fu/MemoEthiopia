import React from 'react';
import { useGetCategoriesQuery } from '../../services/Blog/blogposts';
import { Button, Result } from 'antd';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ArrowRightOutlined } from '@ant-design/icons';
import BlogFooter from './BlogFooter';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BlogListLoading from './BlogListLoading';
import BlogSearch from './BlogSerach';
import GoogleAd from './GoogleTest';

dayjs.extend(relativeTime);

const BlogList: React.FC = () => {
    const { data: posts, error, isLoading } = useGetCategoriesQuery();
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get("search");

    const handleReload = () => {
        navigate(0); // Reloads the current route
    };
    if (isLoading) {
        return (
            <BlogListLoading />
        )
    }
    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8 overflow-hidden mt-15"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                <div className="flex justify-center items-center">
                    <div className="">
                        <Result status={"500"} subTitle={typeof error === 'object' && error !== null && 'message' in error
                            ? (error as { message?: string }).message
                            : 'An error occurred while fetching blog posts.'} extra={<Button draggable={"true"} onClick={handleReload}>Reload</Button>} />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="max-w-7xl mx-auto sm:px-4 sm:text-sm sm:py-4 overflow-hidden mt-15"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                {search ?
                    <>
                        <div className='flex justify-center border-b py-2 border-gray-300'>
                            <h1 className='text-2xl'>Searching :- {search}</h1>
                        </div>
                        <BlogSearch SearchPromt={search} />
                    </>
                    :
                    <div className=" sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 ">
                        {posts?.results?.map((category: any) => (
                            <div key={category.id} className="mb-10 ">
                                <div className="flex justify-between ">
                                    {/* Category Title */}
                                    <h3 className="text-2xl  font-bold ms-4 text-gray-800 mb-4  pb-2">
                                        {category.title}
                                    </h3>
                                    <Link to={`/blog/category/${category.title}`}>
                                        <h2 className='text-sm text-[#18A0FB] me-14 cursor-pointer'>more <ArrowRightOutlined /></h2>
                                    </Link>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 px-6 lg:grid-cols-3 mt-1 gap-6">
                                    {category.posts.map((post: any) => (
                                        <div
                                            key={post.id}
                                            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
                                            <img
                                                onDragStart={(e) => e.preventDefault()}
                                                // src={post.photo}
                                                src={`https://placehold.co/600x400?text=${post?.title}`}
                                                alt={post.title}
                                                className="w-full h-64 object-cover" />
                                            <div className="p-4 flex flex-col flex-1">
                                                <div className="flex justify-between p-1">
                                                    <div className="">
                                                        <h3 className="text-md font-semibold text-gray-800">
                                                            {post.title}
                                                        </h3>
                                                        <div className="flex gap-3.5">
                                                            <small className='text-sm text-[#6DE4EA]'>Admin</small>
                                                            <small className='text-sm opacity-50'>{dayjs(post.created_at).fromNow()}</small>
                                                        </div>
                                                    </div>
                                                    <div className="text-[#18A0FB]">
                                                        {category.title}
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 mt-2 flex-1">
                                                    {post.description.slice(0, 100)}...
                                                </p>
                                                <Link to={`${post.slug}/`}>
                                                    <Button type='link'>
                                                        Read More →
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                    <GoogleAd />
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
            <BlogFooter />
        </>

    );
};

export default BlogList;
