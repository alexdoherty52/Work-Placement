document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('question').textContent = generateNumber();

    function generateNumber() {
        feedback.textContent = "";
        document.getElementById('answer').value = "";
        const number = Math.floor(Math.random() * 256); // Generate a number between 0 and 255
        document.getElementById('question').textContent = number;
        return number;
    }

    window.checkAnswer = function() {
        const userAnswer = document.getElementById('answer').value;
        const num = parseInt(document.getElementById('question').textContent);
        const correctAnswer = num.toString(2);
        const feedback = document.getElementById('feedback');

        if(userAnswer === correctAnswer){
            feedback.textContent = "Correct!";
            setTimeout(() => {
                generateNumber();
            }, 2000);
        }
        else{
            feedback.textContent = "Incorrect!";
            setTimeout(() => {
                feedback.textContent = "";
            }, 2000);
        }
    }});