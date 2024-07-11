import { useCallback, useEffect, useState } from "react";
//CSS
import "./App.css";

//Components
import StartScreen from "./component/StartScreen";
import Game from "./component/Game";
import GameOver from "./component/GameOver";

//Data
//Importamos desta forma pois o wordlist nao é exportado como default
import { wordsList } from "./data/words";

function App() {

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stages = [
    { id: 1, name: "start" },
    { id: 2, name: "game" },
    { id: 3, name: "end" },
  ];

  //State para gerenciar o estagio da aplicação
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]); // array com as letras da palavra

  const [guessedLetters, setGuessedLetters] = useState([]); //Letras corretas
  const [wrongLetters, setWrongLetters] = useState([]); //Letras erradas
  const [guesses, setGuesses] = useState(3); //Numero de tentativas
  const [score, setScore] = useState(0); //Pontuação

  const pickWordAndCategory = useCallback(() => {
    //criamos um array com as chaves do objeto wordlist para pegar as categorias
    const categories = Object.keys(words);
    //Escolhemos aleatoriamente uma categoria, o math.floor arenda para baxo elmiinando numeros quebrados
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    //Escolhemos uma palavra aleatoria da categoria escolhida
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  },[words]);

  //quando botao inicar jogo é pressionado
  const startGame = useCallback(() => {
    //Escolhe a categoria e a palavra
    const { word, category } = pickWordAndCategory();
    // Limpa o array das letras corretas e das letras erradas
    clearLettersStates()

    // Separa as letras da palavra
    let letters = word.split("");
    //Transforma as letras para lowercase
    letters = letters.map((l) => l.toLowerCase());

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(letters);
    //Chama a proxima tela do jogo
    setGameStage(stages[1].name);
    console.log(letters);
  },[pickWordAndCategory,stages]);

  //Verifica letra digitada
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase(); //Tranforma a letra que o usuario digitou em minuscula

    // verifica se o usuario ja digitou essa letra retorna, para que usuario nao perca uma chance
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    )
      return;

    // Verifica se a letra digitada consta nas letras
    // Se consta adiciona ao array de palavras acertadas
    //Se não consta adiciona ao array de palavras erradas
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters([...guessedLetters, normalizedLetter]);
    } else {
      setWrongLetters([...wrongLetters, normalizedLetter]);
      setGuesses(guesses - 1);
    }
  };

  // clear letters state
const clearLettersStates = () => {
  setGuessedLetters([]);
  setWrongLetters([]);
};

  // Toda vez que mudar as tentativas chama o use effect
  useEffect(() => {
    if (guesses <= 0) {
      // Limpeza dos estado spara reiniciar o jogo
      clearLettersStates()
      setGuesses(3);
      // Seta tela final do jogo
      setGameStage(stages[2].name);
    }
  }, [guesses, stages]);

  useEffect(() => {
    // Cria um array com as letras unicas, se ouver letras repetivas nao vai para o array
    const uniqueLetters = [...new Set(letters)];
    // Condição para ganhar o jogo
    // Verifica o tamanho dos array, se forem iguais indica que jogador acertou a palavra
    if (guessedLetters.length === uniqueLetters.length) {
      setScore(score + 100); // Incrementa  a pontuação
      startGame(); // reinicia o jogo
    }
  }, [guessedLetters, letters, score, startGame]);


  //Reiniciar jogo
  const retryGame = () => {
    setScore(0); //Zera a pontuação
    setGameStage(stages[0].name); //Muda a tela do jogo
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          score={score}
          guesses={guesses}
        />
      )}
      {gameStage === "end" && <GameOver retryGame={retryGame} score={score} />}
    </div>
  );
}

export default App;
