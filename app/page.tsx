"use client";

import { useState } from "react";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    if (option === questions[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }

    // Delay before moving to next question
    setTimeout(() => {
      const next = currentQuestion + 1;
      if (next < questions.length) {
        setCurrentQuestion(next);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-zinc-900 dark:via-black dark:to-zinc-800 transition-colors">
      <main className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6 transition-all">
        {showScore ? (
          <div className="text-center space-y-6 animate-fadeIn">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              Final Score
            </h1>
            <p className="text-2xl text-gray-800 dark:text-gray-200">
              {score} / {questions.length}
            </p>
            <button
              onClick={resetQuiz}
              className="mt-4 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 py-2 px-8 text-white font-semibold shadow-md hover:shadow-lg transition-all"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="w-full space-y-6 animate-fadeIn">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              ></div>
            </div>

            <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-gray-100">
              {questions[currentQuestion].question}
            </h2>

            <div className="flex flex-col gap-4">
              {questions[currentQuestion].options.map((option) => {
                const isCorrect = option === questions[currentQuestion].answer;
                const isSelected = selectedOption === option;
                let optionClass =
                  "w-full rounded-lg border border-gray-300 dark:border-zinc-700 py-3 px-4 font-medium text-gray-700 dark:text-gray-200 transition-all transform hover:scale-[1.02]";

                if (isAnswered) {
                  if (isSelected && isCorrect)
                    optionClass += " bg-green-500 text-white border-green-600";
                  else if (isSelected && !isCorrect)
                    optionClass += " bg-red-500 text-white border-red-600";
                  else if (isCorrect)
                    optionClass += " bg-green-100 dark:bg-green-700/40";
                  else optionClass += " opacity-70";
                } else {
                  optionClass +=
                    " hover:bg-blue-100 dark:hover:bg-blue-900/40 cursor-pointer";
                }

                return (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className={optionClass}
                    disabled={isAnswered}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
