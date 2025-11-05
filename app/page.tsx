"use client"; // Required in Next.js 13 app directory to enable React client-side features like useState

import { useState } from "react";

// Define a TypeScript type for each quiz question
type Question = {
  question: string;      // The text of the question
  options: string[];     // Array of possible answers
  answer: string;        // Correct answer
};

// Array of quiz questions
const questions: Question[] = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "What is 5 + 7?",
    options: ["10", "11", "12", "13"],
    answer: "12",
  },
  {
    question: "Which language is used for web apps?",
    options: ["Python", "C++", "JavaScript", "Java"],
    answer: "JavaScript",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: "Pacific",
  },
];

export default function Home() {
  // State to track the index of the current question
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  // State to track the user's score
  const [score, setScore] = useState<number>(0);

  // State to determine if the final score should be shown
  const [showScore, setShowScore] = useState<boolean>(false);

  // Function to handle when a user selects an answer
  const handleAnswer = (selected: string) => {
    // Increment score if the selected answer is correct
    if (selected === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;

    // If there are more questions, go to the next question
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      // Otherwise, show the final score
      setShowScore(true);
    }
  };

  // Function to reset the quiz to initial state
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center justify-center gap-8 bg-white dark:bg-black p-8 rounded-lg shadow-lg">
        {showScore ? (
          // Render the final score when quiz is completed
          <div className="text-center flex flex-col items-center gap-4">
            <h1 className="text-3xl font-bold text-black dark:text-zinc-50">
              Your Score: {score} / {questions.length}
            </h1>
            <button
              onClick={resetQuiz} // Reset quiz on click
              className="mt-4 rounded bg-green-500 py-2 px-6 text-white hover:bg-green-600"
            >
              Reset Quiz
            </button>
          </div>
        ) : (
          // Render the current question and options
          <div className="flex flex-col items-center gap-6 w-full">
            <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">
              {questions[currentQuestion].question} {/* Display current question */}
            </h2>
            <div className="flex flex-col gap-4 w-full">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option} // Key is required for lists in React
                  onClick={() => handleAnswer(option)} // Handle answer selection
                  className="w-full rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600"
                >
                  {option} {/* Display each answer option */}
                </button>
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Question {currentQuestion + 1} of {questions.length} {/* Show progress */}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
