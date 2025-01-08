import "destyle.css";
import mrEscargot from "./assets/mrEscargot.svg";
import mmeEscargot from "./assets/mmeEscargot.svg";
import glitters from "./assets/glitters.svg";
import ballons from "./assets/ballons.svg";

import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";

import "./App.css";

export const RiveDemo = () => {
  const { RiveComponent } = useRive({
    src: "/animation/tunnelVision.riv", // Chemin absolu depuis public
    stateMachines: "Motion",
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.Center,
    }),
    autoplay: true,
  });

  return <RiveComponent />;
};

function App() {
  return (
    <>
      <div className="stickers">
        <div>
          <img src={mmeEscargot} className="" alt="Un Escargot" />
          <img src={glitters} className="" alt="Un Escargot" />
        </div>
        <div>
          <img src={ballons} className="" alt="Un Escargot" />
          <img src={mrEscargot} className="" alt="Un Escargot" />
        </div>
      </div>
      <div className="newAlbum">New album soon!</div>
      <div className="title">
        <RiveDemo />
      </div>
      <div className="gap" />
      <div>
        <button className="scrollDownBtn">
          Create your own pochette d'album!
        </button>
      </div>
    </>
  );
}

export default App;
