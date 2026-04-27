"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function FloatingCamera() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  const springConfig = { stiffness: 100, damping: 30 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x: e.clientX, y: e.clientY });
      rotateX.set(-y);
      rotateY.set(x);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block"
      style={{
        perspective: 1000,
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
      }}
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      {/* Camera Body */}
      <div className="relative w-64 h-48">
        {/* Main body */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl shadow-2xl glow-cyan">
          {/* Top grip */}
          <div className="absolute -top-4 left-8 right-20 h-8 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-t-lg" />
          
          {/* Flash */}
          <motion.div 
            className="absolute -top-2 right-4 w-8 h-6 bg-zinc-600 rounded-sm"
            animate={{
              boxShadow: [
                "0 0 0px rgba(0, 200, 255, 0)",
                "0 0 20px rgba(0, 200, 255, 0.5)",
                "0 0 0px rgba(0, 200, 255, 0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          />
          
          {/* Lens mount */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div 
              className="w-32 h-32 rounded-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {/* Outer lens ring */}
              <div className="w-full h-full rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 p-3 relative">
                {/* Inner lens */}
                <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-500/30 via-violet-500/20 to-cyan-400/30 relative overflow-hidden">
                  {/* Lens reflection */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  {/* Aperture blades effect */}
                  <div className="absolute inset-4 rounded-full border-4 border-zinc-900/50" />
                  <div className="absolute inset-8 rounded-full bg-zinc-900/80" />
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Mode dial */}
          <motion.div 
            className="absolute top-3 left-4 w-6 h-6 rounded-full bg-zinc-600 border-2 border-zinc-500"
            animate={{ rotate: [0, 45, 0, -45, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          {/* Shutter button */}
          <motion.div 
            className="absolute -top-3 left-16 w-8 h-4 rounded-full bg-gradient-to-b from-cyan-400 to-cyan-600 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              boxShadow: [
                "0 0 10px rgba(0, 200, 255, 0.3)",
                "0 0 20px rgba(0, 200, 255, 0.6)",
                "0 0 10px rgba(0, 200, 255, 0.3)",
              ],
            }}
            transition={{
              boxShadow: { duration: 2, repeat: Infinity },
            }}
          />
          
          {/* Screen */}
          <div className="absolute bottom-3 right-3 w-16 h-10 bg-zinc-900 rounded border border-zinc-700">
            <motion.div 
              className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 rounded"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />
          </div>
        </div>
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-cyan-400/60"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
