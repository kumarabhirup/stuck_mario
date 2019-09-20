/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// This function runs when the Game Screen is ON
function gamePlay() {
  // Draw Timer! (Comment this blob of code if you don't want timer)
  if (Koji.config.strings.enableTimer && gameTimerEnabled) {
    gameTimer -= 1 / frameRate()
    drawTimer()
  }

  // InGame UI
  visibleCircle.show()
  movingArc.show()

  // Particle effects
  for (let i = 0; i < particles.length; i += 1) {
    if (particles[i]) {
      particles[i].render()
      particles[i].update()
    }
  }

  player.show()
  movingArc.update()

  if (isMobile) {
    movingArc.revolveAngle = map(mouseX, 10, width - 10, 0, 360)
  }

  if (gameStart) {
    if (!isMobile) {
      movingArc.revolveAngle -= 3.5 * movingArc.moveDir
    }

    // Collision
    if (
      player.didTouch(
        { sizing: movingArc.sizing, body: movingArc.body },
        'circle'
      )
    ) {
      player.isStartPosition = false

      player.dir = p5.Vector.sub(
        player.body.position,
        movingArc.body.position
      ).normalize()

      addScore(
        1,
        imgLife,
        {
          x: player.body.position.x,
          y: player.body.position.y,
        },
        6
      )
    }

    // Manage Player movement
    player.update()
  }

  // Score draw
  const scoreX = width - objSize / 2
  const scoreY = objSize / 3
  textSize(objSize * 2)
  fill(Koji.config.colors.scoreColor)
  textAlign(RIGHT, TOP)
  text(score, scoreX, scoreY)

  // Lives draw
  const lifeSize = objSize
  for (let i = 0; i < lives; i += 1) {
    image(
      imgLife,
      lifeSize / 2 + lifeSize * i,
      lifeSize / 2,
      lifeSize,
      lifeSize
    )
  }

  // Floating Text effects
  for (let i = 0; i < floatingTexts.length; i += 1) {
    floatingTexts[i].update()
    floatingTexts[i].render()
  }

  cleanup()
}
