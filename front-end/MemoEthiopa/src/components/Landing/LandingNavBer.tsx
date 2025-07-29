import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import EthioLogo from "../../assets/MemoEthio_logo_4.png";

const LandingNavBar: React.FC = () => {
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
      <nav className={getClasses(`sticky p-0 z-50 top-0 ${theme === "drak" ? "bg-black/25" : "bg-black/5"}  backdrop-blur-2xl h-14`)}>
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
            <Link to={"/"} target="_blank">
              <li className="cursor-pointer" title="Home">Home</li>
            </Link>
            <Link to={"/blog"} target="_blank">
              <li className="cursor-pointer" title="Blog">Blog</li>
            </Link>
            <li className="cursor-pointer" title="Prucing"><Link to={"/pricing"} > Pricing</Link></li>

            <li className="relative group cursor-pointer">
              <Link to={"/developerOptions"} ><span title="Developer Options">Developer Options</span></Link>
            </li>

            <li className="cursor-pointer text-blue-500" title="AI-Powered Memory Assistant">AI Assistant</li>
            <Link to={"/aboutus"} >
              <li className="cursor-pointer" title="About Us">About</li>
            </Link>
            <Link to={"/contectus"} >
              <li className="cursor-pointer" title="Contect Us">Contect</li>
            </Link>
          </ul>

          {/* Action Buttons */}
          <div className="hidden lg:flex gap-4 items-center">
            <Link to="/signin" title="" className="px-4 py-2 border sm:text-sm border-gray-700 rounded hover:scale-105 transition-transform">Sign In</Link>
            <Link to="/signup" className="px-4 py-2 bg-blue-900 sm:text-sm  text-white rounded hover:scale-105 transition-transform">Get Free Account</Link>
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

              <ul className={getClasses("items-center select-none space-y-3.5")}>
                <li className="cursor-pointer" title="Home"><Link to={"/"} target="_blank" >Home</Link></li>
                <li className="cursor-pointer" title="Newsletter"><Link to={"/blog"} target="_blank" >Blog</Link></li>
                <li className="cursor-pointer" title="Pricing"><Link to={"/pricing"} >Pricing</Link></li>
                <li className="relative group cursor-pointer">
                  <span title="Developer Options"><Link to={"/developerOptions"} > Developer Options</Link></span>
                </li>
                <li className="cursor-pointer text-blue-500" title="AI-Powered Memory Assistant">AI Assistant</li>
                <li className="cursor-pointer" title="About Us"><Link to={"/aboutus"} > About</Link></li>
                <li className="cursor-pointer" title="Contect Us"><Link to={"/contectus"} > Contect</Link></li>
              </ul>
            </div>
            {/* Footer menu items here */}
            <div className="fixed bottom-0 w-2/3">
              <div className="m-2 p-2">
                <Link to="/signup" className="px-4 py-2 bg-blue-900  text-white rounded hover:scale-105 transition-transform">Get Free Account</Link>
              </div>
              <div className="m-2 p-2 w-2/3">
                <Link to="/signin" className="px-4 py-2 border border-gray-700 rounded hover:scale-105 transition-transform">Sign In</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default LandingNavBar;