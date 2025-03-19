import React from "react";
import { motion } from "framer-motion";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import WritingAnimation from "./WritingAnimation";
import Section2Img from "../assets/NoteBook1.png"

const Section2: React.FC = () => {
  const DeveloperTest: boolean = useSelector((state: RootState) => state.developertest.border_test);
  const getClassNames = (baseClass: string) => `${baseClass} ${DeveloperTest ? 'border border-red-700' : ''}`;

  return (
    <motion.div
      className={getClassNames("flex flex-col md:flex-row gap-8 p-8 h-screen w-full transition-all delay-100")}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      style={{ minHeight: "100vh" }} // Ensure it takes up at least the full screen height
    >

      {/* Text Content */}
      <motion.div
        className={getClassNames("flex flex-col justify-center items-center text-center w-full md:w-1/2 space-y-6")}
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className={getClassNames("text-3xl md:text-4xl font-bold text-gray-300")}>Memo Ethiopia</h2>
        <p className={getClassNames("text-lg md:text-xl text-gray-400")}>
          <WritingAnimation
            paragraph="Powerful, secure, and intuitive note-taking. Designed for those who want efficiency without complexity."
            speed={0.04}
            delay={0.5}
          />
        </p>

        {/* Features List */}
        <ul className={getClassNames("text-left text-gray-400 space-y-2")}>
          <li>Easy Note Creation – Quickly capture and organize your ideas.</li>
          <li>Cloud Sync – Access your notes anytime, anywhere.</li>
          <li>Secure & Private – Your data is encrypted and safe.</li>
          <li>Smart Search – Find your notes in seconds.</li>
        </ul>

        <motion.button
          className={getClassNames("mt-4 px-6 py-2 bg-[#312EB5] text-white rounded-lg hover:bg-[#302eb5c7] transition-colors")}
          whileHover={{ scale: 1.05 }}
          whileDrag={{ scale: 2 }}
          whileTap={{ scale: 0.9, opacity: 0.6 }}
        >
          Get Started
        </motion.button>
      </motion.div>


      {/* Image Container */}
      <motion.div
        className={getClassNames("hidde md:block h-64 md:h-full w-full md:w-1/2 bg-cover bg-center rounded-lg ")}
        style={{ backgroundImage: `url('${Section2Img}')` }}
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
      ></motion.div>
    </motion.div>
  );
};

export default Section2;