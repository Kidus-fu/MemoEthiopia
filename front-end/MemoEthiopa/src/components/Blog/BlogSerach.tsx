import React, { useEffect, useState } from 'react';
import api from '../../api';
import BlogSearchLoading from './BlogSearchLoading';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Result } from 'antd';

dayjs.extend(relativeTime);
interface BlogSearchProps {
    SearchPromt: string
}

const BlogSearch: React.FC<BlogSearchProps> = ({ SearchPromt }) => {
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])

    const handelpostsGet = () => {
        setLoading(true)
        api.get(`blog/posts/?search=${SearchPromt}`)
            .then((res) => {
                if (res.status == 200) {
                    setLoading(false)
                    setPosts(res.data.results)
                }
            })
    }
    const highlightTitle = (title: string) => {
        const words = title.split(" "); // splits the title into words

        return words.map((word, index) => {
            if (word.toLowerCase().includes(SearchPromt.toLowerCase())) {
                // if this word includes the searchPrompt (case-insensitive)
                return (
                    <span key={index} className="bg-yellow-400">
                        {word}{" "}
                    </span>
                );
            } else {
                // if it doesn't match, return the word with a space
                return word + " ";
            }
        });
    };

    useEffect(() => {
        handelpostsGet()
    }, [SearchPromt])
    return (
        <>
        
            {loading ?
                (<BlogSearchLoading />) : (
                    <div className="max-w-7xl mx-auto sm:px-4 sm:text-sm py-1 overflow-hidden mt-5"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                        {posts.length === 0 && (
                            <div className="flex justify-center items-center w-full">
                                <Result status={"404"} subTitle={`No results found for "${SearchPromt}" `} />
                            </div>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 px-6 lg:grid-cols-3 mt-6 gap-6">

                            {posts.map((post: any) => (
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
                                                    {highlightTitle(post.title)}
                                                </h3>
                                                <div className="flex gap-3.5">
                                                    <small className='text-sm text-[#6DE4EA]'>Admin</small>
                                                    <small className='text-sm opacity-50'>{dayjs(post.created_at).fromNow()}</small>
                                                </div>
                                            </div>
                                            <div className="text-[#18A0FB]">

                                            </div>
                                        </div>
                                        <p className="text-gray-600 mt-2 flex-1">
                                            {post.description.slice(0, 100)}...
                                        </p>
                                        <a
                                            href={`/blog/${post.slug}`}
                                            className="text-purple-600 mt-4 text-sm font-medium hover:underline">
                                            Read More →
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>)}
        </>
    );
};

export default BlogSearch;