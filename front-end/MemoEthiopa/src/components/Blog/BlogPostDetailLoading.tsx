import { Breadcrumb, Skeleton, Input, Button, List } from "antd";
import { Link } from "react-router-dom";
import { FacebookFilled, TwitterSquareFilled, ShareAltOutlined } from "@ant-design/icons";

const BlogPostDetailLoading = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-20">
            <Breadcrumb className="mb-4">
                <Breadcrumb.Item><Link to={'/blog'}>Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Skeleton.Input active size="small" style={{ width: 120 }} />
                </Breadcrumb.Item>
            </Breadcrumb>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3">
                    <Skeleton.Input active size="large" style={{ width: 300, height: 32 }} className="m-2" />
                    <Skeleton active paragraph={{ rows: 0 }} title={false} style={{ width: 150 }} className="mb-4" />

                    {/* <Skeleton.Node active className="rounded mb-6 w-11/12 " /> */}
                     <div className=" bg-gray-200 animate-pulse rounded mb-6 w-11/12 h-96"></div>

                    <Skeleton active paragraph={{ rows: 5 }} />

                    <div className="flex items-center space-x-4 mt-6">
                        <span>Share this</span>
                        <FacebookFilled className="text-blue-600 text-xl" />
                        <TwitterSquareFilled className="text-blue-400 text-xl" />
                        <ShareAltOutlined className="text-gray-600 text-xl" />
                    </div>

                    <h2 className="text-xl font-semibold mt-8 mb-4">More Posts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-white shadow rounded overflow-hidden">
                                {/* <Skeleton.Image active className="w-full h-40" /> */}
                                <div className=" bg-gray-200 rounded mb-2 w-11/12 h-40"></div>
                                <div className="p-4">
                                    <Skeleton.Input active size="small" style={{ width: 100 }} />
                                    <Skeleton.Input active size="small" style={{ width: 190 }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-xl font-semibold mt-8 mb-4">Comments</h2>
                    <div className="mb-4 flex gap-2">
                        <Input placeholder="Add a comment..." className="flex-1" disabled />
                        <Button type="primary" disabled>Submit</Button>
                    </div>

                    <List
                        className="bg-white rounded shadow"
                        itemLayout="horizontal"
                        dataSource={[1, 2, 3]}
                        renderItem={() => (
                            <li className="p-4 border-b last:border-none">
                                <Skeleton.Avatar active size="large" />
                                <Skeleton active paragraph={{ rows: 2 }} title={false} />
                            </li>
                        )}
                    />
                </div>

                <div className="lg:col-span-1 hidden lg:block">
                    <div className="bg-white rounded shadow p-4 sticky top-20 space-y-2">
                        <Skeleton.Input active size="small" style={{ width: 120 }} />
                        {[1, 2, 3, 4, 5].map((item) => (
                            <Skeleton.Input key={item} active size="small" style={{ width: 80 }} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPostDetailLoading;