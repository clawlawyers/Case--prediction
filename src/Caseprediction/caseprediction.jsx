import React from "react";
import { useState, useEffect, useMemo } from "react";
import Logo from "../assets/Vector.png";
import Detective from "../assets/Detective.png";
import Cost from "../assets/Cost.png";
import Growth from "../assets/Growth.png";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Particles from "@tsparticles/react";
import { motion } from "framer-motion";

const CasePrediction = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "repulse" },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 200, duration: 0.9 },
        },
      },
      particles: {
        color: { value: "#ffffff" },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "bounce" },
          random: false,
          speed: 2,
          straight: false,
        },
        number: {
          density: { enable: true },
          value: 150,
        },
        opacity: { value: 0.5 },
        shape: { type: "star" },
        size: { value: { min: 1, max: 2 } },
      },
      detectRetina: true,
    }),
    []
  );
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-700 to-gray-900 text-white">
      {init && (
        <Particles
          options={options}
          className="absolute top-0 left-0 w-full h-full"
          style={{ zIndex: 0, pointerEvents: "none" }}
        />
      )}

      <div className="relative z-10">
        <header className="py-4">
          <div className="w-full sm:w-[90%] mx-auto px-8 sm:px-6 lg:px-8">
            <Header />
          </div>
        </header>

        <main className="flex flex-col items-center text-center pt-12">
          <motion.div  
          initial={{y:-30, opacity: 0,}}
              whileInView={{ x: 0, y:0,opacity: 1,}}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ amount: 0.1, once: true }}
          >
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 mx-2">
            Case Prediction
          </h1>
          </motion.div>

<motion.div
initial={{y:50, opacity: 0,}}
              whileInView={{ x: 0, y:0,opacity: 1,}}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ amount: 0.1, once: true }}
>


          <p className="text-[16px] max-w-3xl sm:mx-6 mx-4">
            Analyze the strength of your case before stepping into the courtroom.
          </p>
          <p className="font-sans text-[14px] max-w-3xl mb-12 font-normal sm:mx-6 mx-4">
            The Case Prediction uses advanced AI to evaluate your evidence,
            witnesses, and legal scenario, providing a detailed analysis of your
            case's probability of success. Make informed decisions with clarity
            and confidence.
          </p>
</motion.div>
          <div className="w-[80%] grid grid-cols-1 sm:grid-cols-3 gap-12 mb-12 pt-8">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ amount: 0.1, once: true }}

              className="flex flex-col items-center">
              <div className="w-14 h-14 text-teal-900 rounded-full flex justify-center items-center mb-2">
                <img src={Detective} alt="Icon" className="w-12 h-12" />
              </div>
              <h3 className="text-[18px] font-bold">
                Evidence & Witness Analysis
              </h3>
              <div style={{ width: "70%", paddingTop: "10px" }}>
                <p className="text-[14px]">
                  Our AI reviews your evidence and witnesses, based on the court
                  where your case is filed, to show how strong they are
                </p>
              </div>
            </motion.div>



            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ amount: 0.1, once: true }}

            className="flex flex-col items-center">
              <div className="w-14 h-14 text-teal-900 rounded-full flex justify-center items-center mb-2">
                <img src={Cost} alt="Icon" className="w-12 h-12" />
              </div>
              <h3 className="text-[18px] font-bold">Cost Estimation</h3>
              <div style={{ width: "70%", paddingTop: "10px" }}>
                <p className="text-[14px]">
                  Find out the expected costs for your case, including filing fees,
                  lawyer charges, possible compensation & case complexity.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ amount: 0.1, once: true }}

            className="flex flex-col items-center">
              <div className="w-14 h-14 text-teal-900 rounded-full flex justify-center items-center mb-2">
                <img src={Growth} alt="Icon" className="w-12 h-12" />
              </div>
              <h3 className="text-[18px] font-bold">Know Winning Possibility</h3>
              <div style={{ width: "70%", paddingTop: "10px" }}>
                <p className="text-[14px]">
                  See a simple graph that shows how strong your case by analyzing
                  all the factors and get tips on whether you should proceed.
                </p>
              </div>
            </motion.div>
          </div>

<motion.div
 initial={{x:80,y:20,  opacity: 0, scale: 0.2 }}
              whileInView={{ x: 0,y:0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ amount: 0.1, once: true }}
>

          <Link to="/input">
            <button
              // className="w-full max-w-[250px] sm:max-w-[280px] md:max-w-[480px] hover:opacity-95 border-2 border-transparent text-white px-4 py-2 sm:px-6 sm:py-3 rounded-[10px] mb-4 md:mt-6"
              className={`exp-button w-full max-w-[250px] sm:max-w-[280px] md:max-w-[480px] hover:opacity-95 border-2 border-transparent text-white px-4 py-2 sm:px-6 sm:py-3  mb-4 md:mt-6`}
              style={{ borderImage: "linear-gradient(90deg, #00DDE5 0%, #00C37B 100%) 1" }}
            >
              Analyze Your Legal Case
            </button>
          </Link>
</motion.div>

        </main>
      </div>




      <style>


        {
          `.exp-button {
  
  color: white;
  cursor: pointer;
  margin-top: auto;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
 
  -webkit-tap-highlight-color: transparent;
  z-index: 1;
}

/* Button shine effect */
.exp-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  transition: 0.5s;
  z-index: -1;
}

/* Button glow effect */
.exp-button::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #00ffff, #00bcd4, #00ffff);

  z-index: -2;
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* Button hover and active states */
.exp-button:hover,
.exp-button:active {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  animation: buttonPulse 1.5s infinite;
}

.exp-button:hover::before,
.exp-button:active::before {
  left: 100%;
}

.exp-button:hover::after,
.exp-button:active::after {
  opacity: 1;
  animation: buttonGlow 1.5s infinite;
}

@keyframes buttonPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 255, 255, 0.4);
  }
  70% {
    box-shadow: 0 0 20px 10px rgba(0, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 255, 255, 0);
  }
}

@keyframes buttonGlow {
  0% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.02);
  }
  100% {
    opacity: 0.5;
    transform: scale(1);
  }
}`
        }
      </style>
    </div>
  );
};

export default CasePrediction;