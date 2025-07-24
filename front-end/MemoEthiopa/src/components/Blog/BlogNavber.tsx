import React, { useState } from "react";
import { Drawer, Input, Button, Avatar } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";

const BlogNavber:React.FC = () => {
  const { user, userinfo } = useSelector((state: RootState) => state);
  const [searchPrompt, setSearchPrompt] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { Search } = Input;

  const handleSearch = () => {
    if (searchPrompt.trim()) {
      setMenuOpen(false);
      const params = new URLSearchParams(location.search);
      params.set("search", searchPrompt.trim());
      navigate(`/blog/?search=${encodeURIComponent(searchPrompt.trim())}`);
      setSearchPrompt("");
    }
  };

  const NavLinks = () => (
    <div className="flex gap-6 justify-center text-sm font-medium">
      <Link to="/blog" className="text-purple-600 hover:text-purple-800">Home</Link>
      {user.is_superuser ? (
        <>
          <Link to="/blog/dashboard" className="text-purple-600 hover:text-purple-800">Dashboard</Link>
        {/* <Link to="/blog/categories" className="text-purple-600 hover:text-purple-800">New Category</Link> */}
          <Link to="/blog/newpost" className="text-purple-600 hover:text-purple-800">New Blog</Link>
        </>
      ) : (
        <>
          <Link to="/blog/aboutus" className="text-purple-600 hover:text-purple-800">About</Link>
          <Link to="/blog/contactus" className="text-purple-600 hover:text-purple-800">Contact</Link>
          <Link to="/" target="_blank_" className="text-purple-600 hover:text-purple-800">Create Notes</Link>
        </>
      )}
    </div>
  );

  return (
    <header className="fixed w-full bg-white border-b border-purple-200 shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/blog" className="text-xl font-bold text-gray-800">MemoEthiopia</Link>

        <div className="hidden sm:flex flex-1 justify-center">
          <NavLinks />
        </div>

        <div className="hidden sm:flex items-center gap-4">
          <Search
            placeholder="Search posts..."
            allowClear
            enterButton
            size="small"
            value={searchPrompt}
            onChange={(e) => setSearchPrompt(e.target.value)}
            onSearch={handleSearch}
            className="w-48 sm:w-56"
          />
          {userinfo.loggedIn ? (
            <Avatar
              size={user.profile_picture ? "large" : "small"}
              style={{height:35}}
              // src={user.profile_picture ? `http://localhost:8000/${user.profile_picture}` : undefined}
              src={`https://placehold.co/150/?text=${user?.usermore?.username[0]}`}
              icon={!user.profile_picture && <UserOutlined />}
            />
          ) : (
            <Link to="/signin" target="_blank">
              <Button size="small" type="primary">Sign In</Button>
            </Link>
          )}
        </div>

        <button className="sm:hidden text-2xl text-gray-700" onClick={() => setMenuOpen(true)}>
          <MenuOutlined />
        </button>
      </div>

      <Drawer
        placement="left"
        onClose={() => setMenuOpen(false)}
        open={menuOpen}
        bodyStyle={{ padding: "1rem" }}
      >
        <div className="flex flex-col gap-4">
          <NavLinks />
          <Search
            placeholder="Search posts..."
            allowClear
            enterButton
            size="middle"
            value={searchPrompt}
            onChange={(e) => setSearchPrompt(e.target.value)}
            onSearch={handleSearch}
          />
        </div>
      </Drawer>
    </header>
  );
};

export default BlogNavber;
