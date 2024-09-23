import React, { useEffect, useState } from 'react';
import './QuizApp.css';
import ques from './question.json';

const QuizApp = () => {
    const [currentQuestion,setCurrentQuestion]=useState(0);
    const [score,setScore]=useState(0);
    const [showScore,setShowScore]=useState(false);
    const [timer,setTimer]=useState(10);

    useEffect(()=>{
        let interval;
        if(timer>0 && !showScore){
            interval=setInterval(() => {
                setTimer((prevtimer)=>prevtimer-1);
            }, 1000);
        }else{
            clearInterval(interval);
            setShowScore(true);
        }
        return()=>clearInterval(interval);

    },[timer,showScore])

    const handleAnswer=(ans)=>{
        if(ans===ques[currentQuestion].correctOption){
            setScore((prevScore)=>prevScore+1);
        }

        if(currentQuestion<ques.length-1){
            setCurrentQuestion((prevQues)=>prevQues+1);
            setTimer(10);
        }else{
            setShowScore(true);
        }
    };

    const handleRestart=()=>{
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setTimer(10);
    }

  return (
    <>
        <div className='quiz-app'>
            {showScore ?(<div className='score-section'>
                <h2>Your Scrore : {score}/{ques.length}</h2>
                <button onClick={handleRestart}>Restart</button>
            </div>) : (
                <div className='question-section'>
                    <h2>Question {currentQuestion + 1}</h2>
                    <p>{ques[currentQuestion].question}</p>
                <div className='options'>
                    {ques[currentQuestion].option.map((option,index)=>(
                        <button key={index} onClick={()=>handleAnswer(option)}>{option}</button>
                    ))}
                </div>
                <div className='timer'>Time Left : <span>{timer}S</span></div>
            </div>
            )}
            
            
        </div>
    </>
  )
}

export default QuizApp