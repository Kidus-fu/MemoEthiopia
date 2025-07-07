import React, { useState } from 'react';
import { Form, Input, Select, Button, Modal, ConfigProvider, theme as antdTheme } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { CloseOutlined } from '@ant-design/icons';
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import Showdown from "showdown";



interface AddNoteFormProps {
    open: boolean;
    onClose: () => void;
    onSumbit: (values: any) => void;
    folders: any;
    theme: any;
    user: any;
}

const AddNoteForm: React.FC<AddNoteFormProps> = ({ open, onClose, folders, theme, user, onSumbit }) => {
    const [form] = useForm();
    const [isClose, setIsColse] = useState(false)
    const [content, setContent] = useState<string>(""); // use for controlled state
    const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
    });

    const handleFinish = (values: any) => {
        onSumbit(values)
        form.resetFields();
        onClose();
    };
    const handelDiscover = () => {
        setIsColse(false)
        form.resetFields();
        onClose();
    }
    return (
        <ConfigProvider theme={{
            algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
            token: {
                colorBgMask: "rgb(1, 1, 1,0.7)",
                colorPrimary: "rgb(23, 34, 241)"
            }}}>
            <Modal
                keyboard
                open={open}
                title="New Note Just a test"
                closeIcon={<CloseOutlined onClick={() => setIsColse(true)} />}
                footer={null}>
                <Modal
                    centered
                    open={isClose}
                    closeIcon={null}
                    footer={null}
                    width={280}
                    styles={{
                        body: { padding: 4, borderRadius: 12 },
                        content: { borderRadius: 12 },
                        mask: { backdropFilter: "blur(5px)" }
                    }}>
                    <div className="flex flex-col gap-3 justify-center items-center md:h-40 h-36 ">
                        <p className={`text-center text-base md:text-md font-medium border-b p-2 ${theme === "dark" ? "border-gray-800" : "border-gray-300"}`}>
                            Are you sure you want to mark this as discovered?
                        </p>
                        <div className="w-full flex flex-col gap-3">
                            <Button type='text' block danger={true} style={{ padding: 5 }} onClick={() => {
                                setIsColse(false)
                                setTimeout(() => {
                                    handelDiscover()
                                }, 10);
                            }}>
                                Discoverd
                            </Button>
                            <Button type='text' block style={{ padding: 5 }} onClick={() => setIsColse(false)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Modal>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                    className="space-y-4 select-none">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter the title' }]}>
                            <Input className="bg-transparent border border-gray-600" style={{ border: 'none' }} />
                        </Form.Item>
                        <Form.Item label="Auther">
                            <Input type="text" value={user.usermore ? user.usermore.username : "Undefiend"} style={{ border: 'none' }} className="w-33  p-0 border-none" onChange={() => { }} readOnly={true} />
                        </Form.Item>
                        <Form.Item name="folder" label="Folder" rules={[{ required: true, message: 'Please select a folder' }]}>
                            <Select className="bg-transparent" placeholder="Select folder" style={{ border: 'none' }}>
                                {folders.map((folder: any) => (
                                    <Select.Option value={folder.id} key={folder.id} >{folder.name}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>
                    <Form.Item
                        name="content"
                        label="Content"
                        rules={[{ required: true, message: "Please enter the content" }]}>
                        <ReactMde
                            value={content}
                            onChange={setContent}
                            selectedTab={selectedTab}
                            onTabChange={setSelectedTab}
                            generateMarkdownPreview={(markdown: any) =>
                                Promise.resolve(converter.makeHtml(markdown))
                            }
                            minEditorHeight={150}/>
                    </Form.Item>
                    <div className='flex justify-end items-end'>
                        <Button type='primary' htmlType='submit'>Save</Button>
                    </div>
                </Form>
            </Modal>
        </ConfigProvider>
    );
};

export default AddNoteForm;
