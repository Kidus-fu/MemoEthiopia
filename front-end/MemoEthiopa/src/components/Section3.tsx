import React from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Section3: React.FC = () => {
  const DeveloperTest: boolean = useSelector((state: RootState) => state.developertest.border_test)
  const getClassNames = (baseClass: string) => `${baseClass} ${DeveloperTest ? 'border border-red-700' : ''}`;
  const settings: Settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 3.2,
    slidesPerRow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    draggable: true,
    swipe: true,
    touchMove: true,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className={getClassNames("slider-container")}>
      <Slider {...settings}>
        {[1, 2, 3, 4, 5].map((index) => (
          <div key={index} className={getClassNames("p-2 ")}>
            <div className={getClassNames("bg-white shadow-md border border-gray-900 h-[100vh] hover:border-[#312EB5] hover:rounded-br-[50px] transition-all hover:shadow-gray-500 delay-150 hover: rounded-lg dark:bg-[#1E1E1F] dark:rounded-br-[150px]")}>
              <a href="#">
                <img
                  className={getClassNames("rounded-t-lg w-full ")}
                  src="https://flowbite.com/docs/images/blog/image-1.jpg"
                  alt="Article"
                />
              </a>
              <div className={getClassNames("p-5")}>
                <a href="#">
                  <h5 className={getClassNames("text-gray-900  font-bold text-xl mb-2 dark:text-white")}
                    style={{ borderTopRightRadius: 200 }}
                  >
                    Noteworthy Tech Acquisitions 2021
                  </h5>
                </a>
                <p className={getClassNames("text-gray-700 dark:text-gray-400 text-sm mb-3")}>
                  Biggest enterprise technology acquisitions of 2021 in reverse chronological order.
                </p>
                <a
                  href="#"
                  className={getClassNames("text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-3 py-2 inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700")}
                >
                  Read more
                  <svg
                    className={getClassNames("-mr-1 ml-2 h-4 w-4")}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Section3;
