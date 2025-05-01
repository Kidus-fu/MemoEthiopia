import React from 'react';
import { Carousel } from 'antd';

const LandingPageCarousel: React.FC = () => (
  <Carousel autoplay autoplaySpeed={3000} dots draggable>
    {/* Slide 1 */}
    <div className="relative h-[450px] bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="flex flex-col lg:flex-row-reverse items-center max-w-7xl w-full">
        <div className="w-full lg:w-1/2">
          <img
            src="https://picsum.photos/id/1018/2000"
            alt="Winding mountain road"
            className="w-full h-[200px] object-cover rounded-xl shadow-xl transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="w-full mt-6 lg:mt-0 lg:w-1/2 lg:pl-12">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-green-400 mb-3">Winding Mountain Road</h2>
            <p className="text-base leading-relaxed text-gray-200 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis nostrud exercitation ullamco laboris nisi ut aliquip.
            </p>
            <a
              href="#"
              className="inline-block bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-all duration-300"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Slide 2 */}
    <div className="relative h-[450px] bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="flex flex-col lg:flex-row-reverse items-center max-w-7xl w-full">
        <div className="w-full lg:w-1/2">
          <img
            src="https://images.pexels.com/photos/5990153/pexels-photo-5990153.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1860"
            alt="Coffee"
            className="w-full h-[300px] object-cover rounded-xl shadow-xl transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="w-full mt-6 lg:mt-0 lg:w-1/2 lg:pl-12">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <p>Product Review</p>
              <p>17th March, 2021</p>
            </div>
            <h2 className="text-3xl font-bold mb-3">Coffee From Heaven</h2>
            <p className="text-base leading-relaxed text-gray-200 mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate saepe sed quis veritatis minus rem adipisci.
            </p>
            <button className="bg-purple-700 hover:bg-purple-800 py-2 px-5 rounded-md text-white transition-transform duration-300 hover:scale-105">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Slide 3 Placeholder */}
    <div className="flex items-center justify-center h-[450px] bg-gray-800 text-white text-3xl font-bold">
      More content coming soon...
    </div>

    {/* Slide 4 Placeholder */}
    <div className="flex items-center justify-center h-[450px] bg-gray-700 text-white text-3xl font-bold">
      Stay tuned for updates!
    </div>
  </Carousel>
);

export default LandingPageCarousel;
