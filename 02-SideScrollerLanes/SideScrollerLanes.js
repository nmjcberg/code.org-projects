//GAME SETUP
// Create the sprites
// set velocity for the obstacle and the target
var debugSwitch = false;
var bg = createSprite(200,200);
bg.setAnimation("background");
var target = createSprite(400,370);
target.setAnimation("caterpiller");
target.velocityX = -5;
target.scale = 0.15;
target.debug = debugSwitch;
var player = createSprite(100,370);
player.setAnimation("badger");
player.scale = 0.3;
player.debug = debugSwitch;
var obstacle1 = createSprite(600,350);
obstacle1.setAnimation("log");
obstacle1.scale = 1.3;
obstacle1.setCollider("circle",0,0,40);
obstacle1.velocityX = -9;
obstacle1.rotationSpeed = -4;
obstacle1.debug = debugSwitch;
var obstacle2 = createSprite(1200,350);
obstacle2.setAnimation("log");
obstacle2.scale = 1.3;
obstacle2.setCollider("circle",0,0,40);
obstacle2.velocityX = -9;
obstacle2.rotationSpeed = -4;
obstacle2.debug = debugSwitch;

//create the variables
var score = 0;
var health = 100;
var playerLane = 0;
var targetLane = 0;
var targetType = 1;
var obstacle1Lane = 0;
var obstacle2Lane = 0;
var obstacleY;

function draw() {
  // BACKGROUND
  // draw the ground and other background

  // SPRITE INTERACTIONS
  // if the player touches the obstacle
  // the health goes down, and the obstacle shakes
  if (player.isTouching(obstacle1)) {
    health = health - 1;
    obstacleY = 350 - (90*obstacle1Lane);
    obstacle1.y = obstacleY + randomNumber(-4,4);
  }
  if (player.isTouching(obstacle2)) {
    health = health - 1;
    obstacleY = 350 - (90*obstacle2Lane);
    obstacle2.y = obstacleY + randomNumber(-4,4);
  }

  // if the player touches the target
  // the score goes up, the target resets
  if (player.isTouching(target)) {
    score = score + 1;
    if (targetType > 95) {
      health = health + 10;
      if (health > 100) {
        health = 100;
      }
    }
    targetType = randomNumber(1,100);
    if (targetType > 95) {
      target.tint = "limegreen";
    } else {
      target.tint = "";
    }
    target.x = 420;
    targetLane = randomNumber(0,2);
    target.y = 370 - (70*targetLane);
  }

  // MOVING
  if (keyWentDown("up") && (playerLane<2)) {
    playerLane = playerLane + 1;
  }
  if (keyWentDown("down") && (playerLane>0)) {
    playerLane = playerLane - 1;
  }
  player.y = 370 - (70*playerLane);

  // LOOPING
  // if the target has gone off the left hand side of the screen,
  // move it to the right hand side of the screen
  if (obstacle1.x < -50) {
    obstacle1.x = 800;
    obstacle1Lane = randomNumber(0,1);
    obstacle1.y = 350 - (90*obstacle1Lane);
  }
  if (obstacle2.x < -50) {
    obstacle2.x = 800;
    obstacle2Lane = randomNumber(0,1);
    obstacle2.y = 350 - (90*obstacle2Lane);
  }

  // if the target has gone off the left hand side of the screen,
  // move it to the right hand side of the screen
  if (target.x < -20) {
    target.x = 420;
    targetLane = randomNumber(0,2);
    target.y = 370 - (70*targetLane);
  }

  // DRAW SPRITES
  drawSprites();
  
  // HEALTH & SCOREBOARD
  // add health meter and scoreboard
  fill("black");
  textSize(20);
  text("Health:", 280, 30);
  text( health,   350, 30);
  text("Score: ", 280, 55);
  text( score,    350, 55);
  // GAME OVER
  // if health runs out
  // show Game over
  if (health < 1) {
    background("black");
    fill("green");
    textSize(50);
    text("Game Over!" , 50, 200);
  }
}
