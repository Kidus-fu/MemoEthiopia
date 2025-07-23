import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetBlogPostQuery } from "../../services/Blog/blogposts";
import BlogNavber from "../../components/Blog/BlogNavber";
import { Breadcrumb, List, Input, Button, Result, QRCode, Popover } from "antd";
import { ShareAltOutlined, FacebookFilled, TwitterSquareFilled } from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import BlogPostDetailLoading from "../../components/Blog/BlogPostDetailLoading";
import api from "../../api";
import BlogFooter from "../../components/Blog/BlogFooter";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../store/features/users/User";
import { Typography } from 'antd';
const { Paragraph } = Typography;


dayjs.extend(relativeTime);


const BlogPostDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const store = useSelector((state: RootState) => state)
    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>()
    const { data, error, isLoading } = useGetBlogPostQuery(slug!)
    const [morePosts, setMorePosts] = useState<any[]>([])
    const [postComments, setPostComments] = useState("")
    const [comentload, setComentload] = useState(false)
    const [comments, setComments] = useState<any[]>([]);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        dispatch(fetchUserData())
    }, [])
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    const handelcommentpost = () => {
        if (postComments.trim() === "") return;
        setComentload(true)
        api.post(`blog/comments/`, {
            content: postComments,
            post: data?.id,
        })
            .then((res) => {
                setComentload(false)
                console.log("Comment posted successfully:", res.data);
                // Optionally, you can update the state to reflect the new comment
                const newComment = {
                    id: res.data.id,
                    content: postComments,
                    post: data?.id,
                };
                // Update the comments in the data object
                setComments((prev) => [...prev, newComment]);
                // Clear the comment input
                setPostComments("");
            })
            .catch((error) => {
                setComentload(false)
                console.error("Error posting comment:", error);
            });
    };

    useEffect(() => {
        setComments(data?.comments || []);
        if (data?.categories && data.categories.length > 0) {
            const title = data?.categories[0].title
            api.get(`blog/posts/?category_title=${title}`)
                .then((res) => {
                    const datap = res.data.results
                    const filteredPosts = datap.reduce((acc: any[], post: any) => {
                        if (post.id !== data?.id) acc.push(post);
                        return acc;
                    }, []);
                    setMorePosts(filteredPosts.slice(0, 3));
                })
        }
    }, [data])

    if (isLoading) {
        return (
            <>
                <div className="" ref={ref}>
                    <BlogNavber />
                    <BlogPostDetailLoading />
                </div>
            </>
        )
    };
    if (error) return (
        <>
            <BlogNavber />
            <div className="flex justify-center items-center p-10 min-h-[60vh]">
                <Result
                    status="404"
                    title="Post Not Found"
                    subTitle="Sorry, we couldn't find the blog post you're looking for. It may have been removed or never existed."
                />
            </div>
        </>
    );

    return (
        <>
            <div className="">
                <BlogNavber />
            </div>
            <div className="max-w-6xl mx-auto px-4 py-20" ref={ref}>
                <Breadcrumb className="mb-4">

                    <Breadcrumb.Item><Link to={'/blog'}>Home</Link></Breadcrumb.Item>

                    <Breadcrumb.Item className="bg-gray-200 p-0.5 cursor-pointer">{data?.title}</Breadcrumb.Item>
                </Breadcrumb>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3">
                        <h1 className="text-2xl font-bold m-2">{data?.title}</h1>
                        <div className="text-sm text-gray-500 mb-4">Admin | Category |  {dayjs(data?.created_at).fromNow()}</div>
                        <img src={`https://placehold.co/1200x600?text=${data?.title}`} alt={data?.title} onDragStart={(e) => e.preventDefault()} className="rounded mb-6 w-full md:w-11/12 h-72 md:h-96" />
                        {/* <div className=" bg-gray-200 rounded mb-6"></div> */}

                        <Paragraph
                            ellipsis={{
                                rows: 3,
                                expandable: true,
                                symbol: 'Show more',
                            }}
                            className="text-gray-700 w-11/12 mb-2"
                        >
                            {data?.description?.split('\n').map((para, idx) => (
                                <p key={idx} className=" text-gray-800 leading-relaxed ">
                                    {para}
                                </p>
                            ))}

                        </Paragraph>

                        <div className="flex items-center space-x-4 mt-6">
                            <span>Share this</span>
                            <FacebookFilled className="text-blue-600 text-xl" />
                            <TwitterSquareFilled className="text-blue-400 text-xl" />
                            <Popover title="Share  this post" content={
                                <div className="flex justify-center items-center">
                                    <QRCode value={"https://memoethiopia-1.onrender.com/blog/" + data?.slug} className="ml-4" />
                                </div>
                            } >
                                <ShareAltOutlined className="text-gray-600 text-xl" />

                            </Popover>

                        </div>

                        <h2 className="text-xl font-semibold mt-10 border-t border-gray-400 pt-3 mb-4">More Posts</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                            {morePosts.length === 0 && (
                                <>
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="bg-white shadow rounded overflow-hidden">
                                            <div className="w-full h-40 bg-gray-200 animate-pulse"></div>
                                            <div className="p-4">
                                                <h3 className="font-semibold bg-gray-200 text-gray-200 animate-pulse">Post title</h3>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                            {morePosts.map((item) => (
                                <Link to={`/blog/${item.slug}`} onClick={() => ref.current?.scrollIntoView({ behavior: "smooth" })}>
                                    <div key={item} className="bg-white shadow rounded overflow-hidden">
                                        {/* <div className="w-full h-40 bg-gray-200"></div> */}
                                        <img src={item?.photo} alt={data?.title} onDragStart={(e) => e.preventDefault()} className="rounded mb-6 w-full h-full md:h-40" />
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-800">{item.title}</h3>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <h2 className="text-xl font-semibold mt-8 mb-4">Comments</h2>

                        <div className="mb-4 flex gap-2 w-11/12">
                            {store.userinfo.loggedIn ?
                                (
                                    <>
                                        <Input placeholder="Add a comment..." className={`flex-1 `} disabled={comentload} value={postComments} onChange={(e) => setPostComments(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    handelcommentpost();
                                                }
                                            }}
                                        />
                                        <Button type="primary" onClick={handelcommentpost} loading={comentload}>Submit</Button>
                                    </>
                                ) :
                                (
                                    <>
                                        <div className="flex items-center gap-2">
                                            <span>Please log in to add a comment.</span>
                                            <Link to={'/signin'}>
                                                <p className="text-gray-800  text-xs font-semibold hover:text-purple-600 px-4 py-2 border rounded-lg" >Signin</p>
                                            </Link>

                                            <Link to={'/signup'} target="_blank">
                                                <p className="text-gray-800 text-xs font-semibold border px-4 py-2 rounded-lg hover:text-purple-600 hover:border-purple-600">Signup</p>
                                            </Link>
                                        </div>

                                    </>
                                )
                            }
                        </div>

                        <List
                            className="bg-white rounded shadow "
                            itemLayout="horizontal"
                            dataSource={[...comments].sort((a, b) => b.id - a.id)}
                            renderItem={(item) => (
                                <li className="border-b border-gray-200 p-4 flex items-start space-x-3">
                                    <img
                                        // src={item?.user?.profile_picture ? `http://localhost:8000/${item.user.profile_picture}` : "https://via.placeholder.com/150"}
                                        src={`https://placehold.co/150/?text=${item.user.username[0]}`} 
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-sm">{item.user.username}</p>
                                        <p className="text-gray-700 text-sm mt-1">{item.content}</p>
                                    </div>
                                </li>
                            )}
                        />
                    </div>

                    <div className="lg:col-span-1 hidden lg:block">
                        <div className="bg-white rounded shadow p-4 sticky top-20">
                            <h3 className="font-semibold mb-2">Categories</h3>
                            <ul className="text-blue-600 space-y-1 text-sm">
                                {data?.categories.map((category: any) => (
                                    <li key={category.id}>{category.title}</li>
                                ))}
                            </ul>
                        </div>
                        {user.is_superuser && (
                            <div className="lg:col-span-1 hidden lg:block mt-3">
                                <div className="bg-white rounded shadow p-4 sticky top-20">
                                    <h3 className="font-semibold mb-2">Admin Actions</h3>
                                    <ul className="text-blue-600 space-y-1 text-sm">
                                        <li>
                                            <Link to={`/blog/newpost`} className="hover:underline">Add New Post</Link>
                                        </li>
                                        <li>
                                            <Link to={`/blog/edit/${data?.slug}`} className="hover:underline">Edit Post</Link>
                                        </li>
                                        <li>
                                            <Link to={`/blog/delete/${data?.slug}`} className="hover:underline">Delete Post</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <BlogFooter />
        </>
    )
};

export default BlogPostDetail;
