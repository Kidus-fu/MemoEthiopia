import React from 'react';
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