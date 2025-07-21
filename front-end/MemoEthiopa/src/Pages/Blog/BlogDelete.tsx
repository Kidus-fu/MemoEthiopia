import React, { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useGetBlogPostQuery } from '../../services/Blog/blogposts';
import { Link,  useNavigate,  useParams } from 'react-router-dom';
import { fetchUserData } from '../../store/features/users/User';
import { Button, Input, Result, Spin } from 'antd';
import BlogNavber from '../../components/Blog/BlogNavber';
import BlogFooter from '../../components/Blog/BlogFooter';
import api from '../../api';
import { useMessage } from '../../components/useMessage';

const BlogDelete: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const user = useSelector((state: RootState) => state.user)
    const { data, error, isLoading } = useGetBlogPostQuery(slug!)
    const navigate = useNavigate();
    const showMessage = useMessage()
    const dispatch = useDispatch<AppDispatch>()
    const [loading, setloading] = useState(true)
    const [confirmText, setConfirmText] = useState('')
    const [confirmTextChanged, setConfirmTextChanged] = useState(false)

    useEffect(() => {
        dispatch(fetchUserData())
        setloading(false)
        if (confirmText === data?.title) {
            setConfirmTextChanged(true)
        }else {
            setConfirmTextChanged(false)
        }
    }, [])
    const handelDelete = () => {
        setloading(true)
        api.delete(`/blog/posts/${data?.slug}/`)
            .then(() => {
                setloading(false)
                showMessage("success", 'post deleted successfully')
                window.location.href = '/blog';
            })
            .catch((error:any) => {
                setloading(false)
               showMessage("error",`something went wrong while deleting the post ${error.message}`) 
            });
    }
    if (!user.is_superuser && user.is_superuser !== null) {
        return (
            <>
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                    <Result status={"403"} subTitle={"Sorry this page allowed for admin only"} extra={<Link to={'/blog'}><Button type='link'>Go Home</Button></Link>} />
                </div>
            </>
        )
    }
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spin fullscreen={true} spinning={true} size='small' tip="Loading..." />
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Result status={"500"} subTitle={typeof error === 'object' && error !== null && 'message' in error
                    ? (error as { message?: string }).message
                    : 'An error occurred while fetching the blog post.'} extra={<Link to={'/blog'}><Button type='link'>Go Home</Button></Link>} />
            </div>
        );
    }
    return (
        <>
        <Spin fullscreen={true} spinning={loading} size='small'/>
        <BlogNavber />
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4">Delete Blog Post <span className='text-sm underline'>{data?.title}</span></h2>
                <p className="mb-6 text-sm text-gray-700">
                    Are you sure you want to delete this blog post? This action cannot be undone.
                    Please type <span className="font-semibold text-red-600 ">'{data?.title}'</span> in the box to confirm.
                </p>

                <div className="my-3">
                    <Input className='' value={confirmText} onChange={(e) => {
                        setConfirmText(e.target.value)
                        //check a text 
                        if (e.target.value === data?.title) {
                            setConfirmTextChanged(true)
                        }else{
                            setConfirmTextChanged(false)
                        }
                    }} />
                </div>
                <div className="flex justify-end space-x-4">
                    <Button danger={true} type='primary' disabled={!confirmTextChanged} onClick={handelDelete}>Yes, I'm sure</Button>
                    <Button type='default' onClick={() => navigate(-1)}>No, take me back</Button>
                </div>
            </div>
        </div>
        <BlogFooter />
        </>
    );
};

export default BlogDelete;