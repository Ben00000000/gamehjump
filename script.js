document.addEventListener('DOMContentLoaded', function () {
  const player = document.getElementById('player');
  const enemy = document.getElementById('enemy');
  const background = document.querySelector('.background');

  let enemyPosition = 0;
  let backgroundPosition = 0;
  let frameCounter = 0;

  let isJumping = false;
  let jumpHeight = 150;
  let jumpCount = 0;

  function runAnimation() {
    let position = 0;
    setInterval(() => {
      position -= 256;
      player.style.backgroundPosition = `${position}px 0`;
    }, 60);
  }

  function enemyAnimation() {
    let frame = 1;
    const enemySpeed = 5;

    setInterval(() => {
      enemyPosition -= enemySpeed;

      if (enemyPosition < -256) {
        enemyPosition = window.innerWidth;
      }

      enemy.style.backgroundImage = `url('https://raw.githubusercontent.com/Ben00000000/asstes/main/snake%20(${frame}).png')`;
      enemy.style.left = `${enemyPosition}px`;

      if (frameCounter % 5 === 0) {
        frame = (frame % 4) + 1;
      }

      frameCounter++;
    }, 15);
  }

  function scrollBackground() {
    setInterval(() => {
      backgroundPosition -= 5;
      background.style.backgroundPosition = `${backgroundPosition}px 0`;
    }, 15);
  }

  function jump() {
    if (!isJumping) {
      isJumping = true;
      jumpCount = 0;

      const jumpInterval = setInterval(() => {
        if (jumpCount < jumpHeight) {
          player.style.bottom = `${jumpCount}px`;
          jumpCount += 5;
        } else {
          clearInterval(jumpInterval);
          fall();
        }
      }, 15);
    }
  }

  function fall() {
    const fallInterval = setInterval(() => {
      if (jumpCount > 0) {
        player.style.bottom = `${jumpCount}px`;
        jumpCount -= 5;
      } else {
        isJumping = false;
        player.style.bottom = '0';
        clearInterval(fallInterval);
      }
    }, 15);
  }

  function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    if (
      playerRect.bottom > enemyRect.top &&
      playerRect.top < enemyRect.bottom &&
      playerRect.right > enemyRect.left &&
      playerRect.left < enemyRect.right
    ) {
      // Collision detected, you can perform actions like game over or scoring here
      console.log('Collision detected!');
    }
  }

  function gameLoop() {
    checkCollision();
  }

  function animate() {
    gameLoop();
    requestAnimationFrame(animate);
  }

  document.addEventListener('click', jump);

  runAnimation();
  enemyAnimation();
  scrollBackground();

  animate();
});