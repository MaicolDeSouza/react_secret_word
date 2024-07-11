import React from 'react'
import './GameOver.css'

const GameOver = ({retryGame, score}) => {
  return (
    <div>
        <h1>Fim do jogo...</h1>
        <h2>
            Sua pontuação foi: {score}
        </h2>
        <button onClick={retryGame}>Reiniciar jogo</button>
    </div>
  )
}

export default GameOver