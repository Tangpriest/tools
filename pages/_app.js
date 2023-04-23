import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import '../styles/globals.css';


const TextAnimation = ({ text, duration = 1.5, amplitude = 20 }) => {
  const [y, setY] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setY((y) => -y);
    }, duration * 1000);

    return () => clearInterval(intervalId);
  }, [duration]);

  return (
    <motion.span
      style={{ fontSize: "2rem", position: "relative", top: y }}
      animate={{ top: [amplitude, -amplitude, amplitude] }}
      transition={{ duration: duration, repeat: Infinity }}
    >
      {text}
    </motion.span>
  );
};


function MyApp({ Component, pageProps }) {

  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex:9999
            }}
          >
            <motion.span
              style={{
                fontSize: "6rem",
              }}
              animate={{
                y: [-20, 0, -20],
                rotate: [0, 180, 360],
                transition: {
                  repeat: Infinity, duration: 2 
                },
              }}
            >
              🤖️🤖️🤖️
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence> 

      <Component {...pageProps} setIsLoading={setIsLoading}/>
    </>
  )
}

export default MyApp;
