    // Enhanced function to check if correct and provide feedback
    function checkCode(button) {
        var code = button.getAttribute('data-code');
        var correct = button.classList.contains('correct-button');
        
        button.classList.remove('correct', 'wrong'); // Reset class list
        button.querySelector('.icon').textContent = ''; // Clear icon text
        
        if (correct) {
            button.classList.add('correct');
            button.querySelector('.icon').textContent = '✅'; // Add check mark
        } else {
            button.classList.add('wrong');
            button.querySelector('.icon').textContent = '❌'; // Add cross
        }
    }