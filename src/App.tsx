import "destyle.css";
import Footer from "./components/Footer.tsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import snailGuy from "./assets/snail-guy.svg";
import snail1 from "./assets/Snail-1.svg";
import glitters from "./assets/glitters.svg";
import balloons from "./assets/balloons.svg";
import newAlbum from "./assets/newAlbumSoon.svg";
import cake from "./assets/cake.png";
import {
  useRive,
  Layout,
  Fit,
  Alignment,
  StateMachineInput,
} from "@rive-app/react-canvas";

import "./App.css";
import { useEffect, useState } from "react";
export const RiveDemo = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0); // Etat pour stocker le pourcentage du scroll

  const { RiveComponent, rive } = useRive({
    src: "tunnelvision.riv", // Fichier Rive
    stateMachines: "ScrollController", // Machine d'état
    layout: new Layout({
      fit: Fit.Contain, //  Rendu dans le canvas
      alignment: Alignment.Center,
    }),
    autoplay: true,
  });

  // Utiliser useEffect pour le scroll
  useEffect(() => {
    let stateMachineLoadInput: StateMachineInput;

    if (rive) {
      // Initialiser l'entrée de la machine d'état au chargement
      stateMachineLoadInput = rive.stateMachineInputs("ScrollController")[0];
      if (stateMachineLoadInput) {
        stateMachineLoadInput.value = 1;
      }
    }

    // Calcul du pourcentage du scroll
    const onScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
          100
      );
      setScrollPercentage(scrollPercentage); // Mettre à jour l'état
      // Mettre à jour la valeur de la machine d'état selon le pourcentage
      if (stateMachineLoadInput) {
        stateMachineLoadInput.value = scrollPercentage;
      }
    };

    // Ajouter l'écouteur d'événements pour le scroll
    document.onscroll = onScroll;

    // Nettoyage lors du démontage du composant
    return () => {
      document.onscroll = null;
    };
  }, [rive]); // Déclenche l'effet quand `rive` est chargé
  return (
    <>
      <RiveComponent />
      {/* Afficher le pourcentage de scroll, pour débogage ou feedback visuel 
      <div
        style={{
          position: "fixed",
          top: 10,
          left: 10,
          background: "white",
          padding: "5px",
        }}
      >
        Scroll Progress: {scrollPercentage}%
      </div>*/}
    </>
  );
};
function App() {
  return (
    <>
      <div className="stickers">
        <div className="stickers_side left">
          <div>
            <img src={snail1} className="sticker_snail" alt="Un Escargot" />
          </div>
          <div>
            <img
              src={glitters}
              className="sticker_item left"
              alt="Un Escargot"
            />
          </div>
        </div>

        <div className="stickers_side right">
          <div>
            <img
              src={balloons}
              className="sticker_item right"
              alt="Un Escargot"
            />
          </div>
          <div>
            <img src={snailGuy} className="sticker_snail" alt="Un Escargot" />
          </div>
        </div>
      </div>
      <div className="newAlbum">
        <img src={newAlbum} className="" alt="New Album Soon!" />
      </div>
      <div className="title">
        <RiveDemo />
      </div>
      <div className="bottom_elements">
        <div className="cake">
          <img src={cake} alt="a cake with the album release date : 14.02 " />
        </div>
        <div className="scrollDown">
          <button>Click here to create your own album cover!</button>
        </div>
      </div>
      <div className="gap" />
      <Footer />
    </>
  );
}

export default App;
