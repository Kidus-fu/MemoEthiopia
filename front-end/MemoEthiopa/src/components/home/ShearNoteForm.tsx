import React, { useEffect, useState } from 'react';
import { Select, Form, Button } from 'antd';
import 'antd/dist/reset.css';
import api from '../../api';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { useMessage } from '../useMessage';

const { Option } = Select;

interface ShareNoteFormData {
    note : any;
}

const ShareNoteForm:React.FC<ShareNoteFormData> = ({note}) => {
    const userinfo = useSelector((state: RootState) => state.user)
    const [selectedUser, setSelectedUser] = useState<string | undefined>();
    const [users,setUsers] = useState<any[]>([])
    const [loading,setLoading] = useState(false)
    const [userLoading,setUserLoading] = useState(false)
    
    const showMessage = useMessage()
  useEffect(() => {
    setUserLoading(true)
    api.get('api-v1/users/')
    .then((res) => {
      console.log("ppp");
      
      setUserLoading(false)
      const users = res.data.results;
      const filter = users.filter((user:any) => user.user !== userinfo.user)
      setUsers(filter);
    })
  },[])
  const handelForm = () => {
    const data =  {
      "note":note,
      "shared_with":selectedUser,  
    }
    setLoading(true)    
    api.post('api-v1/shared-notes/',data)
    .then((res) => {
      setLoading(false) 
      console.log(res);
      if (res.status === 200) {
        showMessage('success',"Successfully sheared a note")
      }
    }).catch((error) => {
      setLoading(false) 
      console.error(error);
      showMessage("error","Something went wrong try later")
    })
  }
  return (
    <div className=" mx-auto p-1 rounded-lg ">
      <Form layout="vertical" className="space-y-4" onFinish={handelForm} disabled={loading}>
        {/* User + Permission Row */}
        <div className="">
          {/* Select User */}
          <Form.Item label={<span className="" >Select User</span>} required>
            <Select
              value={selectedUser}
              onChange={(value) => setSelectedUser(value)}
              placeholder="Choose user"
              className="w-full"
              loading={userLoading}
              popupClassName="dark:bg-[#2b2b2b]"
            >
              {users.map((user) => (
                <Option key={user.id} value={user.user}>
                  {user.usermore.username}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Permission (read-only for now) */}
          <Form.Item label={<span className="">Permission</span>} required>
            <Select value="view" disabled className="w-full">
              <Option value="view">View</Option>
            </Select>
          </Form.Item>
        </div>
            <div className="flex justify-end">
                <Button type='default' htmlType='submit' disabled={!selectedUser} loading={loading}>Shear It</Button>
            </div>
        <div>
        </div>
      </Form>
    </div>
  );
};

export default ShareNoteForm;
