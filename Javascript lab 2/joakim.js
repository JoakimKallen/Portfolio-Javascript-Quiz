function validateInput(event) {

    var letterRegex = /^[A-Za-z]+$/;
    var inputValue = event.target.value;

    if (!inputValue.match(letterRegex) && inputValue.length > 0) {
        event.target.value = inputValue.substring(0, inputValue.length - 1);
        alert("Only letters are allowed.");
    }
}

window.onload = function() {
    document.getElementById('firstName').addEventListener('input', validateInput);
    document.getElementById('lastName').addEventListener('input', validateInput);
}


function createBubble() {
    const bubbleContainer = document.getElementById('bubble-container');
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    
    const size = Math.random() * 60 + 20; 
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}%`; 
    bubble.style.backgroundColor = `rgba(255, 255, 255, ${Math.random()})`; 

    bubbleContainer.appendChild(bubble);

    
    const duration = Math.random() * 5 + 5; 
    bubble.animate([
        { bottom: '-100px', opacity: 1 },
        { bottom: '110%', opacity: 0 }
    ], {
        duration: duration * 1000, 
        easing: 'linear',
        iterations: 1,
    }).onfinish = function() {
        bubble.remove(); 
    };
}
setInterval(createBubble, 500);



document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('quizForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        let isFirstNameValid = false;
        let isLastNameValid = false;
        let isEmailValid = false;

        // Validation First Name
        const firstName = document.getElementById('firstName').value.trim();
        if (!firstName) {
            displayMessage('firstNameMsg', 'Please enter your first name.', false);
        } else {
            displayMessage('firstNameMsg', 'First name looks good!', true);
            isFirstNameValid = true;
        }

        // Validation Last Name
        const lastName = document.getElementById('lastName').value.trim();
        if (!lastName) {
            displayMessage('lastNameMsg', 'Please enter your last name.', false);
        } else {
            displayMessage('lastNameMsg', 'Last name looks good!', true);
            isLastNameValid = true;
        }

        // Validation email
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            displayMessage('emailMsg', 'Please enter a valid email.', false);
        } else {
            displayMessage('emailMsg', 'Email looks good!', true);
            isEmailValid = true;
        }

        // Check if all inputs are valid
        if (!isFirstNameValid || !isLastNameValid || !isEmailValid) {
            return; 
        }

        let score = 0;
        const totalQuestions = 5;

        // Quiz scoring 
        if (document.querySelector('input[name="q1"]:checked')?.value === "pacific1") {
            score++;
        }

        const correctAnswersQ2 = ['hippo', 'tuna', 'turtle'];
        let answersQ2 = Array.from(document.querySelectorAll('input[name="q2"]:checked')).map(input => input.value);
        if (correctAnswersQ2.every(val => answersQ2.includes(val)) && answersQ2.length === correctAnswersQ2.length) {
            score++;
        }
        
        if (document.getElementById('Diving').value === "PADI") {
            score++;
        }

        let userAnswer = document.getElementById('userFeedback').value.trim().toLowerCase();
        if (userAnswer === "blue whale") {
            score++;
        }

        if (document.querySelector('input[name="q5"]:checked')?.value === "20") {
            score++;
        }

        document.getElementById('result').innerHTML = `Your score is: ${score} out of ${totalQuestions}.<br><img src="fishpic.jpg" alt="fishpic" width="250" height="250">`;
    });
});


function displayMessage(elementId, message, isSuccess) {
    const msgElement = document.getElementById(elementId);
    msgElement.style.display = 'block';
    msgElement.textContent = message;
    msgElement.style.color = isSuccess ? 'green' : 'red';
}