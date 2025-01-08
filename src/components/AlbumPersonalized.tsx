import {useState} from "react";

// images
import soso from '../assets/form/soso.png';
import happy from '../assets/form/happy.png';
import sohappy from '../assets/form/sohappy.png';

import wave from '../assets/form/wave.svg';
import cloud from '../assets/form/cloud.svg';
import flower from '../assets/form/flower3.png';

import heart from '../assets/form/heart.png';
import bunny from '../assets/form/bunny.png';
import star from '../assets/form/motel.png';
import sparkle from '../assets/form/honeymoon.png';
import ballon from '../assets/form/basket.png';
import snail from '../assets/form/cake.png';
import bandage from '../assets/form/bandage.png';
import bird from '../assets/form/bird.png';

import cake from '../assets/form/cake.png';
import suitcase from '../assets/form/suitcase.png';
import motel from '../assets/form/motel.png';
import honeymoon from '../assets/form/honeymoon.png';
import basket from '../assets/form/basket.png';

function AlbumPersonalized() {
    const [mood, setMood] = useState("happy");
    const [background, setBackground] = useState("")
    const [stickers, setStickers] = useState<string[]>([])
    const [stickersCount, setStickersCount] = useState("0")
    const [rotateTitle, setRotateTitle] = useState(false)
    const [funkyLetters, setFunkyLetters] = useState(false)
    const [image, setImage] = useState("")


    const choseMood = (mood: string) => {
        setMood(mood)
    }
    const choseBackground = (image: string) => {
        setBackground(image)
    }
    const choseStickers = (image: string) => {
        const isSelected = stickers.includes(image);

        let stick;
        if (!isSelected) {
            stick = [...stickers, image];
        } else {
            stick = stickers.filter((element) => element !== image);
        }

        setStickers(stick); // Update the state
    };
    const choseImage = (image: string) => {
        setImage(image)
    }

    const addToCart = () => {
        console.log(mood)
        console.log(background)
        console.log(stickers)
        console.log(stickersCount)
        console.log(rotateTitle)
        console.log(funkyLetters)
        console.log(image)
    }

    return (
        <div>
            <div className="title-container">
                <h1>TUNNEL VISION</h1>
                <h2>Design your custom covers for Beach Bunny's new album with your unique parameters!</h2>
            </div>

            <div className="canvas-wrapper">
                <section className="section-left">
                    <div>
                        <canvas id="canvas"></canvas>
                        <div className="submit-button" onClick={() => addToCart()}>
                            Add to the cart
                        </div>
                    </div>
                </section>

                <section className="section-right">
                    <div className="category-container">
                        <h3>Your mood</h3>
                        <div className="images-container">
                            <div onClick={() => choseMood("soso")} style={{opacity: mood === "soso" ? 1 : 0.5}}><img
                                src={soso} alt=""/></div>
                            <div onClick={() => choseMood("happy")} style={{opacity: mood === "happy" ? 1 : 0.5}}>
                                <img src={happy} alt=""/></div>
                            <div onClick={() => choseMood("sohappy")}
                                 style={{opacity: mood === "sohappy" ? 1 : 0.5}}><img src={sohappy} alt=""/></div>
                        </div>
                    </div>

                    <div className="category-container">
                        <h3>Background image</h3>
                        <div className="images-container background-images">
                            <div onClick={() => choseBackground("wave")}
                                 style={{opacity: background === "wave" ? 1 : 0.5}}><img src={wave} alt=""/></div>
                            <div onClick={() => choseBackground("cloud")}
                                 style={{opacity: background === "cloud" ? 1 : 0.5}}><img src={cloud} alt=""/></div>
                            <div onClick={() => choseBackground("flowers")}
                                 style={{opacity: background === "flowers" ? 1 : 0.5}}><img src={flower} alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="category-container">
                        <h3>Stickers</h3>
                        <div className="images-container">
                            <div onClick={() => choseStickers("heart")}
                                 style={{opacity: stickers.includes("heart") ? 1 : 0.5}}><img src={heart} alt=""/></div>
                            <div onClick={() => choseStickers("bunny")}
                                 style={{opacity: stickers.includes("bunny") ? 1 : 0.5}}><img src={bunny} alt=""/></div>
                            <div onClick={() => choseStickers("star")}
                                 style={{opacity: stickers.includes("star") ? 1 : 0.5}}><img src={star} alt=""/></div>
                            <div onClick={() => choseStickers("sparkle")}
                                 style={{opacity: stickers.includes("sparkle") ? 1 : 0.5}}><img src={sparkle} alt=""/>
                            </div>
                            <div onClick={() => choseStickers("ballon")}
                                 style={{opacity: stickers.includes("ballon") ? 1 : 0.5}}><img src={ballon} alt=""/>
                            </div>
                            <div onClick={() => choseStickers("snail")}
                                 style={{opacity: stickers.includes("snail") ? 1 : 0.5}}><img src={snail} alt=""/></div>
                            <div onClick={() => choseStickers("bandage")}
                                 style={{opacity: stickers.includes("bandage") ? 1 : 0.5}}><img src={bandage} alt=""/>
                            </div>
                            <div onClick={() => choseStickers("bird")}
                                 style={{opacity: stickers.includes("bird") ? 1 : 0.5}}><img src={bird} alt=""/></div>
                        </div>
                    </div>
                    <div className="category-container input-wrapper">
                        <h3>Number of stickers</h3>
                        <input type="range" min="1" max="10" value={stickersCount}
                               onChange={(e) => setStickersCount(e.target.value)}/>
                    </div>
                    <div className="category-container input-wrapper">
                        <h3>Title random rotation</h3>
                        <input type="checkbox" checked={rotateTitle}
                               onChange={(e) => setRotateTitle(e.target.checked)}/>
                    </div>
                    <div className="category-container input-wrapper">
                        <h3>Title funky letters</h3>
                        <input type="checkbox" checked={funkyLetters}
                               onChange={(e) => setFunkyLetters(e.target.checked)}/>
                    </div>
                    <div className="category-container">
                        <h3>Primary image</h3>
                        <div className="images-container primary-image">
                            <div onClick={() => choseImage("cake")} style={{opacity: image === "cake" ? 1 : 0.5}}><img
                                src={cake} alt=""/></div>
                            <div onClick={() => choseImage("suitcase")}
                                 style={{opacity: image === "suitcase" ? 1 : 0.5}}><img src={suitcase} alt=""/></div>
                            <div onClick={() => choseImage("motel")} style={{opacity: image === "motel" ? 1 : 0.5}}><img
                                src={motel} alt=""/></div>
                            <div onClick={() => choseImage("honeymoon")}
                                 style={{opacity: image === "honeymoon" ? 1 : 0.5}}><img src={honeymoon} alt=""/></div>
                            <div onClick={() => choseImage("basket")} style={{opacity: image === "basket" ? 1 : 0.5}}>
                                <img src={basket} alt=""/></div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AlbumPersonalized