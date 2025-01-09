import React from "react";
import "./style.css";
import photoBand from "../../assets/beach_bunny_band.jpg";
import photoConcert from "../../assets/Beach_Bunny_concert.jpg";
export const About = () => {
  return (
    <div className="aboutVue">
      <div className="upDiv">
        <p>
          <h1>About Beach Bunny</h1>
          Beach Bunny is more than just an indie pop-rock band; it’s a
          phenomenon. Founded in 2015 in Chicago by Lili Trifilio, what started
          as a solo project has evolved into a vibrant collective that
          captivates listeners worldwide. With catchy melodies, heartfelt
          lyrics, and infectious energy, Beach Bunny has become a defining voice
          in the alternative music scene.
        </p>
        <p>
          <h1>Breakthrough Success</h1>
          Beach Bunny’s big moment came in 2020 with the release of their debut
          album, "Honeymoon". The album explored love, self-doubt, and emotional
          vulnerability through a lens both playful and profound. The track
          "Prom Queen" exploded in popularity, fueled by TikTok’s viral energy,
          and catapulted the band into international recognition.
        </p>

        <div className="photoBand">
          <img src={photoBand} alt="Beach Bunny" />
        </div>
      </div>
      <div className="downDiv">
        <div className="concert">
          <img src={photoConcert} alt="Beach Bunny Concert" />
        </div>
        <p>
          <h1>Tunnel Vision: Beach Bunny’s Next Chapter</h1>
          Beach Bunny’s upcoming album, "Tunnel Vision," promises to be their
          most ambitious project yet. Set to release later this year, the album
          explores themes of focus, self-reflection, and navigating the chaos of
          modern life—all wrapped in the band’s signature blend of raw emotion
          and infectious energy. Fans can expect a fresh sound that pushes
          creative boundaries while staying true to the heartfelt honesty that
          makes Beach Bunny so beloved. With shimmering melodies and poignant
          lyrics, "Tunnel Vision" is set to be a deeply relatable and
          transformative listening experience.
        </p>
      </div>
    </div>
  );
};
