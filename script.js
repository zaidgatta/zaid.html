const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const main = document.querySelector('.main');
const exitBtn = document.querySelector('.exit-btn');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');
const timerDiv = document.getElementById("timer");

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');
    showQuestion(0);
    questionCounter(1);
    headerScore();
}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;
let timer;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
    if (questionCount < questions.length -1){
    questionCount++;
    showQuestion(questionCount);
    questionNumb++;
    questionCounter(questionNumb);
    nextBtn.classList.remove('active');
    }
    else{
        showResultBox();
    }
}




const optionlist = document.querySelector('.option-list')

function showQuestion (index){
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}.${questions[index].question}`;
let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
<div class="option"><span>${questions[index].options[1]}</span></div>
<div class="option"><span>${questions[index].options[2]}</span></div>
<div class="option"><span>${questions[index].options[3]}</span></div>`;


optionlist.innerHTML = optionTag;
const option = document.querySelectorAll('.option');
for (let i = 0; i < option.length; i++){
    option[i].setAttribute('onclick', 'optionSelected(this)');
}

// Display the timer
let timeLeft = 30; // 30 seconds
updateTimerDisplay();

timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft === 0) {
        clearTimeout(timer);
        nextQuestion();
    }
}, 1000);

function updateTimerDisplay() {
    timerDiv.innerHTML = `Time Left: ${timeLeft} seconds`;
}
}

function nextQuestion() {
    questionCount++;
    showQuestion(questionCount);
    questionNumb++;
    questionCounter(questionNumb);
}

function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOption = optionlist.children.length;
    clearInterval(timer);
    if (userAnswer == correctAnswer){
    answer.classList.add('correct');
    userScore += 1;
    headerScore();
    }
    else{
        answer.classList.add('incorrect');

        for (let i = 0; i < allOption; i++){
            if (optionlist.children[i].textContent == correctAnswer){
                optionlist.children[i].setAttribute('class', 'option correct');
            }
        }
    }

    for (let i = 0; i < allOption; i++){
        optionlist.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');
}


function questionCounter(index){
    const questionTotal = document.querySelector('.quiz-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore (){
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`; 
}

function showResultBox (){
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} / ${questions.length}`;

    const cirlularProgress = document.querySelector('.circular-progress')
    const progressValue = document.querySelector('.progress-value')

    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 10;

    let progress = setInterval(()=>{
        progressStartValue++;
        if (progressStartValue == progressEndValue){
            clearInterval(progress);
        }
        progressValue.textContent = `${progressStartValue}`;
        cirlularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1)0deg)`;
    },speed)
}

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active')
    resultBox.classList.remove('active')

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestion(questionCount);
    questionCounter(questionNumb);

    headerScore();
}

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active')
    resultBox.classList.remove('active')

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestion(questionCount);
    questionCounter(questionNumb);
}

