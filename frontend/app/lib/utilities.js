/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// Use this to check high score whenever you need. It will update the highscore and save it to local storage
function checkHighscore() {
  if (score > highScore) {
    highscoreGained = true
    highscore = score

    localStorage.setItem('highscore', highscore)
  }
}

/**
 * Used to add score
 * @param {Number} amount - amount of score to be added
 * @param {p5 Image Instance} particlesImage
 * @param {Object} particle - { x: null, y: null }
 * @param {Number} particleCount
 * @param {Object} settings - { floatingText: false }
 */
function addScore(
  amount,
  particlesImage,
  particle = { x: null, y: null },
  particleCount = floor(random(2, 15)),
  settings = { floatingText: true }
) {
  score += amount

  if (settings.floatingText) {
    floatingTexts.push(
      new FloatingText(
        particle.x,
        particle.y - 0.75 * objSize * 0.5,
        amount < 0 ? `${amount} 😭` : `+${amount}`,
        amount < 0
          ? Koji.config.colors.negativeFloatingTextColor
          : Koji.config.colors.floatingTextColor,
        objSize * 2,
        2
      )
    )
  }

  // Spawn particles
  if (particle.y > 0) {
    for (let i = 0; i < particleCount; i += 1) {
      particles.push(
        new Particle(particle.x, particle.y, particlesImage) // you may use `imgLife` for the image parameter if the balloon images you have aren't good particles
      )
    }
  }
}

/**
 *
 * @param {p5 Image Instance} particlesImage
 * @param {object} particle - { x: null, y: null }
 * @param {*} particleCount
 * @param {Number} particleCount
 */
function particlesEffect(
  particlesImage,
  particle = { x: null, y: null },
  particleCount = floor(random(2, 15))
) {
  // Spawn particles
  if (particle.y > 0) {
    for (let i = 0; i < particleCount; i += 1) {
      particles.push(
        new Particle(particle.x, particle.y, particlesImage) // you may use `imgLife` for the image parameter if the balloon images you have aren't good particles
      )
    }
  }
}

// Used to go to submit score page
function submitScore(currentScore) {
  window.setScore(currentScore)
  window.setAppView('setScore')
}

// Sound stuffs
function playMusic(music, volume = 0.4, loop = false) {
  if (music) {
    music.setVolume(volume)
    music.setLoop(loop)
    music.play()
  }
}

function celebrations() {
  addScore(
    1,
    imgLife,
    {
      x: player.body.position.x,
      y: player.body.position.y,
    },
    Math.floor(random(7, 12)),
    { floatingText: false }
  )

  sndBounce = loadSound(Koji.config.sounds.bounce, () =>
    playMusic(sndBounce, 10, false)
  )
}

function disableSound() {
  getAudioContext().suspend()
  soundEnabled = false
}

function enableSound() {
  soundEnabled = true
  getAudioContext().resume()
}

// Call this function on sound button click
function toggleSound() {
  if (canMute) {
    canMute = false

    if (soundEnabled) {
      disableSound()
    } else {
      enableSound()
    }

    // A timeout is required to prevent double registering of touch input on mobile
    setTimeout(() => {
      canMute = true
    }, 100)
  }
}

/*
  Basic smoothing function
  v = ((v * (N - 1)) + w) / N; 

  v - current value
  w - goal value
  The higher the factor, the slower v approaches w.
*/
function Smooth(current, goal, factor) {
  return (current * (factor - 1) + goal) / factor
}

// Isolate the font name from the font link provided in game settings
function getFontFamily(ff) {
  const start = ff.indexOf('family=')
  if (start === -1) return 'sans-serif'
  let end = ff.indexOf('&', start)
  if (end === -1) end = undefined
  return ff.slice(start + 7, end)
}

// Returns true if the user is on mobile
function detectMobile() {
  // KEEP THE SEMICOLONS TO VOID ASI
  let check = false

  ;(function(a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true
  })(navigator.userAgent || navigator.vendor || window.opera)

  return check
}

// Returns true if the user is on small sized browser
function detectMobileSize() {
  return width < 550
}
