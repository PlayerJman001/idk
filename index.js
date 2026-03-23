const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

const Win_Msg = document.getElementById("Win_Msg")

const ballRadius = 10; //Ball hitbox and size

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2;
let dy = -2;

let leftClick = false;
let rightClick = false;

const paddleHeight = 10;
const paddleWidth = 100;

let paddleX = (canvas.width - paddleWidth) / 2;

let interval = 0;

const difficultyIncrease = 0.2

const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 15;
const brickOffsetTop = 30;
const brickOffsetLeft = 20;

let score = 0;

let progress = 0;

function store_Score() {
    document.getElementById("score").value = score
}

let bricks = [];
function brickReset() {
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = []; 
        for (let r = 0; r < brickColumnCount; r++) {
            bricks[c][r] = { x: 0, y :0, status: 1 };
        }
    }
}
brickReset()


function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
                if (bricks[c][r].status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();
    x += dx;
    y += dy;    

    //detection from top and bottom, we're using ball radius because if we don't, the code will only await untill the center of the ball reaches the coordinates

    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleHeight) {
            dy = -dy;
        } else if (x > paddleX + ballRadius && x < paddleX + paddleWidth + ballRadius) {
            y -= paddleHeight
            dy = -dy;
            dy -= difficultyIncrease;
            if (dx > 0) {
                dx += difficultyIncrease;
            } else {
                dx -= difficultyIncrease;
            }
        } else {
            Win_Msg.style.display = "block";
            clearInterval(interval);
            store_Score();
        }
    }

    //detection left right
    if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
        dx = -dx;
    }

    //to prevent the paddle going off screen, we're setting a minimum and a maximum value, being the right wall - the paddle width, and well, 0, being left
    
    if (rightClick) {
        paddleX = Math.min(paddleX + 4, canvas.width - paddleWidth);
    } else if (leftClick) {
        paddleX = Math.max(paddleX - 4, 0);
    }
}

function startGame() {
    Win_Msg.style.display = "none";
    interval = setInterval(draw, 10);
    score = 0;
    progress = 0;
    dx = 2;
    dy = -2;
    x = canvas.width / 2;
    y = canvas.height - 30;
    paddleX = (canvas.width - paddleWidth) / 2;
    brickReset();
}

const runButton = document.getElementById("runButton");
runButton.addEventListener("click", () => {
    startGame();
    runButton.style.display = "none";
})

//paddle stuff (who calls it paddle lmao)

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD"; //mmmm lovley, today I learn it was case sensitive
    ctx.fill();
    ctx.closePath();
}


//paddle controls (still who calls it a paddle)

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightClick = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftClick = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightClick = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftClick = false;
    }
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight + ballRadius) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    progress++;
                    if (progress === brickColumnCount * brickRowCount) {
                        brickReset();
                        progress = 0;
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Ariel";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Score: ${score}`, 8, 20);
}