import React from "react";

export default function Die(props) {
  // Assign dynamically dieFace according to props
  let dieFace = "";
  switch (props.value) {
    case 1:
      dieFace = "/img/dice1.png";
      break;
    case 2:
      dieFace = "/img/dice2.png";
      break;
    case 3:
      dieFace = "/img/dice3.png";
      break;
    case 4:
      dieFace = "/img/dice4.png";
      break;
    case 5:
      dieFace = "/img/dice5.png";
      break;
    case 6:
      dieFace = "/img/dice6.png";
      break;
    default:
      break;
  }

  return (
    // if it's held (isHeld === true), its background color
    // changes to a light green
    <div
      className={props.isHeld ? "die-face isHeld" : "die-face"}
      onClick={props.holdDice}
      style={{
        backgroundImage: `url(${dieFace})`,
        backgroundSize: "cover",
      }}
    >
      {/* <h2 className="die-num">{props.value}</h2> */}
    </div>
  );
}
