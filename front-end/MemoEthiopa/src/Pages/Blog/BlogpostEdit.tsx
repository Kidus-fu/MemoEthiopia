import React, {  useState } from 'react';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import type { UploadFile } from 'antd/es/upload/interface';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMessage } from '../../components/useMessage';
import { useGetBlogPostQuery, useGetCategoriesQuery } from '../../services/Blog/blogposts';
import BlogNavber from '../../components/Blog/BlogNavber';
import BlogFooter from '../../components/Blog/BlogFooter';
import {
    Button, Form, Image, Input, Modal, Result, Select, Spin, Tooltip, Upload,
} from 'antd';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import api from '../../api';

const BlogpostEdit: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const showMessage = useMessage();
    const user = useSelector((state: RootState) => state.user);
    const { data, error, isLoading } = useGetBlogPostQuery(slug!);

    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(data?.title || '');
    const [description, setDescription] = useState(data?.description || '');
    const [selectedCategories, setSelectedCategories] = useState<any[]>(data?.categories.map((cat: any) => cat.id) || []);
    const [fileList, setFileList] = useState<UploadFile[]>(data?.photo ? [{ uid: '-1', name: 'photo', status: 'done', url: data.photo }] : []);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const {  data:categories, isLoading: isLoadingCategories } = useGetCategoriesQuery();

    const beforeUpload = (file: UploadFile) => {
        const isValid = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type ?? '');
        if (!isValid) {
            showMessage('error', 'File must be an image (JPG, PNG, WEBP)');
            return Upload.LIST_IGNORE;
        }
        const isLt3M = (file.size ?? 0) / 1024 / 1024 < 3;
        if (!isLt3M) {
            showMessage('error', 'Image must be smaller than 3MB');
            return Upload.LIST_IGNORE;
        }
        return true;
    };

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as Blob);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name ?? 'Image Preview');
    };

    if (isLoading) (
        <div className="flex items-center justify-center h-screen">
            <Spin fullscreen={true} spinning={true} size='small' tip="Loading..." />
        </div>
    )

    if (!user.is_superuser ) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <Result
                    status="403"
                    subTitle={"Sorry this page allowed for admin only"}
                    extra={<Link to="/blog"><Button>Go Home</Button></Link>}
                />
            </div>
        );
    }


    if (error) {
        return (
            <>
                <Spin fullscreen={true} spinning={loading || isLoadingCategories} size='small' />
                <BlogNavber />
                <div className="flex justify-center items-center min-h-[60vh] p-6">
                    <Result
                        status="404"
                        title="Post Not Found"
                        subTitle="The requested blog post could not be found."
                        extra={<Link to="/blog"><Button type="primary">Go Home</Button></Link>}
                    />
                </div>
                <BlogFooter />
            </>
        );
    }

    
    const arraysEqual = (a: number[], b: number[]) => {
        if (a.length !== b.length) return false;
        const sortedA = [...a].sort();
        const sortedB = [...b].sort();
        return sortedA.every((value, index) => value === sortedB[index]);
    };


    const handelfinish = (values: any) => {
        const currentCategories = data?.categories?.map((cat: any) => cat.id) ?? [];
        const isPhotoChanged = fileList[0]?.originFileObj ? true : false;
        if (
            data?.title.trim() !== title.trim() ||
            data?.description.trim() !== description.trim() ||
            !arraysEqual(currentCategories, selectedCategories) ||
            isPhotoChanged
        ) {
            setLoading(true);
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            // formData.append('category', JSON.stringify(selectedCategories));
            values.categories.forEach((catId: any) => {
                formData.append('category_ids', catId);
            });
            if (fileList.length > 0 && fileList[0].originFileObj as Blob !== undefined) {
                formData.append('photo', fileList[0].originFileObj as Blob);
            }

            for (let pair of formData.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
            }

            api.put(`/blog/posts/${data?.slug}/`, formData
                , {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
                .then((res) => {
                    setLoading(false);
                    showMessage("success", 'Post updated successfully');
                    window.location.href = `/blog/${res.data.slug}/`;
                })
                .catch((error: any) => {
                    setLoading(false);
                    showMessage("error", `Error updating post: ${error.message}`);
                });
        }else {
            showMessage("warning",' No changes made to the post');
        }
    };
    return (
        <>
        <Spin fullscreen={true} spinning={loading || isLoadingCategories} size='small' />
            <BlogNavber />
            <section className="pt-24 pb-16 px-4 bg-white min-h-screen">
                <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-center mb-6">Edit Blog Post</h1>
                    <Form
                        layout="vertical"
                        disabled={loading}
                        onFinish={handelfinish}
                        onFinishFailed={(errorInfo) => { showMessage('error', errorInfo.errorFields[0].errors[0]); }}
                    >
                        <Form.Item
                            label={<span>Photo <Tooltip title="JPG, PNG, WEBP under 3MB."><InfoCircleOutlined className="ml-1 text-blue-500" /></Tooltip></span>}
                            name="photo"
                            valuePropName="fileList"
                            rules={[{ required: true }]}
                            getValueFromEvent={(e) => e?.fileList}
                            initialValue={data?.photo ? [{ uid: '-1', name: 'photo', status: 'done', url: data.photo }] : []}
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
                                {fileList.length >= 1 ? null : (
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                )}
                            </Upload>
                        </Form.Item>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item label="Title" name="title" rules={[{ required: true , max: 50 }]} initialValue={data?.title}>
                                <Input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100}   />
                            </Form.Item>
                            <Form.Item label="Categories" name="categories" rules={[{ required: true }]} initialValue={data?.categories.map((cat: any) => cat.id)}>
                                <Select
                                    mode="multiple"
                                    allowClear
                                    placeholder="Select categories"
                                    value={selectedCategories} // This pre-selects them
                                    options={
                                        categories?.results ?.map((category: any) => ({
                                            label: category.title,
                                            value: category.id,
                                        }))
                                    }
                                    onChange={setSelectedCategories}
                                />

                            </Form.Item>
                        </div>

                        <Form.Item label="Description" name="description" rules={[{ required: true }]} initialValue={data?.description}>
                            <div style={{ position: 'relative' }}>
                                <Input.TextArea
                                    rows={9}
                                    placeholder="Write your post description..."
                                    style={{ resize: 'none', paddingRight: 80}}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <Button
                                    type="text"
                                    style={{ position: 'absolute', bottom: 2, right: 2 }}
                                    onClick={() => {
                                        // get the current value from form or however you manage state
                                        console.log('AI analysis triggered');
                                    }}
                                >
                                    <small style={{ color: '#1D4ED8' }}>AI analysis ✨</small>
                                </Button>
                            </div>
                        </Form.Item>

                        <Form.Item>
                            <div className="flex justify-end gap-2">
                                <Button type="default" loading={loading} htmlType="submit">
                                    Save Changes
                                </Button>
                                <Button type="text" disabled={loading}
                                    onClick={() => navigate(-1)}> No, take me back
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </section>
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

            <BlogFooter />
        </>
    )
};

export default BlogpostEdit;
