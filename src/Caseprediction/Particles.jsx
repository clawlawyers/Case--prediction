import React, { useMemo } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {
  const options = useMemo(() => ({
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
    },
    particles: {
      color: { value: "#ffffff" },
      move: {
        enable: true,
        speed: 1,
      },
      number: {
        value: 50, // Reduced for better performance
      },
      opacity: {
        value: 0.5,
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
  }), []);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
        
      <Particles
        id="tsparticles"
        init={async (engine) => {
          await loadSlim(engine);
        }}
        options={options}
      />
    </div>
  );
};

export default ParticlesBackground;