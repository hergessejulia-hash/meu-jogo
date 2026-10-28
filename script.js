const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const scoreText = document.getElementById("score");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart");

let jumping = false;
let gameOver = false;
let score = 0;
let playerBottom = 0;
let obstacleLeft = 800;

function jump() {
if (jumping || gameOver) return;

jumping = true;
let height = 0;

const jumpInterval = setInterval(() => {
    if (height >= 120) {
        clearInterval(jumpInterval);

        const fallInterval = setInterval(() => {
            height -= 6;

            if (height <= 0) {
                height = 0;
                clearInterval(fallInterval);
                jumping = false;
            }

            player.style.bottom = height + "px";
        }, 20);

        return;
    }

    height += 6;
    player.style.bottom = height + "px";
}, 20);

}

document.addEventListener("keydown", (event) => {
if (event.code === "Space") {
event.preventDefault();
jump();
}
});

function startGame() {
gameOver = false;
jumping = false;
score = 0;
obstacleLeft = 800;
playerBottom = 0;

player.style.bottom = "0px";
obstacle.style.left = obstacleLeft + "px";
scoreText.textContent = score;
message.textContent = "";

const gameInterval = setInterval(() => {
    if (gameOver) {
        clearInterval(gameInterval);
        return;
    }

    obstacleLeft -= 6;

    if (obstacleLeft < -30) {
        obstacleLeft = document.getElementById("game").clientWidth;
        score++;
        scoreText.textContent = score;
    }

    obstacle.style.left = obstacleLeft + "px";

    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    const collision =
        playerRect.right > obstacleRect.left &&
        playerRect.left < obstacleRect.right &&
        playerRect.bottom > obstacleRect.top;

    if (collision) {
        gameOver = true;
        message.textContent = "Fim de jogo! Pontuação: " + score;
    }
}, 20);

}

restartButton.addEventListener("click", startGame);

startGame();
