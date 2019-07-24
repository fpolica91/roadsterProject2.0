// GLOBAL VARIABLES
// let currentGame;
let currentRoadster;
let currentAsteroid;
let currentUfo;
let currentSatellite;
let frames = 0;
let gameOver = false;
let gameRunning = false;
let isPaused = false;

document.getElementById("game-canvas").style.display = "none";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

// ---------- GAME CLASS ----------
class Game {
    constructor() {
        this.roadster = {};
        this.asteroid = {};
        this.ufo = {};
        this.satellite = {};
        this.score = 0
    }
}; // end of Game class
const currentGame = new Game();

// ----------- ROADSTER CLASS ----------
class Roadster {
    constructor() {
        this.x = 10;
        this.y = 275;
        this.width = 100;
        this.height = 75;
        this.img = "./images/roadster.png"
        this.explosion = "./images/explosion.png"
    }
    drawRoadster() {
        let roadsterImg = new Image();
        roadsterImg.src = this.img;
        ctx.drawImage(roadsterImg, this.x, this.y, this.width, this.height);
    }
    moveRoadster(number) {
        ctx.clearRect(this.x, this.y, this.width, this.height);
        switch (number) {
            case 87: // UP
                if (this.y > 1) {
                    this.y -= 22;
                }
                break;
            case 83: // DOWN
                if (this.y < 575) {
                    this.y += 23;
                }
                break;
            case 65: // LEFT
                if (this.x > 20) {
                    this.x -= 30;
                }
                break;
            case 68: // RIGHT
                if (this.x < 1100) {
                    this.x += 30;
                }
        }
    }
}; // end Roadster class

document.onkeydown = function (e) {
    let movement = e.keyCode;
    currentGame.roadster.moveRoadster(movement);
}

class Asteroid {
    constructor() {
        this.x = 1100;
        this.y;
        this.width = 100;
        this.height = 100;
        this.img = "./images/asteroid.png";
        this.asteroidImg = new Image();
        this.asteroidImg.src = this.img;
    }
    drawAsteroid() {
        ctx.drawImage(this.asteroidImg, this.x, this.y, this.width, this.height);
    }
    moveAsteroid() {
        this.x -= 8;
        if (this.x < 0) {
            currentGame.score++
            console.log(currentGame.score)
            this.x = canvas.width;
            this.y = Math.floor((Math.random() * 550) + 1);
        }
    }

}; // end Obstacles class

class Ufo {
    constructor() {
        this.x = 1100;
        this.y;
        this.width = 100;
        this.height = 50;
        this.img = "./images/ufo.png";
        this.ufoImg = new Image();
        this.ufoImg.src = this.img;
    }
    drawUfo() {
        ctx.drawImage(this.ufoImg, this.x, this.y, this.width, this.height);

    }
    moveUfo() {
        this.x -= 11;
        if (this.x < 0) {
            currentGame.score++;
            this.x = canvas.width;
            this.y = Math.floor((Math.random() * 550) + 1);
        }
    }
}; // end UFO class

class Satellite {
    constructor() {
        this.x = 1100;
        this.y;
        this.width = 100;
        this.height = 50;
        this.img = "./images/satellite.png";
        this.satelliteImg = new Image();
        this.satelliteImg.src = this.img;
    }
    drawSatellite() {
        ctx.drawImage(this.satelliteImg, this.x, this.y, this.width, this.height);
    }
    moveSatellite() {
        this.x -= 6;
        if (this.x < 0) {
            currentGame.score++
            this.x = canvas.width;
            this.y = Math.floor((Math.random() * 550) + 1);
        }
    }
}; // end Satellite class

// ---------- STARS BACKGROUND -----------
let stars = [];
let numStars = 150;
let speed = 5;

function makeStar() {
    return {
        x: Math.random(),
        y: Math.random(),
        distance: Math.sqrt(Math.random()),
        color: 'hsl(' + Math.random() * 40 + ',100%,' + (70 + Math.random() * 30) + '%)'
    };
}

for (i = 0; i < numStars; i++) {
    stars[i] = makeStar();
}

function updateStars() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw each star
    for (i = 0; i < numStars; i++) {
        // Move the star first
        stars[i].x -= Math.pow(stars[i].distance, 2) / canvas.width * speed;
        // If it's off-screen, reset it
        if (stars[i].x <= 0) {
            stars[i] = makeStar();
            stars[i].x = 1;
        }
    }
}

setInterval(function () {
    updateStars();
}, 30);



// CRASH SOUND//

const crash = new Audio('./sounds/crash.wav')

//END OF CRASH SOUND//


// ----------- COLLISION -----------
function detectCollision(obst, roadster) {
    if (obst.x < roadster.x + roadster.width &&
        obst.x + obst.width > roadster.x &&
        obst.y < roadster.y + roadster.height &&
        obst.y + obst.width > roadster.y) {
        crash.play()
        roadster.img = roadster.explosion;
        gameOver = true;
        gameRunning = true
    }
    // if (gameOver && gameRunning) {

    // }

} // end detectCollision






// ---------- UPDATE ---------
function update() {
    ctx.clearRect(0, 0, 1250, 650);

    // ---------- UPDATE STARS ----------
    for (i = 0; i < numStars; i++) {
        // Move the star first
        stars[i].x -= Math.pow(stars[i].distance, 2) / canvas.width * speed;
        // If it's off-screen, reset it
        if (stars[i].x <= 0) {
            stars[i] = makeStar();
            stars[i].x = 1;
        }
        // Draw the star
        ctx.beginPath();
        ctx.arc(stars[i].x * canvas.width, stars[i].y * canvas.height, stars[i].distance * 2, 0, 2 * Math.PI, false);
        ctx.lineWidth = stars[i].distance * 4;
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.stroke();
        ctx.fillStyle = stars[i].color;
        ctx.fill();
    }

    if (!gameOver && !gameRunning) {
        // ----------- UPDATE ROADSTER ----------
        currentRoadster.drawRoadster();
        frames++;

        // ---------- ASTEROID ----------
        currentAsteroid.moveAsteroid();
        currentAsteroid.drawAsteroid();
        frames++;
        detectCollision(currentAsteroid, currentRoadster)


        // ---------- UPDATE UFO ----------
        currentUfo.moveUfo();
        currentUfo.drawUfo();
        frames++;
        detectCollision(currentUfo, currentRoadster)



        // ---------- UPDATE SATELLITE ----------
        currentSatellite.moveSatellite();
        currentSatellite.drawSatellite();
        frames++;
        detectCollision(currentSatellite, currentRoadster)

    } else {
        gameEndingImage.drawGameEvent()
        gameEndingImage.drawText()
        $('#canvas').fadeOut(4000)
        setTimeout(() => {
            location.reload()
        }, 6000)

    }


    requestAnimationFrame(update);
} // end of UPDATE function

// ---------- GAMEOVER PAGE ----------


// ---------- START --------
function startGame() {
    gameOver = false;
    gameRunning = false
    // document.getElementById("game-canvas").style.display = "block";
    canvas.style.display = "block"

    // ROADSTER
    currentRoadster = new Roadster();
    currentGame.roadster = currentRoadster;
    currentRoadster.drawRoadster();

    // ASTEROID
    currentAsteroid = new Asteroid();
    currentGame.asteroid = currentAsteroid;
    currentAsteroid.drawAsteroid();


    // UFO
    currentUfo = new Ufo();
    currentGame.ufo = currentUfo;
    currentUfo.drawUfo();

    // SATELLITE
    currentSatellite = new Satellite();
    currentGame.satellite = currentSatellite;
    currentSatellite.drawSatellite();

    update();
} // end of startGame Function

document.getElementById("start-button").onclick = function () {
    startGame();
};
