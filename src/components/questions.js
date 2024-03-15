import React, { useState, useEffect } from 'react';
// import {QUESTIONS} from './questions';


const questions = [
    "Can you code in Ruby?",
    "Can you code in JavaScript?",
    "Can you code in Swift?",
    "Can you code in Java?",
    "Can you code in C#?"
  ];

const Question = () => {
  const [score, setScore] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [finalScores, setFinalScores] = useState([]);

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem('finalScores'));
    if (storedScores) {
      setFinalScores(storedScores);
    }
  }, []);

  useEffect(() => {
    if (finalScores.length > 0) {
      const total = finalScores.reduce((acc, cur) => acc + cur, 0);
      setAverageScore(total / finalScores.length);
    }
  }, [finalScores]);

  const handleAnswer = (answer) => {
    const numYes = answer.filter(ans => ans === 'Yes').length;
    const newScore = (numYes / questions.length) * 100;
    setScore(newScore);
    setFinalScores([...finalScores, newScore]);
    localStorage.setItem('finalScores', JSON.stringify([...finalScores, newScore]));
  };

  return (
    <div className="main__wrap">
    <main className="container">   
     <div>
     <h1>Answer the following Questions Yes/No </h1>
      { questions && questions.map((question, index) => (
        <div className="button-container" key={index}>
          <p>{question}</p>
          <button  className='Yesbutton' onClick={() => handleAnswer([...Array(index + 1)].map(() => 'Yes'))}>Yes</button>
          <button className='Nobutton' onClick={() => handleAnswer([...Array(index + 1)].map(() => 'No'))}>No</button>
        </div>
      ))}
      <h4>Score: {score.toFixed(2)}%</h4>
      {averageScore > 0 && <h4>Average Score: {averageScore.toFixed(2)}%</h4>}
     </div>        
    </main>
    </div>
  );
};


export default Question;





