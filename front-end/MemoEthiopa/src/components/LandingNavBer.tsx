import React, { useState } from "react";
import Ethio_logo from "../assets/MemoEthio_logo_4.png";
import { Link } from "react-router-dom";
import { CloseOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const LandingNavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [subMenuOpen, setSubMenuOpen] = useState<number | null>(null);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const DeveloperTest: boolean = useSelector((state: RootState) => state.developertest.border_test);


  const showDrawerMobileMenu = () => setOpenMobileMenu(true);
  const onCloseMobileMenu = () => setOpenMobileMenu(false);


  // Helper function to add Developer_test class if needed
  const getClassNames = (baseClass: string) => `${baseClass} ${DeveloperTest ? 'border border-red-700' : ''}`;

  return (
    <>
      <nav className={getClassNames("bg-[#282829]  text-gray-200 h-16 sticky top-0")}>
        <div className={getClassNames("flex justify-between h-16")}>
          {/* Logo */}
          <div className={getClassNames("ms-6 mt-2 h-auto")}>
            <Link to={"/"} className={getClassNames("cursor-default")}>
              <img
                src={Ethio_logo}
                alt="MemoEthio Logo"
                className={getClassNames("h-14 w-14")}
                onDragStart={(e) => e.preventDefault()}
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className={getClassNames("menu mt-2 z-[1000] hidden md:block h-9")}>
            <ul className={getClassNames("flex cursor-default")}>
              {/* Menu 1 */}
              <li
                onMouseEnter={() => setMenuOpen(1)}
                onMouseLeave={() => {
                  setMenuOpen(null);
                  setSubMenuOpen(null);
                }}
                className={getClassNames("relative hover:border p-1 hover:border-gray-500")}
              >
                <small>Menu 1</small>
                {menuOpen === 1 && (
                  <div className={getClassNames("flex z-[1000] absolute  left-0 h-96 w-auto top-8 bg-[#282929] text-white p-1 shadow-md")}>
                    <div className={getClassNames("w-28 mt-3")}>
                      <Link to="/" className={getClassNames("block py-2")}>Child Menu 1</Link>
                      <div
                        className={getClassNames("relative group")}
                        onMouseEnter={() => setSubMenuOpen(1)}
                        onMouseLeave={() => setSubMenuOpen(null)}
                      >
                        <Link to="/" className={getClassNames("block py-2")}>Child Menu 2</Link>
                      </div>
                      <Link to="/" className={getClassNames("block py-2")}>Child Menu 3</Link>
                    </div>
                    <div
                      className={getClassNames("w-80 z-50 bg-[#282929] text-white")}
                      onMouseEnter={() => setSubMenuOpen(subMenuOpen === 1 ? 1 : 0)}
                      onMouseLeave={() => setSubMenuOpen(null)}
                    >
                      {subMenuOpen === 1 && (
                        <div className={getClassNames("p-3")}>
                          <Link to="/" className={getClassNames("block py-2")}>Sub-Child 1</Link>
                          <Link to="/" className={getClassNames("block py-2")}>Sub-Child 2</Link>
                          <Link to="/" className={getClassNames("block py-2")}>Sub-Child 3</Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </li>

              {/* Menu 2 */}
              <li
                onMouseEnter={() => setMenuOpen(2)}
                onMouseLeave={() => setMenuOpen(null)}
                className={getClassNames("relative hover:border p-1 ms-2 hover:border-gray-500")}
              >
                <small>Menu 2</small>
                {menuOpen === 2 && (
                  <div className={getClassNames("absolute left-0 w-48 top-8 bg-[#282929] text-white p-3 shadow-md")}>
                    <Link to="/" className={getClassNames("block py-2")}>Child Menu 1</Link>
                    <Link to="/" className={getClassNames("block py-2")}>Child Menu 2</Link>
                    <Link to="/" className={getClassNames("block py-2")}>Child Menu 3</Link>
                  </div>
                )}
              </li>

              {/* Menu 3 */}
              <li
                onMouseEnter={() => setMenuOpen(3)}
                onMouseLeave={() => setMenuOpen(null)}
                className={getClassNames("relative hover:border p-1 ms-2 hover:border-gray-500")}
              >
                <small>Menu 3</small>
                {menuOpen === 3 && (
                  <div className={getClassNames("absolute left-0 w-48 top-8 bg-[#282929] text-white p-3 shadow-md")}>
                    <Link to="/" className={getClassNames("block py-2")}>Child Menu 1</Link>
                    <Link to="/" className={getClassNames("block py-2")}>Child Menu 2</Link>
                    <Link to="/" className={getClassNames("block py-2")}>Child Menu 3</Link>
                  </div>
                )}
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className={getClassNames("me-6 hidden md:block mt-2 flex gap-7")}>
            <button className={getClassNames("bg-[#312EB5] p-2 rounded me-4 cursor-pointer transform hover:scale-105 transition-all delay-150")}>
              Get Free Account
            </button>
            <button className={getClassNames("hover:border hover:border-gray-500 p-2 border cursor-pointer  border-[#282829] hover:scale-110 transition-all delay-150")}>
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className={getClassNames("me-4 my-4 md:hidden")} onClick={showDrawerMobileMenu}>
            <MenuFoldOutlined className={getClassNames("text-3xl")} />
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Drawer
        title="MemoEthiopia"
        placement="left"
        closable={false}
        onClose={onCloseMobileMenu}
        style={{ backgroundColor: "#282929", color: "#fff" }}
        open={openMobileMenu}
        extra={<CloseOutlined className={getClassNames("cursor-pointer text-black")} onClick={onCloseMobileMenu} />}
      >
        <ul className={getClassNames("flex cursor-default")}>
              {/* Menu 1 */}
              <li
                onMouseEnter={() => setMenuOpen(1)}
                onMouseLeave={() => {
                  setMenuOpen(null);
                  setSubMenuOpen(null);
                }}
                className={getClassNames("relative hover:border p-1 hover:border-gray-500")}
              >
                <small>Menu 1</small>
                {menuOpen === 1 && (
                  <div className={getClassNames("flex z-[1000] absolute  left-0 h-96 w-auto top-8 bg-[#282929] text-white p-1 shadow-md")}>
                    <div className={getClassNames("w-28 mt-3")}>
                      <Link to="/" className={getClassNames("block py-2")}>Child Menu 1</Link>
                      <div
                        className={getClassNames("relative group")}
                        onMouseEnter={() => setSubMenuOpen(1)}
                        onMouseLeave={() => setSubMenuOpen(null)}
                      >
                        <Link to="/" className={getClassNames("block py-2")}>Child Menu 2</Link>
                      </div>
                      <Link to="/" className={getClassNames("block py-2")}>Child Menu 3</Link>
                    </div>
                    <div
                      className={getClassNames("w-80 z-50 bg-[#282929] text-white")}
                      onMouseEnter={() => setSubMenuOpen(subMenuOpen === 1 ? 1 : 0)}
                      onMouseLeave={() => setSubMenuOpen(null)}
                    >
                      {subMenuOpen === 1 && (
                        <div className={getClassNames("p-3")}>
                          <Link to="/" className={getClassNames("block py-2")}>Sub-Child 1</Link>
                          <Link to="/" className={getClassNames("block py-2")}>Sub-Child 2</Link>
                          <Link to="/" className={getClassNames("block py-2")}>Sub-Child 3</Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </li>

              {/* Menu 2 */}
              <li
                onMouseEnter={() => setMenuOpen(2)}
                onMouseLeave={() => setMenuOpen(null)}
                className={getClassNames("relative hover:border p-1 ms-2 hover:border-gray-500")}
              >
                <small>Menu 2</small>
                {menuOpen === 2 && (
                  <div className={getClassNames("absolute left-0 w-48 top-8 bg-[#282929] text-white p-3 shadow-md")}>
                    <Link to="/" className={getClassNames("block py-2")}>Child Menu 1</Link>
                    <Link to="/" className={getClassNames("block py-2")}>Child Menu 2</Link>
                    <Link to="/" className={getClassNames("block py-2")}>Child Menu 3</Link>
                  </div>
                )}
              </li>

              {/* Menu 3 */}
              <li
                onMouseEnter={() => setMenuOpen(3)}
                onMouseLeave={() => setMenuOpen(null)}
                className={getClassNames("relative hover:border p-1 ms-2 hover:border-gray-500")}
              >
                <small>Menu 3</small>
                {menuOpen === 3 && (
                  <div className={getClassNames("absolute left-0 w-48 top-8 bg-[#282929] text-white p-3 shadow-md")}>
                    <Link to="/" className={getClassNames("block py-2")}>Child Menu 1</Link>
                    <Link to="/" className={getClassNames("block py-2")}>Child Menu 2</Link>
                    <Link to="/" className={getClassNames("block py-2")}>Child Menu 3</Link>
                  </div>
                )}
              </li>
            </ul>
      </Drawer>
    </>
  );
};

export default LandingNavBar;
