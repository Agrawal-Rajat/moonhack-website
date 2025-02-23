import { motion } from "framer-motion";
import { useEffect } from "react";
import logo from "../assets/moonstone_logo.png"; // Ensure correct path

const Preloader = ({ onComplete }) => {
  useEffect(() => {
    setTimeout(onComplete, 1500); // Hide preloader after 1.5 seconds
  }, [onComplete]);

  return (
    <div className="h-screen w-full flex justify-center items-center bg-black overflow-hidden">
      <motion.img
        src={logo}
        alt="Hackathon Logo"
        initial={{ opacity: 1, width: "100%", height: "auto" }}
        animate={{
          opacity: 1,
          width: "50%",
          height: "auto",
        }}
        exit={{ opacity: 0, width: 0, height: 0 }}
        transition={{
          duration: 1.5, // Faster animation
          ease: "easeOut",
          opacity: { duration: 1 }, // Faster fade-out
        }}
        className="object-contain"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};

export default Preloader;
