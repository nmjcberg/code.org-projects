var stage = createSprite(200,200);
stage.setAnimation("stage_1");

var monster = createSprite(150,260);
monster.setAnimation("orange_monster_1");

var microphone = createSprite(150,350);
microphone.setAnimation("microphone_1");

var speaking = createSprite(285,115);
speaking.setAnimation("speaking_1");
speaking.scale = 2.5;

var spacebar = createSprite(325,350);
spacebar.setAnimation("spacebar");
spacebar.scale = 1.5;

var script = 1;
var blinking = false;
var blinkWait = 500;
var soundNotPlaying = true;
var soundFile = "";
var spacebarSpriteClicked = false;

function draw() {
  // draw instructions on screen
  drawSprites();
  fill("white");
  textSize(24);
  text("PRESS",285,325);
  fill("black");
  textSize(16);
  text("SPACEBAR",280,355);
  // draw one of the joke scripts
  if (script==1) {
    textSize(30);
    text("What do sea",190,50);
    text("monsters eat?",190,90);
    monster.rotation = 0;
  }
  if (script==2) {
    textSize(30);
    text("Fish & Ships",200,70);
    // shake the monster during the punchline
    monster.rotation = randomNumber(-2,2);
    // play a laugh track during the punchline
    if (soundNotPlaying) {
      soundFile = "sound://category_human/character_yury_laughing_1.mp3";
      playSound(soundFile, true); // 'true' causes sound to loop
      soundNotPlaying = false; // start playing sound only once
    }
  }
  if (script==3) {
    textSize(26);
    text("Why DIDN'T",190,45);
    text("the skeleton",190,70);
    text("cross the road?",190,95);
    // stop shaking
    monster.rotation = 0;
    // stop playing laugh track
    stopSound(soundFile);
    soundNotPlaying = true;
  }
  if (script==4) {
    textSize(30);
    text("Because he",190,50);
    text("had no guts!",190,85);
    // shake the monster during the punchline
    monster.rotation = randomNumber(-2,2);
    // play a laugh track during the punchline
    if (soundNotPlaying) {
      soundFile = "sound://category_human/character_kimberly_mocking_laugh_7.mp3";
      playSound(soundFile, false); // 'false' causes sound to not loop
      soundNotPlaying = false; // start playing sound only once
    }
  }
  if (script==5) {
    textSize(50);
    text("Thank",220,50);
    text("you!",240,95);
    // stop shaking
    monster.rotation = 0;
    // stop playing laugh track
    stopSound(soundFile);
    soundNotPlaying = true;
  }
  if (script==6) {
    // hide the speech bubble after the last joke
    speaking.visible = false;
  }
  spacebarSpriteClicked = (mouseWentDown("leftButton") & mousePressedOver(spacebar));
  if (keyWentDown("space") | spacebarSpriteClicked) {
    // go to the next joke script when "space" pressed
    script = script + 1;
    if (script > 6) {
      // go back to first script after the last one
      script = 1;
      speaking.visible = true;
    }
  }

  // change to 'blinking' state if monster clicked
  if (mousePressedOver(monster)) {
    blinking = true;  // set flag for 'blinking' state
    blinkWait = 0;    // reset the counter
  }
  if (blinking) {
    // in the 'blinking' state...
    // 1. change the animation frame
    monster.setAnimation("orange_monster_2");
    // 2. count up during each draw() loop iteration
    blinkWait = blinkWait + 100;
    if (blinkWait > 500) {
      // 3. leave the 'blinking' state after certain number of counts
      blinking = false;
    }
  } else {
    // in the 'not-blinking' state...
    // 1. use the original animation frame
    monster.setAnimation("orange_monster_1");
    // 2. count down during each draw() loop iteration
    blinkWait = blinkWait - randomNumber(1,7);
    if (blinkWait < 0) {
      // 3. leave the 'not-blinking' state when count is less than zero
      blinking = true;
    }
  } // end of 'if(blinking)' if-else statement

} // end of draw() loop
