let timer;
let timeLeft = 180;

document.getElementById('student-info').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('student-info').style.display = 'none';
    document.getElementById('instructions').style.display = 'block';
});

document.getElementById('begin-passage').addEventListener('click', function() {
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('passage-section').style.display = 'block';
    startTimer();
});

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        document.getElementById('time').textContent = 
            (minutes < 10 ? '0' : '') + minutes + ':' + 
            (seconds < 10 ? '0' : '') + seconds;

        if (timeLeft <= 0) {
            clearInterval(timer);
            lockInputs();
            gradeAssessment();
        }
    }, 1000);
}

function lockInputs() {
    document.querySelectorAll('#passage-section select').forEach(el => el.disabled = true);
    document.getElementById('submit-btn').disabled = true;
}

document.getElementById('submit-btn').addEventListener('click', function() {
    clearInterval(timer);
    lockInputs();
    gradeAssessment();
});

function gradeAssessment() {
    const selects = document.querySelectorAll('#passage-section select');
    // <-- UPDATE this answers array to match your passage blanks IN ORDER -->
    const answers = ["result", "is", "game", "golf's"];
    let score = 0;

    selects.forEach((select, index) => {
        if (select.value === answers[index]) {
            score++;
        }
    });

    document.getElementById('passage-section').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    document.getElementById('score-output').textContent = `You scored ${score} out of ${answers.length}.`;
}
