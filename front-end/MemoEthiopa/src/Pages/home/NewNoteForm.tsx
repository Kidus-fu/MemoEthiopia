import React, { useState } from 'react';
import { Form, Input, Select, Button, Modal, ConfigProvider, theme as antdTheme } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { CloseOutlined } from '@ant-design/icons';

interface AddNoteFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (values: any) => void;
    folders: any[];
    theme: 'light' | 'dark' | string;
    user: any;
    loading: boolean;
}

const AddNoteForm: React.FC<AddNoteFormProps> = ({ open, onClose, folders, theme, user, onSubmit, loading }) => {
    const [form] = useForm();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleFinish = (values: any) => {
        onSubmit(values);
        form.resetFields();
        onClose();
    };

    const handleCancel = () => {
        setShowConfirm(true);
    };

    const confirmClose = () => {
        setShowConfirm(false);
        form.resetFields();
        onClose();
    };

    return (
        <ConfigProvider
            theme={{
                algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
                token: {
                    colorBgMask: "rgba(0,0,0,0.5)",
                    colorPrimary: "#1760F1"
                }
            }}
        >
            
            <Modal
                open={open}
                title="Create New AI Note"
                onCancel={handleCancel}
                footer={null}
                closeIcon={<CloseOutlined />}
                width={600}
                centered
                styles={{
                    body: { paddingTop: 16 },
                }}
            >
                {/* Confirm Close Modal */}
                <Modal
                    centered
                    open={showConfirm}
                    onCancel={() => setShowConfirm(false)}
                    onClose={() => setShowConfirm(false)}
                    footer={null}
                    width={300}
                    maskClosable={false}
                    styles={{
                        body: { padding: 4, borderRadius: 12 },
                        content: { borderRadius: 12 },
                        mask: { backdropFilter: "blur(3px)" }
                    }}
                >
                    
                    <div className="text-center p-4 space-y-4">
                        <p className="text-base font-medium">Are you sure you want to close without saving?</p>
                        <div className="flex gap-2 justify-center">
                            <Button type="primary" onClick={() => {
                                setShowConfirm(false)
                                setTimeout(() => {
                                    confirmClose()
                                }, 10)
                            }}
                                danger >
                                Yes, Close
                            </Button>
                            <Button onClick={() => setShowConfirm(false)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Modal>

                {/* Main Form */}
                
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                    disabled={loading}
                    className="sm:text-xs text-xl"
                >
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-4">
                        <Form.Item
                            name="title"
                            label="Title"
                            tooltip="Add a label to easily identify this note later."
                            rules={[{ required: true, message: 'Please select a Title.' }]}
                        >
                            <Input placeholder="E.g. Adiss Ababa Hotels" />
                        </Form.Item>

                        <Form.Item
                            label="Author"
                        >
                            <Input
                                value={user?.usermore?.username || "Undefined"}
                                readOnly
                            />
                        </Form.Item>

                        <Form.Item
                            name="folder"
                            label="Select Folder"
                            rules={[{ required: true, message: 'Please select a folder.' }]}
                        >
                            <Select placeholder="Select a folder for this note">
                                {folders.map(folder => (
                                    <Select.Option key={folder.id} value={folder.id}>
                                        {folder.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="prompt"
                        label="Prompt for AI Note Generation"
                        rules={[{ required: true, message: "Please enter a prompt to generate your note." }]}
                    >
                        <Input.TextArea
                            rows={5}
                            placeholder="Describe what you want the AI to generate for your note..."
                            style={{ resize: 'vertical' }}
                        />
                    </Form.Item>

                    <div className="flex justify-end">
                        <Button type="text" htmlType="submit" loading={loading}>
                            Generate Note
                        </Button>
                    </div>
                </Form>
            </Modal>
        </ConfigProvider >
    );
};

export default AddNoteForm;
