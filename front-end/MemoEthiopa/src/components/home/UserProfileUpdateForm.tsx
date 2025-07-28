import React, { useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select, Upload, Avatar, Row, Col, ConfigProvider, theme as antdTheme } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

const { Option } = Select;
interface UserProfileUpdateFormProp {
    userData: any;
    onUpdate: any;
}
const UserProfileUpdateForm: React.FC<UserProfileUpdateFormProp> = ({ userData, onUpdate }) => {
    const [form] = Form.useForm();
    const theme = useSelector((state: RootState) => state.theam.theme);
    const DeveloperTest = useSelector((state: RootState) => state.developertest.border_test);
    
    useEffect(() => {
  if (userData) {
    form.setFieldsValue({
      username: userData?.usermore?.username || '',
      email: userData?.usermore?.email || '',
      bio: userData?.bio || '',
      phone: userData?.phone_number || '',
      location: userData?.location || '',
      language: userData?.preferred_language || '',
      date_of_birth: userData?.date_of_birth ? dayjs(userData.date_of_birth) : null,
      gender: userData?.gender || '',
    });
  }
}, [userData]);

    const getClassNames = (base: string) => {
        const border = DeveloperTest ? "border border-red-700" : "";
        const themeStyle =
            theme === "dark" ? "text-white" : "text-black";
        return `${base} ${border} ${themeStyle}`;
    };

    const handleFinish = (values: any) => {
        console.log('Updated Values:', values);
        onUpdate(values);
    };

    return (
       <ConfigProvider
  theme={{
    algorithm: theme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    components: {
      Dropdown: {
        paddingBlock: 10,
        fontSize: 11,
      },
    },
  }}
>
  <Form form={form} layout="vertical" onFinish={handleFinish} className={getClassNames("")}>
    {/* First Section: Avatar and Basic Info */}
    <Row gutter={[16, 16]}>
      <Col xs={24} md={8}>
        <Form.Item label="">
          <Avatar
            size={80}
            src={`https://placehold.co/150/?text=${userData?.usermore?.username[0]}`}
            style={{ border: "1px solid #ddd" }}
          />
          <Form.Item name="profile_picture" valuePropName="file" noStyle>
            <Upload maxCount={1} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />} className='ms-12 sm:ms-0 sm:mt-8' disabled>
                Change Picture
              </Button>
            </Upload>
          </Form.Item>
        </Form.Item>
      </Col>


      <Col xs={24} md={16}>
        <Form.Item name="username" label="Username" className='hidden sm:block'>
          <Input readOnly />
        </Form.Item>
        <Form.Item name="email" label="Email" >
          <Input readOnly />
        </Form.Item>
        <Form.Item name="bio" label="Bio">
          <Input.TextArea rows={2} />
        </Form.Item>
      </Col>
      
    </Row>

    {/* Contact & Preferences */}
    <Row gutter={[16, 16]}>
      <Col xs={12} sm={12} md={8}>
        <Form.Item name="phone" label="Number" >
          <Input />
        </Form.Item>
      </Col>
      <Col xs={12} sm={12} md={8}>
        <Form.Item name="location" label="Location">
          <Input readOnly />
        </Form.Item>
      </Col>
      <Col xs={12} sm={12} md={8}>
        <Form.Item name="language" label="Language">
          <Select>
            <Option value="en">English</Option>
            <Option value="am">Amharic</Option>
            <Option value="om">Oromo</Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>

    {/* Gender, DOB, Plan */}
    <Row gutter={[16, 16]}>
      <Col xs={12} sm={12} md={8}>
        <Form.Item name="gender" label="Gender">
          <Select>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col xs={12} sm={12} md={8}>
        <Form.Item name="date_of_birth" label="Date of Birth">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Form.Item label="Plan" className='hidden sm:block'>
          <Input value={userData.paln} disabled />
        </Form.Item>
      </Col>
    </Row>

    {/* Submit Button */}
    <Form.Item>
      <Button type="primary" htmlType="submit" >
        Update Profile
      </Button>
    </Form.Item>
  </Form>
</ConfigProvider>

    );
};

export default UserProfileUpdateForm;
