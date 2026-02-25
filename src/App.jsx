import React from "react";
import { useState, useEffect } from "react";
import "./css/App.css";
import Card from "./components/Card.jsx";
import STUDY_DATA from './data/infomation.json';
import { HashRouter } from "react-router-dom";
import Quiz from "./components/Quiz.jsx";
import HeroPage from "./components/HeroPage.jsx";

const App = () => {

  const [isCards, setIsCards] = useState(false);
  const [cardList, setWordList] = useState(STUDY_DATA.greekHeroes);
  const [currHero, setCurrHero] = useState(null);
  const [isQuiz, setIsQuiz] = useState(false);

  const [clickedHeroes, setClickedHeroes] = useState([])

  const returnBack = () => setCurrHero(null);

  const setHeroClicked = (hero) => {
    setCurrHero(hero); // Shows the HeroPage

    // Add to visited list if not already there
    if (!clickedHeroes.includes(hero.name)) {
      setClickedHeroes((prev) => [...prev, hero.name]);
    }
  };

    if (isQuiz) {
    return (
      <Quiz
      onBack={() => setIsQuiz(false)}
      />
    )
  }


  return (
    <div className="app-container">
      {/* If isCards is FALSE, show the intro. If TRUE, this whole section vanishes */}
      {!isCards && (
        <div className="intro-section">
          <h1>Welcome to the Lomda!</h1>
          <p>in here you will learn about all the different greek heroes, who they were, and their achievement! at the end, there will be a quiz, so make sure to pay attention!</p>
          <button className="start" onClick={() => setIsCards(true)}>
            ENTER
          </button>
        </div>
      )}

      {clickedHeroes.length === cardList.length && (
        <button className="to-quiz"
                      onClick={() => {
                setIsQuiz(true);                         // Enter Quiz mode
              }}
        > 
        Start Quiz </button>
      )}

      {isCards && !currHero && (
        <>
          <h1 className="main-title">OUR HEROES</h1>
          <div className="card-grid">
            {cardList.map((hero) => (
              <div
                key={hero.name}
                onClick={() => setHeroClicked(hero)}
                className={`hero-card ${clickedHeroes.includes(hero.name) ? "visited" : ""}`}
              >
                <Card name={hero.name} />
              </div>
            ))}
          </div>
        </>
      )}

      {/* 3. Show the Hero Page if a hero is selected */}
      {currHero && (
        <HeroPage hero={currHero} onBack={returnBack} />

      )}
    </div>
  );
}

export default App;