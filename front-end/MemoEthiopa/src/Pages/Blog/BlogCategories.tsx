import React, { useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb, Button,  Result, Skeleton } from 'antd';
import BlogNavber from '../../components/Blog/BlogNavber';
import BlogFooter from '../../components/Blog/BlogFooter';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useGetBlogPostbycategoryQuery } from '../../services/Blog/blogposts';
import BlogSearchLoading from '../../components/Blog/BlogSearchLoading';

dayjs.extend(relativeTime);


const BlogCategoriesFilter: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data: categoriesData, isLoading, error } = useGetBlogPostbycategoryQuery(slug!);
    const navigate = useNavigate();
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, []);
    const handleReload = () => {
        navigate(0);
    };

    if (isLoading) {
        return (
            <>
                <BlogNavber />
                <div className="max-w-7xl mx-auto px-4 py-8 overflow-hidden pt-15"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    ref={ref}
                >
                    <Skeleton.Input active={true} />
                    <BlogSearchLoading />
                </div>
                <BlogFooter />
            </>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8 overflow-hidden mt-15"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                ref={ref}
            >
                <div className="flex justify-center items-center">
                    <div className="">
                        <Result status={"500"} subTitle={typeof error === 'object' && error !== null && 'message' in error
                            ? (error as { message?: string }).message
                            : 'An error occurred while fetching blog posts.'} extra={<Button draggable={"true"} onClick={handleReload}>Reload</Button>} />
                    </div>
                </div>
            </div>
        )}

    return (
        <>
            <BlogNavber />
            <div className="max-w-7xl mx-auto px-4 py-8 overflow-hidden pt-20"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                ref={ref}
            >
                <div className=" sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 ">
                    <div className="mb-10 ">
                        <div className="flex justify-between ms-5">
                            {/* Category Title */}
                            <Breadcrumb className="mb-8 ">
                                <Breadcrumb.Item><Link to={'/blog'}>Home</Link></Breadcrumb.Item>
                                <Breadcrumb.Item className="bg-gray-200 p-0.5 cursor-pointer">{slug}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 px-6 lg:grid-cols-3 mt-6 gap-6">
                        {categoriesData?.results.map((post: any) => (
                            <div
                                key={post.id}
                                className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
                                <img
                                    onDragStart={(e) => e.preventDefault()}
                                    src={post.photo}
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
                                        <div className="text-[#18A0FB] flex flex-wrap gap-2">
                                            {slug}
                                        </div>

                                    </div>
                                    <p className="text-gray-600 mt-2 flex-1">
                                        {post.description.slice(0, 100)}...
                                    </p>
                                    <Link to={`/blog/${post.slug}/`}>
                                        <Button type='link'>
                                            Read More →
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                        
                    </div>
                    <div className="flex justify-center items-center">
                            <Button type="text"  className="mt-4" >
                                 Previous 
                            </Button>
                            <Button type="text"  className="mt-4">
                                Next 
                            </Button>

                        </div>
                </div>
            </div>
            <BlogFooter />
        </>
    );
};

export default BlogCategoriesFilter;
