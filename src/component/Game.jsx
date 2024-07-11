import React, { useRef, useState } from "react";
import "./Game.css";

const Game = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  score,
  guesses,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null); // State do useRef

  //Quando botao jogar for pressionado envia o formulario
  const handleSubmit = (e) => {
    e.preventDefault(); //Evita o carregamento da pagina
    verifyLetter(letter); // Chama função do app.jsx que trata a letra escrita
    setLetter(""); //Limpa campo da letra
    // Mantem o mouse focado no elemnto input, note que temos o ref no iput tambem
    letterInputRef.current.focus();
  };

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação = {score}</span>
      </p>
      <h1>Adivinhe a palavra</h1>
      <h3 className="tip">
        Dica da palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Voce ainda tem {guesses} tentativas</p>
      <div className="word_container">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">
              {letter}
            </span>
          ) : (
            <span key={i} className="blank_square"></span>
          )
        )}
      </div>
      <div className="letter_container">
        <p>Tente adivinhar uma letra da palavra</p>
        <form onSubmit={handleSubmit}>
          <input
            ref={letterInputRef}
            value={letter}
            type="text"
            name="letter"
            maxLength={1}
            required
            onChange={(e) => setLetter(e.target.value)}
          />
          <button>Jogar</button>
        </form>
      </div>
      <div className="wrong_letter_container">
        <p>Letras ja utilizadas</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}, </span>
        ))}
      </div>
    </div>
  );
};

export default Game;
