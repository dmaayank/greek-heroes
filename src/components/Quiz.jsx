import React, { useState } from 'react';
import quizData from '../data/quizData.json'; // Adjust path to your JSON file
import '../css/quiz.css';

const Quiz = ({ onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const questions = quizData.finalQuiz;

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      setQuestionsAnswered(prev => prev + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  if (!quizStarted) {
    return (
      <div className="quiz-container">         
        <div className="quiz-card start-screen">
          <h1>Heros Challenge</h1>
          <p>Test your knowledge of the 25 greatest myths!</p>
          <button className="start-quiz-btn" onClick={() => setQuizStarted(true)}>
            BEGIN THE TRIAL
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="quiz-card score-section">
          <h2>The Gods Have Judged!</h2>
          <div className="score-circle">
            <span className="final-score">{score}</span>
            <span className="total-score">/ {questions.length}</span>
          </div>
          <p>{score > 20 ? "You are a true Hero!" : "Return to the stories and learn more."}</p>
          <button className="quiz-btn restart" onClick={restartQuiz}>RESTART TRIAL</button>
          <button className="return-button" onClick={onBack}>BACK TO HEROES</button>
        </div>
      ) : (
        <div className="quiz-card">
          {/* Progress Bar */}
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
            ></div>
          </div>

          <div className="question-header">
            <span>Entry {currentQuestion + 1} of {questions.length}</span>
          </div>

          <h2 className="question-text">{questions[currentQuestion].question}</h2>

          <div className="options-grid">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className="option-btn"
                onClick={() => handleAnswerClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;