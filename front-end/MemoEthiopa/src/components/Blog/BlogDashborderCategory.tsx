import React, {  useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input, Modal, Result, Skeleton } from 'antd';
import { useGetCategoriesQuery } from '../../services/Blog/blogposts';
import { DeleteFilled, EditFilled, EyeFilled, PlusOutlined } from '@ant-design/icons';
import { useMessage } from '../useMessage';
import api from '../../api';


const BlogDashborderCategory: React.FC = () => {    
    const { data: posts, error, isLoading } = useGetCategoriesQuery();
    
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categoryDelID, setCategoryDelID] = useState<number | null>(null);
    const [title, setTitle] = useState('');
    const [currentTitle, setCurrentTitle] = useState('');
    const [description, setDescription] = useState('');
    const [currentDescription, setCurrentDescription] = useState('');
    const [confirmText, setConfirmText] = useState('')
    const [confirmTextChanged, setConfirmTextChanged] = useState(false)
    const showMessage = useMessage()

    const showModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleOk = () => {
        console.log('Confirmed!');
        setIsCreateModalOpen(false);
    };

    const handleCancel = () => {
        setIsCreateModalOpen(false);
    };
    const handleDeleteCategory = () => {
        setLoading(true);
        api.delete(`/blog/categories/${categoryDelID}/`)
            .then(() => {
                setLoading(false);
                showMessage('success', 'Category deleted successfully!');
                setTitle('');
                setConfirmText('');
                setIsDeleteModalOpen(false);
                window.location.reload();
            })
            .catch(error => {
                setLoading(false);
                showMessage('error', `Failed to delete category: ${error.message}`);
            });
    }
    const handleEditSubmit = () => {
     if (title === currentTitle && description === currentDescription) {
            showMessage('warning', 'No changes made to the category.');
            return;
        }  
        setLoading(true);
        api.put(`/blog/categories/${categoryDelID}/`, {
            title: title,
            description: description,
        })
            .then(response => {
                console.log('Category updated:', response.data);
                showMessage('success', 'Category updated successfully!');
                setTitle('');
                setDescription('');
                setLoading(false);
                setIsEditModalOpen(false);
                window.location.reload();
            })
            .catch(error => {
                console.error('Error updating category:', error);
                showMessage('error', 'Failed to update category.');
            });

    }
    const handleSubmit = () => {
        setLoading(true);
        api.post('/blog/categories/', {
            title: title,
            description: description,
        })
            .then(response => {
                console.log('Category created:', response.data);
                showMessage('success', 'Category created successfully!');
                setTitle('');
                setDescription('');
                setLoading(false);
                window.location.reload();
                setIsCreateModalOpen(false);
            })
            .catch(error => {
                console.error('Error creating category:', error);
                showMessage('error', 'Failed to create category.');
            });
        // Here you would typically send the data to your backend
    };
    if (error) {
        return (
            <div className="">
                <Result
                    status="500"
                    subTitle={typeof error === 'object' && error !== null && 'message' in error
                        ? (error as { message?: string }).message
                        : 'An error occurred while fetching categories.'}
                    extra={<Button draggable={"true"} onClick={() => window.location.reload()}>Reload</Button>}
                />
            </div>
        );
    }
    
    
    

    return (
        <div className="border-b border-gray-200">
            {/* Create Modal */}
            <Modal
                title={<span className="text-lg font-semibold">Create Category</span>}
                open={isCreateModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                mask={true}
                okText="Confirm"
                cancelText="Cancel"
            >
                <Form
                    layout="vertical"
                    disabled={loading}
                    name="create_post_form"
                    onFinish={handleSubmit}
                    onFinishFailed={(errorInfo) => { showMessage('error', errorInfo.errorFields[0].errors[0]); }}
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        initialValue={title}
                        rules={[{ required: true, message: 'Please enter a title' }]}
                    >
                        <Input placeholder="Enter post title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        initialValue={description}
                        rules={[{ required: true, message: 'Please enter a description' }]}
                    >
                        <Input.TextArea placeholder="Enter post description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Item>
                    <Form.Item >
                        <div className='flex justify-end gap-2.5'>
                            <Button type="default" onClick={handleCancel} disabled={loading}>
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Submit
                            </Button>
                        </div>
                    </Form.Item>

                </Form>
            </Modal>
            {/* Edit Modal */}
            <Modal
                title={<span className="text-lg font-semibold">Edit Category</span>}
                open={isEditModalOpen}
                onCancel={() => {
                    setTitle('')
                    setDescription('')
                    setIsEditModalOpen(false)
                }}
                footer={null}
                mask={true}
                maskClosable={false}
                okText="Confirm"
                cancelText="Cancel"
            >
                <Form
                    layout="vertical"
                    disabled={loading}
                    name="create_post_form"
                    onFinish={handleEditSubmit}
                    onFinishFailed={(errorInfo) => { showMessage('error', errorInfo.errorFields[0].errors[0]); }}
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        initialValue={title}
                        rules={[{ required: true, message: 'Please enter a title' }]}
                    >
                        <Input placeholder="Enter post title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        initialValue={description}
                        rules={[{ required: true, message: 'Please enter a description' }]}
                    >
                        <Input.TextArea placeholder="Enter post description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Item>
                    <Form.Item >
                        <div className='flex justify-end gap-2.5'>
                            <Button type="default" onClick={handleCancel} disabled={loading}>
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Submit
                            </Button>
                        </div>
                    </Form.Item>

                </Form>
            </Modal>
            {/* Delete Modal */}
            <Modal
                closable={false}
                title={<span className="text-lg font-semibold">Delete Category</span>}
                open={isDeleteModalOpen}
                onClose={() => {
                    setTitle('')
                    setConfirmText('')
                    setCategoryDelID(null)
                    setIsDeleteModalOpen(false)
                }}
                footer={null}
                mask={true}
                maskClosable={false}
                cancelText="Cancel"
            >
                <div className="flex items-center justify-center ">
                    <div className="bg-white p-8 rounded  w-full max-w-lg">

                        <p className="mb-6 text-sm text-gray-700">
                            Are you sure you want to delete this blog category? This action cannot be undone.
                            Please type <span className="font-semibold text-red-600 ">'{title}'</span> in the box to confirm.
                        </p>

                        <div className="my-3">
                            <Input className='' disabled={loading} value={confirmText} onChange={(e) => {
                                setConfirmText(e.target.value)
                                //check a text 
                                if (e.target.value === title) {
                                    setConfirmTextChanged(true)
                                } else {
                                    setConfirmTextChanged(false)
                                }
                            }} />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <Button danger={true} type='primary' disabled={!confirmTextChanged} loading={loading} onClick={handleDeleteCategory} >Yes, I'm sure</Button>
                            <Button type='default' onClick={() => {
                                setTitle('')
                                setConfirmText('')
                                setCategoryDelID(null)
                                setConfirmTextChanged(false)
                                setIsDeleteModalOpen(false)
                            }}>No, take me back</Button>
                        </div>
                    </div>
                </div>
            </Modal>
            <h1 className="text-2xl font-bold mb-4">Categories</h1>
            <div className="flex justify-end px-6">
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    className="mb-4"
                    onClick={showModal}
                >
                    Create Category
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {isLoading
                    ? Array.from({ length: 3 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm"
                        >
                            <Skeleton active />
                        </div>
                    ))
                    : posts?.results.map((category: any) => (
                        <div
                            key={category.id}
                            className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-1 text-center">
                                    {category?.title}
                                </h3>
                                <p className="text-gray-500 text-sm text-center">{category?.description}</p>
                                <p className="text-gray-500 text-sm text-center">
                                    Total Posts: {category?.posts.length}
                                </p>
                            </div>
                            <div className="mt-2 flex justify-center gap-0.5">
                                <Link to={`/blog/category/${category?.slug}`}>
                                    <Button type="text" size="small">
                                        <EyeFilled />
                                    </Button>
                                </Link>
                                    <Button type="text" size="small"
                                        onClick={() => {
                                            setIsEditModalOpen(true);
                                            setTitle(category?.title);
                                            setDescription(category?.description);
                                            setCurrentTitle(category?.title);
                                            setCategoryDelID(category?.id);
                                            setCurrentDescription(category?.description);
                                        }}>
                                        <EditFilled />
                                    </Button>
                                <Button type="text" size="small" danger onClick={() => {
                                    setIsDeleteModalOpen(true)
                                    setCategoryDelID(category?.id)
                                    setTitle(category?.title)
                                }}>
                                    <DeleteFilled />
                                </Button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default BlogDashborderCategory;