import React, { useEffect, useState } from "react";
import { useRive } from "@rive-app/react-canvas";

const SnailAnimation = () => {
  const [isHovered, setIsHovered] = useState(false);

  const { RiveComponent, rive } = useRive({
    src: "snail.riv", // Chemin de ton fichier .riv
    stateMachines: "State Machine 1", // Nom de ta State Machine
    autoplay: false, // Désactive l'auto-play pour contrôler l'animation
  });

  useEffect(() => {
    if (rive) {
      const inputs = rive.stateMachineInputs("StateMachineName");
      const hoverInput = inputs.find((input) => input.name === "isHovered");

      if (hoverInput) {
        // Lorsqu'on survole, on met l'input à true
        hoverInput.value = isHovered;
      }
    }
  }, [isHovered, rive]);

  const handleMouseEnter = () => setIsHovered(true); // Déclenche l'animation
  const handleMouseLeave = () => setIsHovered(false); // Arrête l'animation

  return (
    <div
      id="hover-area"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ width: "200px", height: "200px", border: "1px solid #000" }}
    >
      <RiveComponent />
    </div>
  );
};

export default SnailAnimation;
