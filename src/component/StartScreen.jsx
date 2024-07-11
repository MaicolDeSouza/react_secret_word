import React from 'react'
import './StartScreen.css'

const StartScreen = ({startGame}) => {
  return (
    <div className='start'>
        <h1>Secret word</h1>
        <p>Pressione no botão para comecar a jogar</p>
        <button onClick={startGame}>Jogar</button>
    </div>
  )
}

export default StartScreen