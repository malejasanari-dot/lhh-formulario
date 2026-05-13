import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-1.5 bg-text-primary/10 z-50">
      <motion.div
        className="h-full bg-accent-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />
    </div>
  );
};

export default ProgressBar;
