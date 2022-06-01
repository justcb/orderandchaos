import React, {useEffect, useState} from "react";
import IntroScreen from "./IntroScreen";
import '../assets/css/Quiz.css';

const questions = [
    {
        questionText: 'I prefer clear rules to follow.',
        answerOptions: [
            { answerText: 'True', isCorrect: true },
            { answerText: 'False', isCorrect: false },
        ],
    },
    {
        questionText: 'The world is better when people can do what they want.',
        answerOptions: [
            { answerText: 'True', isCorrect: false },
            { answerText: 'False', isCorrect: true },
        ],
    },
    {
        questionText: 'I would rather be an independent contractor than work in a big corporation.',
        answerOptions: [
            { answerText: 'True', isCorrect: false },
            { answerText: 'False', isCorrect: true },
        ],
    },
    {
        questionText: 'I prefer to select my own goals than have them told to me.',
        answerOptions: [
            { answerText: 'True', isCorrect: false },
            { answerText: 'False', isCorrect: true },
        ],
    },
    {
        questionText: 'I am a ...',
        answerOptions: [
            { answerText: 'Shark, I hunt alone.', isCorrect: false },
            { answerText: 'Wolf, I hunt in packs.', isCorrect: true },
        ],
    },

];
const Quiz = ({ setForm, formData, navigation }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [scoreType, setScoreType] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { next } = navigation;
    const { go } = navigation;
    const { personType } = formData;
    console.log('score type '+scoreType);
    console.log('score is '+score);
    let suggestion = "Chaos";

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 14000);
    }, []);


    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
            setScoreType(1);

            setForm({
                target: {
                    name: 'scoreTotal', 
                    value: score 
                }
            })
        }
    }

    return isLoading ?
        <IntroScreen isLoading={isLoading} /> :
        (
            <div className="App">
                <div className="container">
                    <div className="header-container">
                        <p className="header gradient-text"></p>
                        <p className="sub-text"></p>

                        {showScore ? <div className='app'>
                                <div className="hidden">{score > 2 ? suggestion = "Order": suggestion = "Chaos"}</div>
                                <div className='score-section'>
                                    Based on your personality score, you should be in {suggestion}. But ultimately the choice is yours.
                                    
                                    <div className = "next_button">
                                        <button onClick={next}> Next -></button>
                                    </div>                   
                                </div>
                            </div> :

                            <div className='app'>
                                <div className='question-section'>
                                    <div className='question-count'>
                                        <span>Question {currentQuestion + 1}</span>/{questions.length}
                                    </div>
                                    <div className='question-text'>{questions[currentQuestion].questionText}</div>
                                </div>
                                <div className='answer-section'>
                                    {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                                        <button key={index}
                                                onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
                                    ))}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
}

export default Quiz
