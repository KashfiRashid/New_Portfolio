let up, down, left, right, rotateRight, rotateLeft, shoot;
let upAcc, downAcc, leftAcc, rightAcc;

function keyPressed() {
  if (keyCode == LEFT_ARROW || key == 'A' || key == 'a')
    left = true;
  if (keyCode == RIGHT_ARROW || key == 'D' || key == 'd')
    right = true;
  if (keyCode == UP_ARROW || key == 'W' || key == 'w')
    up = true;
  if (keyCode == DOWN_ARROW || key == 'S' || key == 's')
    down = true;
  if (key == 'Q' || key == 'q')
    rotateLeft = true;
  if (key == 'E' || key == 'e')
    rotateRight = true;
  if (key == " ")
    shoot = true;
  if (key == 'f' || key == 'F')
    fullscreen(!fullscreen());
  if ((key == 'r' || key == 'R') && gameEnds)
    restartGame();

  // stop Space / arrow keys from scrolling the page that hosts the game
  if (key == ' ' || keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW ||
      keyCode == UP_ARROW || keyCode == DOWN_ARROW) {
    return false;
  }
}

function keyReleased() {
  if (keyCode == LEFT_ARROW || key == 'A' || key == 'a')
    left = false;
  if (keyCode == RIGHT_ARROW || key == 'D' || key == 'd')
    right = false;
  if (keyCode == UP_ARROW || key == 'W' || key == 'w')
    up = false;
  if (keyCode == DOWN_ARROW || key == 'S' || key == 's')
    down = false;
  if (key == 'Q' || key == 'q')
    rotateLeft = false;
  if (key == 'E' || key == 'e')
    rotateRight = false;
}
// end Keyboard.js
