// import { motion } from "framer-motion";

// interface WritingAnimationProps {
//   paragraph: string;
//   speed?: number; // Controls the speed of typing (lower = faster)
//   delay?: number; // Initial delay before animation starts
//   border?: boolean; // Option to show border
// }

// const WritingAnimation: React.FC<WritingAnimationProps> = ({
//   paragraph,
//   speed = 0.05, // Default: 0.05s per letter
//   delay = 0.2, // Default: 0.2s before starting
// }) => {

//   // Variants for paragraph animation
//   const paragraphVariants = {
//     hidden: { opacity: 1 },
//     visible: {
//       opacity: 0.9,
//       transition: {
//         delay,
//         staggerChildren: speed ,
//       },
//     },
//   };

//   // Variants for each letter animation
//   const letterVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1 },
//   };

//   return (
//     <motion.div
//       variants={paragraphVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       {paragraph.split("").map((char, index) => (
//         <motion.span className="opacity-10" key={index} variants={letterVariants}>
//           {char}
//         </motion.span>
//       ))}
//     </motion.div>
//   );
// };

// export default WritingAnimation;

import { motion } from 'framer-motion';

interface WritingAnimationProps {
  paragraph: string;
  speed?: number;
  delay?: number;
}



const WritingAnimation: React.FC<WritingAnimationProps> = ({
  paragraph,
  speed = 0.05, // Default: 0.05s per letter
  delay = 0.2, // Default: 0.2s before starting
}) => {
  // Variants for animating the entire paragraph (opacity fade-in and staggered letters)
  const paragraphVariants = {
    hidden: { opacity: 1 }, // Initial state is fully visible
    visible: {
      opacity: 1,
      transition: {
        delay: delay, // Adds a small delay before the animation starts
        staggerChildren: speed, // Each letter animates with a delay of 0.05 seconds
      },
    },
  };

  // Variants for each individual letter's animation (fade-in)
  const letterVariants = {
    hidden: { opacity: 0 }, // Initially, letters are invisible
    visible: { opacity: 1 }, // When visible, letters become fully opaque
  };

  return (
    <motion.p
      variants={paragraphVariants}
      initial="hidden"
      animate="visible"
    >
      {paragraph.split('').map((char, index) => (
        <motion.span key={index} variants={letterVariants}>
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
};

export default WritingAnimation;