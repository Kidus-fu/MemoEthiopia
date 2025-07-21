import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../store/features/users/User';
import { useEffect, useState } from 'react';
import { Button, Form, Image, Input, Modal, Result, Select, Spin, Tooltip, Upload } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from "antd/es/upload/interface";
import { useGetCategoriesQuery } from '../../services/Blog/blogposts';
import api from '../../api';
import { useMessage } from '../../components/useMessage';
import BlogNavber from '../../components/Blog/BlogNavber';
import BlogFooter from '../../components/Blog/BlogFooter';

const BlogPost = () => {
    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>()
    const [loading, setloading] = useState(true)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [selectedCategories, setSelectedCategories] = useState<any[]>([])
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const navigate = useNavigate();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const { data: categories, isLoading } = useGetCategoriesQuery()

    const showMessage = useMessage()
    const beforeUpload = (file: any) => {
        const isImage =
            file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "image/webp";

        if (!isImage) {
            showMessage('error', "File must be an image (jpg, png, webp)");
            return Upload.LIST_IGNORE; // prevent from adding
        }

        const isLt3M = file.size / 1024 / 1024 < 3;
        if (!isLt3M) {
            showMessage('error', "Image must be smaller than 3MB");
            return Upload.LIST_IGNORE;
        }

        return true; // allow upload
    };

    const handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file?.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    useEffect(() => {
        dispatch(fetchUserData())
        setloading(false)
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
    // Success handler
    const onFinish = (values: any) => {
        setloading(true);
        const formData = new FormData();
        if (fileList[0]?.originFileObj) {
            formData.append('photo', fileList[0].originFileObj); // key must match your Django serializer field
        }

        formData.append('title', values.title);
        formData.append('description', values.description);
        values.categories.forEach((catId: any) => {
            formData.append('category_ids', catId);
        });
        api.post('blog/posts/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                showMessage('success', 'Post created successfully!');
                setloading(false);
                setFileList([]);
                setTitle('');
                setDescription('');
                setSelectedCategories([]);
                navigate(`/blog/${response.data.slug}`);
                // Optionally reset form or redirect
            })
            .catch(error => {
                console.error('Error creating post:', error);
                setloading(false);
                showMessage('error', 'Failed to create post.');
            });
        showMessage('success', 'perfict')
    };

    return (
        <>
            <Spin fullscreen={true} spinning={loading} tip="Loading..." />
            <Modal
                open={previewOpen}
                title={'Uploaded Image'}
                footer={null}
                width={750}
                onCancel={() => setPreviewOpen(false)}
            >
                <div className="flex justify-center items-center gap-5">
                    <Image
                        alt={previewTitle}
                        src={previewImage}
                        preview={false}
                        height={320}
                        className="w-full "
                    />
                    <div className="">
                        <div className="max-w-md mx-auto  rounded-2xl overflow-hidden shadow-lg">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="text-left py-2 px-4 text-sm font-semibold text-gray-700">Key</th>
                                        <th className="text-left py-2 px-4 text-sm font-semibold text-gray-700">Value</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="py-2 px-4 text-sm text-gray-600">uid</td>
                                        <td className="py-2 px-4 text-sm text-gray-800">{fileList[0]?.uid}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 text-sm text-gray-600">lastModified</td>
                                        <td className="py-2 px-4 text-sm text-gray-800">{fileList[0]?.lastModified}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 text-sm text-gray-600">lastModifiedDate</td>
                                        <td className="py-2 px-4 text-sm text-gray-800">{fileList[0]?.lastModifiedDate ? fileList[0].lastModifiedDate.toLocaleString() : ''}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 text-sm text-gray-600">name</td>
                                        <td className="py-2 px-4 text-sm text-gray-800">{fileList[0]?.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 text-sm text-gray-600">size</td>
                                        <td className="py-2 px-4 text-sm text-gray-800">{Math.round((fileList[0]?.size ?? 0) / 1024)} kb</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 text-sm text-gray-600">type</td>
                                        <td className="py-2 px-4 text-sm text-gray-800">{fileList[0]?.type}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 text-sm text-gray-600">percent</td>
                                        <td className="py-2 px-4 text-sm text-gray-800">{fileList[0]?.percent}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </Modal>
            <BlogNavber />
            <section className="overflow-hidden pt-28 pb-12 lg:pt-24 lg:pb-24 px-1 lg:px-20 bg-white min-h-screen ">
                <Button type='text' onClick={() => navigate(-1)}> <ArrowLeftOutlined /> </Button>
                <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-6 w-full lg:w-7/12">
                    <h1 className="text-2xl lg:text-3xl font-bold text-center mb-6">Create New Blog Post</h1>
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={(errorInfo) => { showMessage('error', errorInfo.errorFields[0].errors[0]); }}
                    >
                        {/* Photo Upload */}
                        <Form.Item
                            label={<><div className="">Photo<small className='cursor-help text-blue-500'><Tooltip title="Please upload images under 3 MB. Supported types: PNG, JPG, WEBP"><InfoCircleOutlined className="ml-2 text-blue-500" /></Tooltip></small></div></>}
                            name="photo"
                            valuePropName="fileList"
                            rules={[{ required: true, message: 'Please enter blog image' }]}
                            getValueFromEvent={(e) => {
                                return e && e.fileList;
                            }}
                        >
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                onChange={({ file, fileList }) => {
                                    if (file.status === 'error') {
                                        file.status = 'done';
                                        delete file.response;
                                    }
                                    setFileList(fileList)
                                }}
                                onPreview={handlePreview}
                                beforeUpload={beforeUpload}

                            >
                                {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                        </Form.Item>

                        {/* Title and Categories */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item
                                label="Title"
                                name="title"
                                rules={[{ required: true, message: 'Please enter your post title' }]}
                            >
                                <Input
                                    placeholder="Enter your post title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Categories"
                                name="categories"
                                rules={[{ required: true, message: 'Please choose a category' }]}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    placeholder="Select categories"
                                    value={selectedCategories}
                                    options={categories?.results.map((category: any) => ({
                                        label: category.title,
                                        value: category.id
                                    }))}
                                    loading={isLoading}
                                    onChange={setSelectedCategories}
                                />
                            </Form.Item>
                        </div>

                        {/* Description */}
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please enter your post description' }]}
                        >
                            <div style={{ position: 'relative' }}>
                                <Input.TextArea
                                    rows={6}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Write your post description..."
                                    style={{ resize: 'none', paddingRight: 80 }} // space so text doesn’t go under button
                                />
                                <Button
                                    type="text"
                                    style={{ position: 'absolute', bottom: 8, right: 8 }}
                                    onClick={() => {
                                        // get the current value from form or however you manage state
                                        console.log('AI analysis triggered');
                                    }}
                                >
                                    <small style={{ color: '#1D4ED8' }}>AI analysis ✨</small>
                                </Button>
                            </div>
                        </Form.Item>


                        {/* Submit Button */}
                        <Form.Item>
                            <div className="flex justify-end">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                >
                                    Publish Post
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </section>

            <BlogFooter />
        </>
    );
}

export default BlogPost;