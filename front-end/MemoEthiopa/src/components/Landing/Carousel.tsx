import React from 'react';
import { Carousel } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const LandingPageCarousel: React.FC = () => {

  const theme = useSelector((state: RootState) => state.theam.theme);
  const DeveloperTest = useSelector((state: RootState) => state.developertest.border_test);

  const getClassNames = (base: string) => {
    const border = DeveloperTest ? 'border border-red-700' : '';
    const themeStyle = theme === 'dark'
      ? 'bg-[#1C1C1C] text-white p-2'
      : 'bg-[#F3F6FB] text-black p-2';
    return `${base} ${border} ${themeStyle}`;
  };

  return (
    <Carousel autoplay autoplaySpeed={3000} dots draggable className={getClassNames("p-2")} arrows={true}  >
      <div className={getClassNames("relative h-[500px]  flex items-center justify-center transition-all duration-300  cursor-grab active:cursor-grabbing w-[400px] select-none")}>
        <div className={getClassNames("flex  justify-center gap-16 p-6 m-6")}>
          <div className={getClassNames("text-center z-50 scale-110 md:w-2/5")}>
            <h1 className={getClassNames("text-3xl font-bold mb-4 select-none")}>Welcome to Memo Ethiopia</h1>
            <p className={getClassNames("")}>While jotting things down with pen and paper has always been a reliable method, we believe there’s a better, smarter way to manage your thoughts, tasks, and ideas. With Memo Ethiopia, you can take your productivity to the next level by turning your smartphone, tablet, or computer into a powerful digital notebook.
              <br />Embrace the future of note-taking with Memo Ethiopia where your ideas find their perfect digital</p>
          </div>
          <div
            className={getClassNames("text-center hidden md:block hover:scale-105 transition-transform duration-300")}
            style={{
              background: 'url(https://cdn.pixabay.com/photo/2017/04/10/20/15/sticky-notes-2219653_960_720.png)',
              backgroundSize: 'covrer',
              backgroundPosition: 'top',
              width: '600px', // set a fixed width
              height: '400px', // set a fixed height
              borderRadius: '12px' // optional: for better look
            }}
          ></div>
          <div
            className={getClassNames(`absolute top-0 right-0 z-0 h-1/2 w-1/12 blur-3xl ${theme === 'dark' ? "bg-gray-700" : "bg-gray-300"} blur-2xl`)} />
        </div>
      </div>
      <div className={getClassNames("relative h-[400px] flex items-center justify-center transition-all duration-300 cursor-grab active:cursor-grabbing w-[400px] select-none")}>
        <div className={getClassNames("flex  justify-center gap-16 p-6 m-6 ")}>
          <div
            className={getClassNames("text-center hidden md:block hover:scale-105 transition-transform duration-300")}
            style={{
              background: 'url(https://cdn.pixabay.com/photo/2016/07/20/19/36/list-1531097_1280.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'top',
              width: '600px',
              height: '400px',
              borderRadius: '12px'
            }}
          ></div>
          <div className={getClassNames("text-center z-50 scale-110 md:w-2/5")}>
            <h1 className={getClassNames("text-3xl font-bold mb-4 select-none ")}>Memo Ethiopia solutions</h1>
            <p className={getClassNames("")}>Welcome to Memo Ethiopia Solutions a smart, homegrown platform designed to revolutionize the way Ethiopians take notes, stay organized, and manage information.
              <br />
              <br />
              We understand that ideas, reminders, and plans can come at any moment and with Memo Ethiopia, capturing those thoughts is just a tap away. Our goal is to bridge the gap between traditional note-taking and modern digital tools, making productivity accessible, intuitive, and secure for everyone.
            </p>
          </div>

        </div>
        <div className={getClassNames(`absolute bottom-0 left-0 z-0 h-1/2 w-1/12 blur-3xl ${theme === 'dark' ? "bg-gray-700" : "bg-gray-300"} blur-2xl`)} />

      </div>
      <div className={getClassNames("h-[500px]  flex items-center justify-center transition-all duration-300  cursor-grab active:cursor-grabbing w-[400px] select-none")}>
        <div className={getClassNames("flex  justify-center gap-16 p-6 m-6")}>
          <div className={getClassNames("text-center z-50 scale-110 md:w-2/5")}>
            <h1 className={getClassNames("text-3xl font-bold mb-4 select-none")}>The Future of AI</h1>
            <p className={getClassNames("")}>Artificial Intelligence is reshaping the way we live, learn, and work. From smart assistants to creative tools, AI is becoming more personal, powerful, and accessible. In the near future, AI won’t just help us with tasks it will understand our needs, adapt to our habits, and enhance our daily lives with smarter decisions and deeper insights.
              <br />
              <br />
              At MemoEthiopia, we believe AI should serve real people in real communities making life easier, learning smarter, and productivity more human. This is just the beginning. The future of AI is local, intelligent, and made for you.
            </p>
          </div>
          <div
            className={getClassNames("text-center hidden md:block hover:scale-105 transition-transform duration-300")}
            style={{
              background: 'url(https://cdn.pixabay.com/photo/2025/03/01/20/18/ai-generated-9440737_960_720.png)',
              backgroundSize: 'covrer',
              backgroundPosition: 'top',
              width: '600px', // set a fixed width
              height: '400px', // set a fixed height
              borderRadius: '12px' // optional: for better look
            }}
          ></div>
        </div>
      </div>
      <div className={getClassNames("h-[400px] flex items-center justify-center transition-all duration-300 cursor-grab active:cursor-grabbing w-[400px] select-none")}>
        <div className={getClassNames("flex  justify-center gap-16 p-6 m-6 ")}>
          <div
            className={getClassNames("text-center hidden md:block hover:scale-105 transition-transform duration-300")}
            style={{
              background: 'url(https://cdn.pixabay.com/photo/2014/04/03/00/32/padlock-308589_1280.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'top',
              width: '600px',
              height: '400px',
              borderRadius: '12px'
            }}
          ></div>
          <div className={getClassNames("text-center z-50 scale-110 md:w-2/5")}>
            <h1 className={getClassNames("text-3xl font-bold mb-4 select-none ")}>Built with Security in Mind</h1>
            <p className={getClassNames("")}>At MemoEthiopia, your privacy and data security are not just features they’re a promise. All your memos, preferences, and personal data are end-to-end encrypted, both in transit and at rest. We follow modern best practices in authentication, storage, and data access to ensure that only you can see your information.

              We do not sell, share, or expose your data to third parties. Your content is yours always.
              <br />
              <br />
              Whether you're storing personal thoughts, business ideas, or school notes, you can count on MemoEthiopia to protect your mind’s work. Our mission is to build safe, smart, and accessible tools for the people of Ethiopia and beyond, powered by responsible AI.
            </p>
          </div>

        </div>

      </div>

    </Carousel>
  )
}

export default LandingPageCarousel;
