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
    /*if (ctx && albumTitle) ctx.drawImage(albumTitle, x, y, drawWidth, drawHeight);*/

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

            // Store the image properties for future use
            titleProperties = { drawWidth, drawHeight, x, y };

            ctx.drawImage(base_image, x, y, drawWidth, drawHeight);
        };
    }
}

function colorCanvasBackground(mood: string) {
    if (ctx) {
        // Update the background color
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
            const x = Math.random() * canvas.width; // Random X position
            const y = Math.random() * canvas.height; // Random Y position
            const width = Math.random() * 200 + 500; // Random width
            const height = Math.random() * 50 + 50; // Random height
            const radius = Math.random() * 50; // Random radius for rounded corners
            const color = predefinedColors[Math.floor(Math.random() * predefinedColors.length)];

            drawCloud(x, y, width, height, radius, color);
        }
    }
}

function drawCloud(x: number, y: number, width: number, height: number, radius: number, color: string) {
    if (ctx) {
        ctx.beginPath();
        ctx.fillStyle = color;

        // Draw a rectangle (use arc for rounded corners if `radius` > 0)
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
        const xStart = Math.random() * canvas.width; // Position de départ aléatoire (x)
        const yStart = Math.random() * canvas.height; // Position de départ aléatoire (y)
        const waveWidth = Math.random() * 100 + 100; // Largeur de l'onde (50-100)
        const waveHeight = Math.random() * 20 + 10; // Hauteur de l'onde (10-30)
        const color = predefinedColors[Math.floor(Math.random() * predefinedColors.length)]; // Couleur aléatoire

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

        // Ajoute une courbe ondulée
        ctx.bezierCurveTo(
            x + width / 3, y - height,     // Premier point de contrôle
            x + (2 * width) / 3, y + height, // Deuxième point de contrôle
            x + width, y                  // Point d'arrivée
        );

        ctx.stroke();
    }
}



function drawFlowersBackground() {
    if (ctx) {
        const gridSize = 5;
        for (let gy = 0; gy < gridSize; gy++) {
            for (let gx = 0; gx < gridSize; gx++) {
                /*let color = x % 2 !== y % 2 ? "#368f8b" : "#d62246";*/

                const gridWidth = canvas.width / gridSize;
                const gridHeight = canvas.height / gridSize;
                const radius = gridWidth * Math.random() * 2;

                const x = gridWidth/4 + gridWidth * gx;
                const y = gridHeight/4 + gridHeight * gy;
                drawFlower(ctx, x, y, gridWidth, gridHeight, radius / 2);
            }
        }
    }
}

function drawFlower(ctx: any, x: number, y: number, gridWidth: number, gridHeight: number, radius: number) {
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

        ctx.drawImage(base_image, x, y, drawWidth, drawHeight);
    };
}


export function redrawEverything() {
    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        if (backgroundMood) colorCanvasBackground(backgroundMood);
        if (backgroundPattern) drawPatternOnBackground(backgroundPattern);
        setTimeout(() => {
            if (albumImage) drawImageCover();
            if (albumTitle) drawTitle();
        }, 200)
    }
}


/*function initCanvas () {
    const pane = new Pane();

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    const width = canvas.clientWidth * 2;
    const height = canvas.clientHeight * 2

    canvas.width = width;
    canvas.height = height;

    const params = {
        "grid-size": 10,
        "is-random-size": false,
        "is-blur": false
    }

    pane.addBinding(params, "grid-size", {min: 1, max: 10, step: 1})
        .on("change", () => {
            drawGrid()
        });

    pane.addBinding(params, "is-random-size")
        .on("change", () => {
            drawGrid()
        });

    pane.addBinding(params, "is-blur")
        .on("change", () => {
            drawGrid()
        });

    const drawGrid = () => {
        if (!ctx) return
        ctx.clearRect(0, 0, width, height)
        let gridSize = params["grid-size"]
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                /!*let color = x % 2 !== y % 2 ? "#368f8b" : "#d62246";*!/
                let red = Math.floor(255 - 42.5 * y);
                let green = Math.floor(255 - 42.5 * x);
                let blue = Math.floor(Math.random() * 250);
                let color = `rgb(${red},${green},${blue})`;

                let gridWidth = width / gridSize;
                let gridHeight = height / gridSize;
                let radius = params["is-random-size"] ? gridWidth * Math.random() * 2 : gridWidth / 2;

                let gridX = gridWidth/2 + gridWidth * x;
                let gridY = gridHeight/2 + gridHeight * y;
                if (x % 2 === 0) {
                    drawCircle(ctx, color, gridX, gridY, radius / 2);
                } else if (y % 2 === 0) {
                    drawSimpleRabbit(ctx, gridX, gridY);
                } else {
                    drawStar(ctx, gridX, gridY, 5, 50, 25)
                }
            }
        }
    }

    const drawCircle = (ctx: any, color: string, gridX: number, gridY: number, radius: number) => {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(gridX, gridY, radius, 0, Math.PI * 2);
        if (params["is-blur"]) {
            ctx.filter = `blur(${Math.floor(Math.random() * 50)}px)`
        }
        ctx.fill();
    }

    const drawStar = (ctx: any, x: number, y: number, spikes: number, outerRadius: number, innerRadius: number) => {
        let rotation = Math.PI / 2 * 3; // Point initial (vers le haut)
        let step = Math.PI / spikes; // Espacement entre les pointes

        ctx.beginPath();
        ctx.moveTo(x, y - outerRadius);

        for (let i = 0; i < spikes; i++) {
            let xOuter = x + Math.cos(rotation) * outerRadius;
            let yOuter = y + Math.sin(rotation) * outerRadius;
            ctx.lineTo(xOuter, yOuter);

            rotation += step;

            let xInner = x + Math.cos(rotation) * innerRadius;
            let yInner = y + Math.sin(rotation) * innerRadius;
            ctx.lineTo(xInner, yInner);

            rotation += step;
        }

        ctx.closePath();
        ctx.fillStyle = "gold"; // Couleur de remplissage
        ctx.fill();
        ctx.strokeStyle = "black"; // Couleur du contour
        ctx.lineWidth = 2;
    }

    const drawSimpleRabbit = (ctx: any, x: number, y: number) => {
        // Dessin des oreilles
        drawOval(ctx, x-25, y-50, 20, 50, 157, 0, Math.PI * 2, "#D9D9D9"); // Oreille gauche
        drawOval(ctx, x+25, y-50, 20, 50, -25, 0, Math.PI * 2, "#D9D9D9"); // Oreille droite

        // Dessin de la tête
        drawOval(ctx, x, y, 50, 40, 0, 0, Math.PI * 2, "#D9D9D9"); // Tête
    }

    const drawOval = (ctx: any, x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, color: string) => {
        ctx.beginPath();
        ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle);
        ctx.fillStyle = color;
        ctx.fill();
    }
}*/