
let currentIndex = 0;
let score = 0;
let selectedOption = null;
let questions = [];

const questionBox = document.getElementById('question-box');
const questionText = document.getElementById('question-text');
const questionNumber = document.getElementById('question-number');
const optionsList = document.getElementById('options-list');
const feedback = document.getElementById('feedback');
const explanationBox = document.getElementById('explanation-box');
const submitBtn = document.getElementById('submit-btn');
const resultBox = document.getElementById('result-box');
const scoreText = document.getElementById('score-text');

function loadQuestion() {
  const q = questions[currentIndex];
  questionNumber.innerText = `第 ${q.id} 题`;
  questionText.innerText = q.question;
  optionsList.innerHTML = '';
  feedback.innerText = '';
  explanationBox.innerText = '';
  selectedOption = null;

  q.options.forEach(option => {
    const li = document.createElement('li');
    li.innerText = option;
    li.addEventListener('click', () => {
      document.querySelectorAll('#options-list li').forEach(li => li.classList.remove('selected'));
      li.classList.add('selected');
      selectedOption = option.charAt(0);
    });
    optionsList.appendChild(li);
  });
}

submitBtn.addEventListener('click', () => {
  if (!selectedOption) {
    alert('请先选择一个选项！');
    return;
  }
  const q = questions[currentIndex];
  if (selectedOption === q.answer) {
    score++;
    feedback.innerText = '✅ 回答正确！';
    feedback.style.color = 'green';
  } else {
    feedback.innerText = `❌ 回答错误！正确答案是：${q.answer}`;
    feedback.style.color = 'red';
  }
  explanationBox.innerText = '解析：' + q.explanation;

  setTimeout(() => {
    currentIndex++;
    if (currentIndex < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 1200);
});

function showResult() {
  questionBox.style.display = 'none';
  resultBox.style.display = 'block';
  scoreText.innerText = `你的得分：${score} / ${questions.length}（正确率 ${(score / questions.length * 100).toFixed(1)}%）`;
}

function restartExam() {
  currentIndex = 0;
  score = 0;
  questionBox.style.display = 'block';
  resultBox.style.display = 'none';
  loadQuestion();
}

fetch('questionBank.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    loadQuestion();
  });
