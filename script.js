/* VARIABLES */
let saturn, asteroids, stars;
let score = 0;
let level = 1;
let saturnImg, asteroidsImg, starsImg;
let gameState = "PLAY";
let bg;

/* PRELOAD LOADS FILES */
function preload() {
  saturnImg = loadImage("assets/SATURN PIXEL.png");
  asteroidsImg = loadImage("assets/ASTEROID PIXEL.png");
  starsImg = loadImage("assets/STAR PIXEL.png");
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400, 400);
  bg = loadImage('assets/backgroundImg.png')

  saturnImg.resize(87, 0);
  asteroidsImg.resize(random(70, 70), random(60, 60));
  starsImg.resize(random(50, 50), random(40, 40));

  // The Catcher: Saturn
  saturn = createSprite(300, 375);
  saturn.addImage(saturnImg);
  saturn.diameter = 150;

  // Create falling asteroid
  asteroids = createSprite(random(60), 0);
  asteroids.addImage(asteroidsImg);
  asteroids.velocity.y = 2;
  asteroids.rotationLock = true;

  // Create falling star
  stars = createSprite(random(width), 0);
  stars.addImage(starsImg);
  stars.velocity.y = 2;
  stars.rotationLock = true;
}

/* DRAW LOOP REPEATS */
function draw() {
  background(bg);

  if (gameState === "PLAY") {
    playGame();
  } else if (gameState === "LEVEL_UP") {
    displayWinScreen();
  }
}

function playGame() {
  // Draw directions to screen
  fill(255);
  textSize(12);
  text("Move Saturn with the left \nand right arrow keys to collect stars \nand avoid asteroids. \n              \nScore 10 points to level up!", 10, 80);

  // Display current level
  textSize(20);
  text("Level: " + level, 10, 60);

  // Move Saturn
  if (kb.pressing("left")) {
    saturn.position.x -= 5;
  } else if (kb.pressing("right")) {
    saturn.position.x += 5;
  }

  // Stop Saturn at edges of screen
  if (saturn.position.x < 50) {
    saturn.position.x = 50;
  } else if (saturn.position.x > 350) {
    saturn.position.x = 350;
  }

  // If asteroids reach the bottom, reset position
  if (asteroids.position.y >= height) {
    asteroids.position.y = 0;
    asteroids.position.x = random(width);
    asteroids.velocity.y = random(3, 5);
  }

  // If stars reach the bottom, reset position
  if (stars.position.y >= height) {
    stars.position.y = 0;
    stars.position.x = random(width);
    stars.velocity.y = random(3, 5);
  }

  // Check collision with asteroids
  if (saturn.overlap(asteroids)) {
    score -= 1;
    asteroids.position.y = 0;
    asteroids.position.x = random(width);
    asteroids.velocity.y = random(3, 5);
  }

  // Check collision with stars
  if (saturn.overlap(stars)) {
    score += 1;
    stars.position.y = 0;
    stars.position.x = random(width);
    stars.velocity.y = random(3, 5);
  }

  // Draw the score to the screen
  fill(255);
  textSize(20);
  text("Score: " + score, 10, 30);

  // Check if the player wins
  if (score >= 10 * level) {
    level += 1;
    gameState = "LEVEL_UP";
  }

  drawSprites();
}

function displayWinScreen() {
  fill(255);
  textSize(20);
  text("You win! Level " + level + " reached.\nPress Enter to continue\nor any other key to exit.", 50, 200);
}

function keyPressed() {
  if (gameState === "LEVEL_UP") {
    if (keyCode === ENTER) {
      resetGameForNextLevel();
      gameState = "PLAY";
    } else {
      noLoop();
    }
  }
}

function resetGameForNextLevel() {
  // Reset positions and velocities
  saturn.position.x = 300;
  saturn.position.y = 375;
  asteroids.position.y = 0;
  asteroids.position.x = random(width);
  asteroids.velocity.y = random(3, 5);
  stars.position.y = 0;
  stars.position.x = random(width);
  stars.velocity.y = random(3, 5);
}