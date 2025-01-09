import './styles.css'

import cake from '../assets/form/cake.png';
import basket from '../assets/form/basket.png';
import honeymoon from '../assets/form/honeymoon.png';
import suitcase from '../assets/form/suitcase.png';
import motel from '../assets/form/motel.png';
import title from '../assets/title.png';
import title2 from '../assets/title2.png';
import flower from '../assets/form/flower1.png';

export let canvas: HTMLCanvasElement;
export let ctx: CanvasRenderingContext2D | null;

const colors = {
    "BLACK": "#1E1E1E",
    "PINK": "#FDE0E3",
    "BLUE": "#C2DCEE",
    "YELLOW": "#FFF9B8",
    "DARK-PINK": "#FEB8EE",
    "DARK-BLUE": "#7EC8C7",
    "DARK-PURPLE": "#A290BD",
    "DARK-YELLOW": "#E6E092",
}
const params = {
    "MAX-WAVES-PATTERN": 30,
    "MAX-PATTERN": 20,
}

let backgroundMood: string = "";
let albumTitle: HTMLImageElement | null;
let titleProperties = {
    x: 0,
    y: 0,
    drawWidth: 0,
    drawHeight: 0,
};
let albumImage: HTMLImageElement | null;
let imageProperties = {
    x: 0,
    y: 0,
    drawWidth: 0,
    drawHeight: 0,
};
let listStickers: string[];
let numberOfStickers: number = 1;
let isRotate = false;
let isFunky = true;
let backgroundPattern: string

export function initCanvas() {
    canvas = document.getElementById('canvas') as HTMLCanvasElement;
    ctx = canvas.getContext("2d");

    const width = canvas.clientWidth * 2;
    const height = canvas.clientHeight * 2

    canvas.width = width;
    canvas.height = height;

    drawTitleOnCanvas()
}

function drawTitle() {
    const {x, y, drawWidth, drawHeight} = titleProperties;

    if (ctx && albumTitle) {
        const newBaseImage = new Image();
        newBaseImage.src = isFunky ? title : title2;

        newBaseImage.onload = function () {
            albumTitle = newBaseImage;
        }

        if (isRotate) {
            ctx.save();
            const centerX = x + drawWidth / 2;
            const centerY = y + drawHeight / 2;
            const angle = (Math.random() - 0.5) * Math.PI / 2; // Random (-45° à 45°)
            ctx.translate(centerX, centerY);
            ctx.rotate(angle);
            ctx.drawImage(albumTitle, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
            ctx.restore();
        } else {
            ctx.drawImage(albumTitle, x, y, drawWidth, drawHeight);
        }
    }
}

export function colorCanvas(mood: string) {
    backgroundMood = mood;
    redrawEverything();
}

export function drawBackgroundPattern(pattern: string) {
    backgroundPattern = pattern
    redrawEverything();
}

export function drawImage(image: string) {
    drawImageOnCanvas(image);
    redrawEverything();
}

function drawImageCover() {
    const {x, y, drawWidth, drawHeight} = imageProperties;
    if (ctx && albumImage) ctx.drawImage(albumImage, x, y, drawWidth, drawHeight);
}

export function rotateAlbumTitle(value: boolean) {
    isRotate = value
    redrawEverything();
}

export function funkyImageCover(value: boolean) {
    isFunky = value
    redrawEverything()
}

export function patchStickers(list: string[], number: number) {
    listStickers = list;
    numberOfStickers = number
    redrawEverything();
}

function drawTitleOnCanvas() {
    if (ctx) {
        const base_image = new Image();
        base_image.src = title;

        base_image.onload = function () {
            albumTitle = base_image;

            // Calculate the image properties
            const imgWidth = base_image.width;
            const imgHeight = base_image.height;
            const imgAspectRatio = imgWidth / imgHeight;
            const canvasAspectRatio = canvas.width / canvas.height;

            let drawWidth, drawHeight;
            if (imgAspectRatio > canvasAspectRatio) {
                // Image is wider than canvas
                drawWidth = canvas.width / 2;
                drawHeight = (canvas.width / imgAspectRatio) / 2;
            } else {
                // Image is taller than canvas
                drawHeight = canvas.height / 2;
                drawWidth = (canvas.height * imgAspectRatio) / 2;
            }

            const x = canvas.width - (drawWidth + 50);
            const y = 50;

            titleProperties = { drawWidth, drawHeight, x, y };
            ctx?.drawImage(base_image, x, y, drawWidth, drawHeight);
        };
    }
}

function colorCanvasBackground(mood: string) {
    if (ctx) {
        switch (mood) {
            case "soso":
                ctx.fillStyle = colors.BLUE;
                break;
            case "happy":
                ctx.fillStyle = colors.YELLOW;
                break;
            case "sohappy":
                ctx.fillStyle = colors.PINK;
                break;
            default:
                ctx.fillStyle = "#FFFFFF"; // Default to white
        }
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

}

export function drawImageOnCanvas(image: string) {
    if (ctx) {
        // Map moods to imported images
        const moodToImage: Record<string, string> = {
            cake: cake,
            suitcase: suitcase,
            motel: motel,
            honeymoon: honeymoon,
            basket: basket,
        };

        const base_image = new Image();
        base_image.src = moodToImage[image];

        base_image.onload = function () {
            albumImage = base_image;

            // Calculate the image properties
            const imgWidth = base_image.width;
            const imgHeight = base_image.height;
            const imgAspectRatio = imgWidth / imgHeight;
            const canvasAspectRatio = canvas.width / canvas.height;

            let drawWidth, drawHeight;

            if (imgAspectRatio > canvasAspectRatio) {
                // Image is wider than canvas
                drawWidth = canvas.width * 3 / 5;
                drawHeight = (canvas.width / imgAspectRatio) * 3 / 5;
            } else {
                // Image is taller than canvas
                drawHeight = canvas.height * 3 / 5;
                drawWidth = (canvas.height * imgAspectRatio) * 3 / 5;
            }

            const x = image === "motel" ? 50 : 25;
            const y = image === "motel" ? canvas.height - drawHeight : canvas.height - (drawHeight + 25);

            imageProperties = { drawWidth, drawHeight, x, y };
        };
    }
}

function drawPatternOnBackground(pattern: string) {
    switch (pattern) {
        case "waves":
            drawWavesBackground();
            break;
        case "clouds":
            drawCloudsBackground();
            break;
        case "flowers":
            drawFlowersBackground();
            break;
        default:
            break
    }
}

function drawCloudsBackground() {
    if (ctx) {
        const predefinedColors = [colors["DARK-BLUE"], colors["DARK-PINK"], colors["DARK-YELLOW"], colors["DARK-PURPLE"], colors.BLACK];

        for (let i = 0; i <= params["MAX-PATTERN"]; i++) { // Draw 10 rectangles
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const width = Math.random() * 200 + 500;
            const height = Math.random() * 50 + 50;
            const radius = Math.random() * 50;
            const color = predefinedColors[Math.floor(Math.random() * predefinedColors.length)];

            drawCloud(x, y, width, height, radius, color);
        }
    }
}

function drawCloud(x: number, y: number, width: number, height: number, radius: number, color: string) {
    if (ctx) {
        ctx.beginPath();
        ctx.fillStyle = color;

        if (radius > 0) {
            // Rounded rectangle
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.lineTo(x + width, y + height - radius);
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            ctx.lineTo(x + radius, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
        } else {
            ctx.rect(x, y, width, height);
        }
        ctx.fill();
    }
}

function drawWavesBackground() {
    const predefinedColors = [colors["DARK-BLUE"], colors["DARK-PINK"], colors["DARK-YELLOW"], colors["DARK-PURPLE"], colors.BLACK];

    for (let i = 0; i < params["MAX-WAVES-PATTERN"]; i++) {
        const xStart = Math.random() * canvas.width;
        const yStart = Math.random() * canvas.height;
        const waveWidth = Math.random() * 100 + 100;
        const waveHeight = Math.random() * 20 + 10;
        const color = predefinedColors[Math.floor(Math.random() * predefinedColors.length)];

        drawWave(xStart, yStart, waveWidth, waveHeight, color);
    }
}

function drawWave(x: number, y: number, width: number, height: number, color: string) {
    if (ctx) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 15;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(x, y);

        // draw wave
        ctx.bezierCurveTo(
            x + width / 3, y - height, // 1st
            x + (2 * width) / 3, y + height, // 2nd
            x + width, y // end
        );

        ctx.stroke();
    }
}

function drawFlowersBackground() {
    if (ctx) {
        const gridSize = 5;
        for (let gy = 0; gy < gridSize; gy++) {
            for (let gx = 0; gx < gridSize; gx++) {
                const gridWidth = canvas.width / gridSize;
                const gridHeight = canvas.height / gridSize;

                const x = gridWidth/4 + gridWidth * gx;
                const y = gridHeight/4 + gridHeight * gy;
                drawFlower(x, y, gridWidth, gridHeight);
            }
        }
    }
}

function drawFlower(x: number, y: number, gridWidth: number, gridHeight: number) {
    const base_image = new Image();
    base_image.src = flower;

    base_image.onload = function () {

        // Calculate the image properties
        const imgWidth = base_image.width;
        const imgHeight = base_image.height;
        const imgAspectRatio = imgWidth / imgHeight;
        const canvasAspectRatio = gridWidth / gridHeight;

        let drawWidth, drawHeight;

        if (imgAspectRatio > canvasAspectRatio) {
            // Image is wider than canvas
            drawWidth = gridWidth * 3 / 5;
            drawHeight = (gridWidth / imgAspectRatio) * 3 / 5;
        } else {
            // Image is taller than canvas
            drawHeight = gridHeight * 3 / 5;
            drawWidth = (gridHeight * imgAspectRatio) * 3 / 5;
        }

        ctx?.drawImage(base_image, x, y, drawWidth, drawHeight);
    };
}

function drawStickers(stickers: string[], numberOfStickers: number) {
    const allStickers: string[] = [];

    if (stickers.length === 0 || numberOfStickers <= 0) {
        return allStickers;
    }

    for (let i = 0; i < numberOfStickers; i++) {
        const randomSticker = stickers[Math.floor(Math.random() * stickers.length)];
        allStickers.push(randomSticker);
    }

    if (allStickers.length !== 0) {
        allStickers.forEach((sticker) => {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 40 + 20; // Random size between 20 and 60
            const angle = Math.random() * Math.PI * 2; // Random rotation

            switch (sticker) {
                case "bunny":
                    drawSimpleRabbit(x, y);
                    break
                case "star":
                    drawStar(x, y);
                    break
                case "heart":
                    drawHeart(x, y, size, angle)
                    break
                default:
                    break
            }
        });

    }
}

function drawStar(x: number, y: number) {
    if (ctx) {
        const spikes = 5;
        const outerRadius = 50;
        const innerRadius = 25;
        let rotation = Math.PI / 2 * 3; // Point initial (vers le haut)
        const step = Math.PI / spikes; // Espacement entre les pointes

        ctx.beginPath();
        ctx.moveTo(x, y - outerRadius);

        for (let i = 0; i < spikes; i++) {
            const xOuter = x + Math.cos(rotation) * outerRadius;
            const yOuter = y + Math.sin(rotation) * outerRadius;
            ctx.lineTo(xOuter, yOuter);

            rotation += step;

            const xInner = x + Math.cos(rotation) * innerRadius;
            const yInner = y + Math.sin(rotation) * innerRadius;
            ctx.lineTo(xInner, yInner);

            rotation += step;
        }

        ctx.closePath();
        ctx.fillStyle = colors["DARK-PURPLE"];
        ctx.fill();
    }

}

function drawSimpleRabbit(x: number, y: number) {
    // Draw bunny ears
    drawOval(x-25, y-50, 20, 50, 157, 0, Math.PI * 2); // Oreille gauche
    drawOval(x+25, y-50, 20, 50, -25, 0, Math.PI * 2); // Oreille droite

    // Draw bunny face
    drawOval(x, y, 50, 40, 0, 0, Math.PI * 2); // Tête
}

function drawOval(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number) {
    if (ctx) {
        ctx.beginPath();
        ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle);
        ctx.fillStyle = colors["DARK-PINK"];
        ctx.fill();
    }
}

function drawHeart(x: number, y: number, size: number, angle: number = 0) {
    if (ctx) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        ctx.beginPath();
        ctx.arc(-size / 2, -size / 2, size / 2, Math.PI, 0, false);
        ctx.arc(size / 2, -size / 2, size / 2, Math.PI, 0, false);
        ctx.lineTo(0, size / 1.5);
        ctx.closePath();

        ctx.fillStyle = colors["DARK-BLUE"];
        ctx.fill();

        ctx.restore();
    }
}

export function redrawEverything() {
    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        if (backgroundMood) colorCanvasBackground(backgroundMood);
        if (backgroundPattern) drawPatternOnBackground(backgroundPattern);
        setTimeout(() => {
            console.log(listStickers, numberOfStickers)
            if (listStickers && numberOfStickers) drawStickers(listStickers, numberOfStickers)
            if (albumImage) drawImageCover();
            if (albumTitle) drawTitle();
        }, 200)
    }
}