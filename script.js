const quizData = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: 2, // index of the correct answer
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Venus"],
        correct: 1,
    },
    {
        question: "Who wrote 'Hamlet'?",
        answers: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
        correct: 1,
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: 3,
    },
    {
        question: "What element does 'O' represent on the periodic table?",
        answers: ["Gold", "Oxygen", "Osmium", "Oganesson"],
        correct: 1,
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        answers: ["China", "Japan", "Thailand", "South Korea"],
        correct: 1,
    },
    {
        question: "What is the smallest prime number?",
        answers: ["0", "1", "2", "3"],
        correct: 2,
    },
    {
        question: "Which gas is essential for photosynthesis?",
        answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correct: 1,
    },
    {
        question: "What is the capital of Canada?",
        answers: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
        correct: 2,
    },
    {
        question: "What is the freezing point of water?",
        answers: ["0°C", "100°C", "32°F", "212°F"],
        correct: 0,
    },
];

let currentQuestionIndex = 0;
let userAnswers = []; // Store user answers

function loadQuestion() {
    const currentQuestionData = quizData[currentQuestionIndex];
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");

    questionElement.textContent = currentQuestionData.question;
    answersElement.innerHTML = ""; // Clear previous answers

    currentQuestionData.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.classList.add("answer");
        button.textContent = answer;
        button.dataset.index = index;
        button.onclick = selectAnswer;
        answersElement.appendChild(button);
    });

    // Show or hide Previous button
    document.getElementById("previousButton").style.display = currentQuestionIndex === 0 ? "none" : "inline-block";
    // Hide Next button initially
    document.getElementById("nextButton").style.display = "none"; 
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const selectedAnswerIndex = parseInt(selectedButton.dataset.index);
    const currentQuestionData = quizData[currentQuestionIndex];

    userAnswers[currentQuestionIndex] = selectedAnswerIndex; 

    
    const answerButtons = document.querySelectorAll(".answer");
    answerButtons.forEach((button) => {
        button.disabled = true;
        if (parseInt(button.dataset.index) === currentQuestionData.correct) {
            button.classList.add("correct");
        } else {
            button.classList.add("wrong"); 
        }
    });

  
    if (selectedAnswerIndex === currentQuestionData.correct) {
        selectedButton.classList.add("correct");
    } else {
        selectedButton.classList.add("wrong");
    }

  
    document.getElementById("nextButton").style.display = "block";
}


document.getElementById("previousButton").addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});


document.getElementById("nextButton").addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
});


function showResults() {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = "<h2>Quiz completed!</h2>"; 

    const resultContainer = document.getElementById("resultContainer");
    resultContainer.style.display = "block"; 
    resultContainer.style.textAlign = "center"; 

    const resultList = document.getElementById("resultList");
    resultList.innerHTML = "";

    let correctCount = 0; 

    quizData.forEach((question, index) => {
        const userAnswer = userAnswers[index]; 
        const li = document.createElement("li");
        li.textContent = `${question.question} - Your answer: ${question.answers[userAnswer]}, Correct answer: ${question.answers[question.correct]}`;
        

        if (userAnswer === question.correct) {
            correctCount++; 
        }
    });

    const totalCorrectMessage = document.createElement("p");
    totalCorrectMessage.textContent = `Total Correct Answers: ${correctCount} out of ${quizData.length}`;
    resultList.appendChild(totalCorrectMessage); 
}


loadQuestion();
