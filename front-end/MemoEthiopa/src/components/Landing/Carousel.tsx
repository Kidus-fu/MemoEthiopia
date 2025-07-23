import React from 'react';
import { Carousel } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import WritingAnimation from '../WritingAnimation';

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
    <Carousel
  autoplay
  autoplaySpeed={4000}
  dots
  draggable
  arrows
  className={getClassNames("p-2 rounded-xl shadow-sm")}
>
  {[
    {
      title: <WritingAnimation paragraph='Welcome to Memo Ethiopia' />,
      description: `While jotting things down with pen and paper has always been a reliable method, we believe there’s a better, smarter way to manage your thoughts, tasks, and ideas. With Memo Ethiopia, you can take your productivity to the next level by turning your smartphone, tablet, or computer into a powerful digital notebook.`,
      // image: "https://cdn.pixabay.com/photo/2017/04/10/20/15/sticky-notes-2219653_960_720.png",
    },
    {
      title: <WritingAnimation paragraph='Memo Ethiopia Solutions' />,
      description: `Welcome to Memo Ethiopia Solutions, a smart, homegrown platform designed to revolutionize the way Ethiopians take notes, stay organized, and manage information. We understand that ideas, reminders, and plans can come at any moment, and with Memo Ethiopia, capturing those thoughts is just a tap away.`,
      // image: "https://cdn.pixabay.com/photo/2013/07/12/19/18/sticky-note-154504_1280.png",
    },
    {
      title: "The Future of AI",
      description: `Artificial Intelligence is reshaping how we live, learn, and work. From smart assistants to creative tools, AI is becoming more personal, powerful, and accessible. At MemoEthiopia, we believe AI should serve real people in real communities, making life easier, learning smarter, and productivity more human.`,
      image: "https://cdn.pixabay.com/photo/2025/03/01/20/18/ai-generated-9440737_960_720.png",
    },
    {
      title: "Built with Security in Mind",
      description: `At MemoEthiopia, your privacy and data security are not just features—they’re a promise. All your memos, preferences, and personal data are encrypted end-to-end. We follow modern best practices to ensure your information remains yours, always.`,
      // image: "https://cdn.pixabay.com/photo/2014/04/03/00/32/padlock-308589_1280.png",
    },
  ].map((item, index) => (
     <div
      key={index}
      className="flex flex-col md:flex-row items-center justify-center gap-8 rounded-xl overflow-hidden shadow hover:shadow-md transition-all duration-300 cursor-grab active:cursor-grabbing p-4"
    >
      {/* Image - only visible on PC */}
     <div className="flex justify-center items-center p-4">
       <div className="hidden md:flex w-[400px] h-[350px] justify-center items-center rounded-lg overflow-hidden">
        {item.image && (
        <img
          src={item.image}
          alt={typeof item.title === "string" ? item.title : "Memo Ethiopia"}
          className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
        />)}
      </div>

      {/* Text - always visible */}
      <div className="max-w-lg text-center md:text-left p-4">
        <h1 className="text-2xl font-bold mb-4 select-none">{item.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {item.description}
        </p>
      </div>
     </div>
    </div>
  ))}
</Carousel>

  )
}

export default LandingPageCarousel;
