import React, { useState } from "react";
import Ethio_logo from "../assets/MemoEthio_logo_4.png";
import { Link } from "react-router-dom";
import { CloseOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { ConfigProvider, Drawer } from "antd";

import "./LadingNavBer.css";

const LandingNavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const showDrawerMobileMenu = () => setOpenMobileMenu(true);
  const onCloseMobileMenu = () => setOpenMobileMenu(false);

  return (
    <>
      <nav className="bg-[#282829] text-gray-200 sticky top-0">
        <div className="flex justify-between">
          {/* Logo */}
          <div className="ms-8">
            <Link to={"/"} className="cursor-default">
              <img src={Ethio_logo} alt="MemoEthio Logo" className="h-16 w-16" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="menu mt-4 hidden md:block">
            <ul className="flex gap-3 cursor-default">
              <li
                onMouseEnter={() => setMenuOpen(1)}
                onMouseLeave={() => setMenuOpen(null)}
                className="relative hover:border p-1 hover:border-gray-500"
              >
                <span>Menu 1</span>
                {menuOpen === 1 && (
                  <div className="absolute left-0 top-8 bg-[#282929] text-white p-3 shadow-md">
                    <Link to="/" className="block py-2">Child Menu 1</Link>
                    <Link to="/" className="block py-2">Child Menu 2</Link>
                    <Link to="/" className="block py-2">Child Menu 3</Link>
                  </div>
                )}
              </li>

              <li
                onMouseEnter={() => setMenuOpen(2)}
                onMouseLeave={() => setMenuOpen(null)}
                className="relative hover:border p-1 hover:border-gray-500"
              >
                <span>Menu 2</span>
                {menuOpen === 2 && (
                  <div className="absolute left-0 top-8 bg-[#282929] text-white p-3 shadow-md">
                    <Link to="/" className="block py-2">Child Menu 1</Link>
                    <Link to="/" className="block py-2">Child Menu 2</Link>
                    <Link to="/" className="block py-2">Child Menu 3</Link>
                  </div>
                )}
              </li>

              <li
                onMouseEnter={() => setMenuOpen(3)}
                onMouseLeave={() => setMenuOpen(null)}
                className="relative hover:border p-1 hover:border-gray-500"
              >
                <span>Menu 3</span>
                {menuOpen === 3 && (
                  <div className="absolute left-0 top-8 bg-[#282929] text-white p-3 shadow-md">
                    <Link to="/" className="block py-2">Child Menu 1</Link>
                    <Link to="/" className="block py-2">Child Menu 2</Link>
                    <Link to="/" className="block py-2">Child Menu 3</Link>
                  </div>
                )}
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="me-4 hidden md:block my-4 flex gap-7">
            <button className="bg-[#312EB5] p-2 rounded me-4 transform hover:scale-105 transition-all delay-150">
              Get Free Account
            </button>
            <button className="hover:border hover:border-gray-500 p-2 border border-[#282829] hover:scale-110 transition-all delay-150">
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="me-4 my-4 md:hidden" onClick={showDrawerMobileMenu}>
            <MenuFoldOutlined className="text-3xl" />
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <ConfigProvider theme={{ token: { colorBgContainerDisabled: "#000" } }}>
        <Drawer
          title="MemoEthiopia"
          placement="left"
          closable={false}
          onClose={onCloseMobileMenu}
          style={{ backgroundColor: "#282929", color: "#fff" }}
          open={openMobileMenu}
          extra={
            <CloseOutlined className="cursor-pointer text-black" onClick={onCloseMobileMenu} />
          }
        >
          <Link to="/menu1">Menu 1</Link>
          <Link to="/menu2">Menu 2</Link>
          <Link to="/menu3">Menu 3</Link>
        </Drawer>
      </ConfigProvider>
    </>
  );
};

export default LandingNavBar;
