const game = () => {
  let pScore = 0
  let cScore = 0
  const endScore = 2

  const playerHand = document.querySelector('.player-hand')
  const computerHand = document.querySelector('.computer-hand')
  const hands = document.querySelector('.hands')
  const winner = document.querySelector('.winner')
  const options = document.querySelector('.options')
  const reset = document.querySelector('.reset')
  const resetBtn = document.querySelector('.reset button')
  const finalScore = document.querySelector('.final-score')

  //Pantalla inicio del juego
  const startGame = () => {
    const playBtn = document.querySelector('.intro button')
    const introScreen = document.querySelector('.intro')
    const match = document.querySelector('.match')

    playBtn.addEventListener('click', () => {
      match.style.visibility = 'visible'
      introScreen.classList.add('fadeOut')
      match.classList.add('fadeIn')
      match.classList.remove('fadeOut')
    })
  }

  //Partida
  const playMatch = () => {
    const options = document.querySelectorAll('.options button')
    const hands = document.querySelectorAll('.hands img')

    hands.forEach(hand => {
      hand.addEventListener('animationend', function () {
        this.style.animation = ''
      })
    })

    //Opciones de la computadora
    const computerOptions = ['piedra', 'papel', 'tijera']

    options.forEach(option => {
      option.addEventListener('click', function () {
        //Elección de la computadora al azar
        const computerNumber = Math.floor(Math.random() * 3)
        const computerChoice = computerOptions[computerNumber]

        // Aparece el texto piedra papel o tijera
        playerHand.src = './assets/piedra.png'
        computerHand.src = './assets/piedra.png'
        winner.textContent = 'Piedra,'
        setTimeout(() => {
          winner.textContent = 'Papel,'
        }, 600)
        setTimeout(() => {
          winner.textContent = 'o Tijera'
        }, 1200)

        setTimeout(() => {
          //Comparamos la jugada
          compareHands(this.id, computerChoice)

          //Compruebo si finaliza el juego
          setTimeout(() => {
            if (pScore == endScore || cScore == endScore) {
              endGame()
            }
          }, 10)

          //Actualizamos las imágenes
          playerHand.src = `./assets/${this.id}.png`
          computerHand.src = `./assets/${computerChoice}.png`
        }, 1800)
        //Animación
        playerHand.style.animation = 'shakePlayer 2s ease'
        computerHand.style.animation = 'shakeComputer 2s ease'
      })
    })
  }

  const endGame = () => {
    winner.textContent = 'FIN DEL JUEGO'
    {
      pScore == endScore
        ? (finalScore.textContent = 'Jugardor es el ganador!!!')
        : (finalScore.textContent = 'Bot es el ganador!!!')
    }
    hands.classList.remove('fadeIn')
    hands.classList.add('fadeOut')
    options.classList.remove('fadeIn')
    options.classList.add('fadeOut')
    reset.classList.remove('fadeOut')
    reset.classList.add('fadeIn')

    // Reseteo de juego
    resetBtn.addEventListener('click', function () {
      pScore = 0
      cScore = 0
      updateScore()
      playerHand.src = './assets/piedra.png'
      computerHand.src = './assets/piedra.png'
      winner.textContent = 'Elija una opción'
      hands.classList.remove('fadeOut')
      hands.classList.add('fadeIn')
      options.classList.remove('fadeOut')
      options.classList.add('fadeIn')
      reset.classList.remove('fadeIn')
      reset.classList.add('fadeOut')
    })
  }

  const updateScore = () => {
    const playerScore = document.querySelector('.player-score p')
    const computerScore = document.querySelector('.computer-score p')
    playerScore.textContent = pScore
    computerScore.textContent = cScore
  }

  const compareHands = (playerChoice, computerChoice) => {
    //Comprobar el empate
    if (playerChoice === computerChoice) {
      winner.textContent = 'Empate'
      return
    }
    //Comprobar Roca
    if (playerChoice === 'piedra') {
      if (computerChoice === 'tijera') {
        winner.textContent = 'Jugador gana'
        pScore++
        updateScore()
        return
      } else {
        winner.textContent = 'Bot gana'
        cScore++
        updateScore()
        return
      }
    }
    //Comprobar papel
    if (playerChoice === 'papel') {
      if (computerChoice === 'tijera') {
        winner.textContent = 'Bot gana'
        cScore++
        updateScore()
        return
      } else {
        winner.textContent = 'Jugador gana'
        pScore++
        updateScore()
        return
      }
    }
    //Comprobar tijeras
    if (playerChoice === 'tijera') {
      if (computerChoice === 'piedra') {
        winner.textContent = 'Bot gana'
        cScore++
        updateScore()
        return
      } else {
        winner.textContent = 'Jugador gana'
        pScore++
        updateScore()
        return
      }
    }
  }

  startGame()
  playMatch()
}

game()
