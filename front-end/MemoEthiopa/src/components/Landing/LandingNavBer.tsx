import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Result } from "antd";
import EthioLogo from "../../assets/MemoEthio_logo_4.png";

const LandingNavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [subMenuOpen, setSubMenuOpen] = useState<number | null>(null);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const borderTest = useSelector((state: RootState) => state.developertest.border_test);
  const theme = useSelector((state: RootState) => state.theam.theme);

  useEffect(() => {
    document.title = "Memo Ethiopia | Landing Page";

    let startX = 0;
    let isEdgeSwipe = false;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      const screenWidth = window.innerWidth;

      // Only allow swipe if started from left 40px or right 40px
      isEdgeSwipe = startX < 40 || startX > screenWidth - 40;
    };

    const handleTouchMove = (e: TouchEvent) => {
      
      const endX = e.touches[0].clientX;
      if (startX - endX > 150) {
        setOpenMobileMenu(false);
      }
      if (!isEdgeSwipe) return;

      e.preventDefault(); // prevent scrolling only when it's edge swipe

      if (startX - endX > 50) {
        setOpenMobileMenu(false);
      } else if (endX - startX > 50) {
        // swipe right from left edge
        setOpenMobileMenu(true);
      }
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);
  useEffect(() => {
    if (openMobileMenu) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "auto"; 
    }
  }
    , [openMobileMenu]);

  const getClasses = (...classes: string[]) => {
    const border = borderTest ? "border border-red-700" : "";
    const themeStyles = theme === "dark"
      ? "bg-[#363535] text-white "
      : "bg-[#e9e9e9]  text-black";
    return [...classes, border, themeStyles].join(" ");
  };

  return (
    <>
    <div className={getClasses(`fixed z-40 sm:text-xs bg-black/35 backdrop-blur-xs h-full w-full transition-all delay-500 ${openMobileMenu ? "block" : "hidden"}`)}></div>
    <nav className={getClasses(`sticky p-0 z-50 top-0 ${theme === "drak" ? "bg-black/25":"bg-black/5"}  backdrop-blur-2xl h-14`)}>
      <div className={getClasses("flex  justify-between bg-transparent items-center h-full px-6")}>
        {/* Logo */}
        <Link to="/">
          <img
            src={EthioLogo}
            alt="MemoEthio Logo"
            className="h-14 w-14"
            title="Memo Ethiopia Logo"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
          />
        </Link>

        {/* Desktop Menu */}
        <ul className={getClasses("hidden bg-transparent lg:flex gap-3 items-center select-none sm:text-xs")}>
          <li
            className="relative group"
            onMouseEnter={() => setMenuOpen(1)}
            onMouseLeave={() => {
              setMenuOpen(null);
              setSubMenuOpen(null);
            }}
          >
            <span className="cursor-pointer" title="Company">Company</span>
            {menuOpen === 1 && (
              <div className={getClasses("absolute top-full  flex gap-6 p-2 shadow-md")}>
                <div>
                  <Link to="/" className="block py-1" onMouseEnter={() => setSubMenuOpen(1)}>About</Link>
                  <Link to="/#footer" className="block py-1" onMouseEnter={() => setSubMenuOpen(2)}>Careers</Link>
                  <Link to="/" className="block py-1" >Press</Link>
                  <Link to="/" className="block py-1">News</Link>
                </div>
                <div className="w-96">
                  {subMenuOpen === null ? (
                    <Result status="info" title="Hover one item" />
                  ) : (
                    <div className={getClasses("select-text")}>
                      <p><b>Memo Ethiopia apps</b><br />
                        Are more useful than you might think.
                        Taking notes with pen and paper works just fine for some, but if you have a smartphone or tablet, using an app designed for note-taking can truly change the way you get things done.
                      </p>
                      <ul className="list-disc ml-5 mt-2">
                        <li>Easy Note Creation</li>
                        <li>Cloud Sync</li>
                        <li>Secure & Private</li>
                        <li>Smart Search</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </li>

            <Link to={"/blog"} target="_blank">
          <li className="cursor-pointer" title="Blog">Blog</li>
          </Link>
          <li className="cursor-pointer" title="About Us">Features</li>
          <li className="cursor-pointer" title="About Us">Pricing</li>

          <li
            className="relative group cursor-pointer"
            onMouseEnter={() => setMenuOpen(3)}
            onMouseLeave={() => setMenuOpen(null)}
          >
           <Link to={"/developerOptions"} ><span title="Developer Options">Developer Options</span></Link>
            {menuOpen === 3 && (
              <div className={getClasses("absolute top-full  p-3 shadow-md w-48")}>
                <Link to="/developerOptions/front-end" className="block py-1">Front End</Link>
                <Link to="/developerOptions/back-end" className="block py-1">Back End</Link>
                <Link to="/developerOptions/ai-agent" className="block py-1">AI Agent</Link>
              </div>
            )}
          </li>

          <li className="cursor-pointer text-blue-500" title="AI-Powered Memory Assistant">AI Assistant</li>
          <li className="cursor-pointer" title="About Us">About</li>
        </ul>

        {/* Action Buttons */}
        <div className="hidden lg:flex gap-4 items-center">
          <Link to="/singin" title="" className="px-4 py-2 border sm:text-sm border-gray-700 rounded hover:scale-105 transition-transform">Sign In</Link>
          <Link to="/singup" className="px-4 py-2 bg-blue-900 sm:text-sm  text-white rounded hover:scale-105 transition-transform">Get Free Account</Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setOpenMobileMenu(true)} className="lg:hidden">☰</button>
      </div>
            
      {/* Mobile Menu */}
      <div className={getClasses("fixed top-0 h-full z-50 transition-transform duration-500 ease-in-out",
        openMobileMenu ? "translate-x-0" : "-translate-x-full"
      )}>
        <div
          className={getClasses(
            "relative top-0 left-0 z-50 h-screen w-80  transition-transform duration-500 ease-in-out",
            openMobileMenu ? "translate-x-0" : "-translate-x-full"
          )}
          id="mobile-menu"
        >
          <div className="p-7 flex justify-between  items-center">
            <span className="text-lg font-semibold">Menu</span>
            <button
              onClick={() => setOpenMobileMenu(false)}
              className="text-xl font-bold hover:text-red-500 transition-colors duration-150"
            >
              ✕
            </button>
          </div>
          <div className="p-4 space-y-1">

            <ul className={getClasses("items-center select-none ")}>
              <li
                className="relative group"
                onMouseEnter={() => setMenuOpen(1)}
                onMouseLeave={() => {
                  setMenuOpen(null);
                  setSubMenuOpen(null);
                }}
              >
                <span className="cursor-pointer" title="Company">Company</span>

              </li>

              <li className="cursor-pointer" title="Newsletter">Newsletter</li>
              <li className="cursor-pointer" title="About Us">Features</li>
              <li className="cursor-pointer" title="About Us">Pricing</li>

              <li
                className="relative group cursor-pointer"
                onMouseEnter={() => setMenuOpen(3)}
                onMouseLeave={() => setMenuOpen(null)}
              >
                <span title="Developer Options">Developer Options</span>
                {menuOpen === 3 && (
                  <div className={getClasses("absolute top-full  p-3 shadow-md w-48")}>
                    <Link to="/" className="block py-1">Child Menu 1</Link>
                    <Link to="/" className="block py-1">Child Menu 2</Link>
                    <Link to="/" className="block py-1">Child Menu 3</Link>
                  </div>
                )}
              </li>

              <li className="cursor-pointer text-blue-500" title="AI-Powered Memory Assistant">AI Assistant</li>
              <li className="cursor-pointer" title="About Us">About</li>
            </ul>
          </div>
          {/* Footer menu items here */}
          <div className="fixed bottom-0 w-2/3">
            <div className="m-2 p-2">
              <Link to="/singup" className="px-4 py-2 bg-blue-900  text-white rounded hover:scale-105 transition-transform">Get Free Account</Link>
            </div>
            <div className="m-2 p-2 w-2/3">
              <Link to="/singin" className="px-4 py-2 border border-gray-700 rounded hover:scale-105 transition-transform">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
};

export default LandingNavBar;