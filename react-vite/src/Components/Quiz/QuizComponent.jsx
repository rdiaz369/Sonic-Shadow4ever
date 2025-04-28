import { useState } from "react";
import { sonicQuiz } from "./Quiz"; 

const SonicQuiz = () => {
    // start by getting the first question & set selected answer to be empty
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [showResult, setShowResult] = useState(false);
    //keep track of answer's mssgs, value (is it right?), explanation for the answer
    const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [answerFeedbackMessage, setAnswerFeedbackMessage] = useState('');

    //for result calculate: total scores, correct answers, and wrong answers
    const [result, setResult] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    });

    const { questions } = sonicQuiz; //get questions from sonic quiz
    
    //destructuring to get the current question
    const currentQuestion = questions[activeQuestion];

    //determine behavior when a choice is selected
    const onAnswerSelected = (answer, index) => {
        //set the answer choice the user selected (highlight it when rendering)
        setSelectedAnswerIndex(index);
        //save the answer text
        setSelectedAnswer(answer);
    
        //get the CORRECT answer's text using its index (recall: it's index is stored as a string)
        const correctAnswerText = currentQuestion.answers[parseInt(currentQuestion.correctAnswer) - 1];
        if (answer === correctAnswerText) {
        //mark answer as correct and set the feedback mssg for the correct answer (set in quiz.js)
        setIsAnswerCorrect(true);
        setAnswerFeedbackMessage(currentQuestion.messageForCorrectAnswer);
        } else {
        //opposite of first condition
        setIsAnswerCorrect(false);
        setAnswerFeedbackMessage(currentQuestion.messageForIncorrectAnswer);
        }
        //show the explanation of the answer --regardless if right/wrong
        setShowAnswerFeedback(true);
    };

    //determine behavior when user click the "next" button
    const onClickNext = () => {
        // check if user selected the right answer
        const correctAnswerText = currentQuestion.answers[parseInt(currentQuestion.correctAnswer) - 1];
        //compare user's selected answer to the correct one
        if (selectedAnswer === correctAnswerText) { //right answer chosen
        setResult((prev) => ({
            ...prev,
            score: prev.score + parseInt(currentQuestion.point),
            correctAnswers: prev.correctAnswers + 1,
        }));
        } else {
        setResult((prev) => ({
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
        }));
        }
    
        // Move to next question or end the quiz and show the results
        if (activeQuestion !== questions.length - 1) { //there are still questions left
        setActiveQuestion((prev) => prev + 1); //go to next question
        setSelectedAnswer(''); //reset selected answer
        setSelectedAnswerIndex(null);
        setShowAnswerFeedback(false); // hide feedback (explanation) for the next question
        } else {
        setShowResult(true); //show results
        }
    };
    //when quiz is done, let the user restart the quiz--reset all states
    const restartQuiz = () => {
        setActiveQuestion(0);
        setSelectedAnswer('');
        setSelectedAnswerIndex(null);
        setResult({ score: 0, correctAnswers: 0, wrongAnswers: 0 });
        setShowResult(false);
        setShowAnswerFeedback(false);
    };
    
  
//render quiz
return (
    <div className="quiz-container">
      {!showResult ? (
        <div>
          {/* Progress Bar */}
          <div
            style={{
              width: "100%",
              backgroundColor: "#e0e0e0", //add gray bavkground for contrast
              height: "10px",
              borderRadius: "5px",
              overflow: "hidden",
              marginBottom: "30px",
            }}
          >
          {/* calculations for progress bar (based on which question user is on) */}
            <div
              style={{
                width: `${((activeQuestion + 1) / questions.length) * 100}%`,
                backgroundColor: sonicQuiz.progressBarColor,
                height: "100%",
                transition: "width 0.4s ease-in-out", //show user the progress bar slowly moving when clicking the next button
              }}
            />
          </div>
  
          {/* Show current question */}
          <h2>{currentQuestion.question}</h2>
  
          {/* Answer Choices */}
          <ul style={{ listStyleType: "none", padding: 0 }}> 
            {currentQuestion.answers.map((answer, index) => {
              const isSelected = selectedAnswerIndex === index; //check if this answer is selected
              return (
                <li
                  key={index}
                  onClick={() => onAnswerSelected(answer, index)} //mark as selected
                  style={{
                    cursor: "pointer",
                    backgroundColor: isSelected ? "#e0e7ff" : "#fff", // light blue when selected, white for neutral/not selected choices
                    padding: "12px", //make answer choices more spaced out
                    border: "1px solid #ccc",
                    marginBottom: "8px",
                    borderRadius: "8px", //make rounded
                    transition: "background-color 0.2s ease", ///show effect when clicking on answer choice
                  }}
                >
                  {answer}
                </li>
              );
            })}
          </ul>
  
          {/* Feedback message after answering*/}
          {showAnswerFeedback && (
            <div
              style={{
                marginTop: "15px",
                padding: "10px",
                border: "1px solid",
                borderColor: isAnswerCorrect ? "#198754" : "#dc3545", // green for correct, red for wrong
                backgroundColor: isAnswerCorrect ? "#d1e7dd" : "#f8d7da",
                color: isAnswerCorrect ? "#0f5132" : "#842029",
                borderRadius: "8px",
              }}
            >
              {/* Show correct/wrong feedback message */}
              <p><strong>{answerFeedbackMessage}</strong></p>
              {/* Show explanation for why it's right/wrong */}
              <p>{currentQuestion.explanation}</p>
            </div>
          )}
  
          {/* Next/Finish Button */}
          <div style={{ textAlign: "right" }}>
            <button
              onClick={onClickNext} //go to next question
              disabled={selectedAnswerIndex === null} //disable if no answer is selected
              style={{
                padding: "10px 20px",
                marginTop: "20px",
                backgroundColor: "#0a7832", //green
                color: "#fff", //white
                borderRadius: "6px",
                cursor: selectedAnswerIndex !== null ? "pointer" : "not-allowed", //only let teh user click on the button has selected an answer
                fontWeight: "bold",
                fontSize: "18px",
                transition: "background-color 0.2s ease",
              }}
            >
              {/* Change button to "finish" if it's the last question */}
              {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      ) : (
        // Results
        <div className="result" style={{ textAlign: "center", marginTop: "50px" }}>
          <h2 style={{ color: "green"}}  >Quiz Results</h2>
          <p style={{ color: "black" }}> Total Questions: <strong>{questions.length}</strong></p>
          <p style={{ color: "black" }}> Total Score: <strong>{Math.round((result.correctAnswers / questions.length) * 100)}%</strong></p>
          <p style={{ color: "black" }}> Correct Answers: <strong>{result.correctAnswers}</strong></p>
          <p style={{ color: "black" }}> Wrong Answers: <strong>{result.wrongAnswers}</strong></p>

            {/* Try Again Button */}
            <button
              onClick={restartQuiz} //reset the quiz
              style={{
                padding: "10px 20px",
                backgroundColor: "#3061e3", 
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
                transition: "background-color 0.2s ease",
              }}
            >
              Try Again
            </button>
        </div>

      )}
    </div>
  );
  };
  
  export default SonicQuiz;