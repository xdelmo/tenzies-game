import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <small>
        Coded with{" "}
        <span role="img" aria-label="heart">
          ❤️
        </span>{" "}
        by{" "}
        <a
          className="footer--link"
          href="https://emanueledelmonte.it"
          target="_blank"
          rel="noopener noreferrer"
        >
          Emanuele Del Monte
        </a>
        .
      </small>
    </footer>
  );
}
