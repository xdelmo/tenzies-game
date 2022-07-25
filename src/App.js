import React from "react";
import Footer from "./components/Footer";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";

export default function App() {
  // Create state to hold our array of numbers
  const [dice, setDice] = React.useState(allNewDice());

  // Create state to hold our game state
  const [tenzies, setTenzies] = React.useState(false);

  // Create and initialize states to hold rolls stats
  const [rolls, setRolls] = React.useState(0);
  const [bestRolls, setBestRolls] = React.useState(
    JSON.parse(localStorage.getItem("bestRolls")) || 0
  );

  // useEffect to sync 2 different states together
  React.useEffect(() => {
    // Check all dice are held
    const allHeld = dice.every((die) => die.isHeld);
    // Check all dice have same value
    // Check if every die's value has the same one as the first die in dice array
    const allSameValue = dice.every((die) => die.value === dice[0].value);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  // Set bestRolls to localStorage every item bestRolls changes
  React.useEffect(() => {
    localStorage.setItem("bestRolls", JSON.stringify(bestRolls));
  }, [bestRolls]);

  function getRandomInt() {
    // Math.ceil starts at 1 instead of 0
    return Math.ceil(Math.random() * 6);
  }

  function generateNewDie() {
    return {
      value: 1,
      isHeld: false,
      // Use nanoid package to generate a unique key for every object
      id: nanoid(),
    };
  }

  function allNewDice() {
    // newDice is an array of objects
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  // Flip the `isHeld` property on the object in the array
  // that was clicked, based on the `id` prop passed into the function
  function holdDice(id) {
    // Update dice state using old one
    setDice((oldDice) =>
      oldDice.map((die) => {
        // { ...die, isHeld: !die.isHeld } return the same die object but with isHeld flipped
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  // Map over the state numbers array to generate the array
  // of Die elements and render those in the App component
  const diceElements = dice.map((die) => {
    // Pass holdDice function down to each instance of the Die component
    // with a callback function with die.id as parameter
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
      />
    );
  });

  // Clicking the button should generate a new array of numbers
  // and set the `dice` state to that new array (thus re-rendering
  // the array to the page)
  function rollDice() {
    if (!tenzies) {
      // Update dice state using old one
      setDice((oldDice) =>
        oldDice.map((die) => {
          // { ...die, isHeld: !die.isHeld } return the same die object but with isHeld flipped
          return die.isHeld ? die : generateNewDie();
        })
      );

      updateRolls();
    } else {
      // Reset the game if user won and click on button
      setTenzies(false);
      // Check if bestRolls doesn't exist or newest rolls are better than bestRolls if so reassign the variable
      if (!bestRolls || rolls < bestRolls) {
        setBestRolls(rolls);
      }
      setDice(allNewDice());
      setRolls(0);
    }
  }

  // Increase rolls counter updating previous state
  function updateRolls() {
    return setRolls((oldRolls) => oldRolls + 1);
  }

  return (
    <div className="app-container shadow-shorter">
      {/* Render Confetti component if `tenzies` is true*/}
      {tenzies && <ReactConfetti />}
      <main>
        <h1 className="title">Tenzies</h1>
        {!tenzies && (
          <p className="instructions">
            Roll until all dice are the same.
            <br /> Click each die to freeze it at its current value between
            rolls.
          </p>
        )}
        {tenzies && <p className="winner gradient-text"> YOU WON!</p>}

        <div className="stats-container">
          <p>Rolls: {rolls}</p>
        </div>

        <div className="dice-container">{diceElements}</div>

        <button className="roll-dice" onClick={rollDice}>
          {tenzies ? "New game" : "Roll"}
        </button>
        <div className="stats-container">
          <div className="rolls-best">
            <p>Best rolls</p>
            <p>{bestRolls}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
