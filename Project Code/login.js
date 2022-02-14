
function openModal() {
    /* Note that you do NOT have to do a document.getElementById anywhere in this exercise. Use the elements below */
    var myInput = document.getElementById("passwordInput");
    var confirmMyInput = document.getElementById("cpsw");
    var letter = document.getElementById("letter");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var length = document.getElementById("length");
    var match = document.getElementById("match");
   
    var lengthUser = document.getElementById("lengthUser");
    var username = document.getElementById("usernameInput");
    
    var email1= document.getElementById("emailInput");
    var emailval=document.getElementById("emailV");
    var emailVar=/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    // When the user starts to type something inside the password field
    username.onkeyup = function () {
        if (username.value.length >= 3) {
            lengthUser.classList.remove("invalid");
            lengthUser.classList.add("valid");
        } else {
            lengthUser.classList.remove("valid");
            lengthUser.classList.add("invalid");
        }
        enableButton(letter, capital, number, length, match, lengthUser, emailval);
    }
    email1.onkeyup = function () {
        if (email1.value.match(emailVar)) {
            emailval.classList.remove("invalid");
            emailval.classList.add("valid");
        } else {
            emailval.classList.remove("valid");
            emailval.classList.add("invalid");
        }
        enableButton(letter, capital, number, length, match, lengthUser, emailval);
    }
    myInput.onkeyup = function () {
        /* TODO: Question 1.1: Starts here */
        var lowerCaseLetters = /[a-z]/g; // : Fill in the regular experssion for lowerCaseLetters
        var upperCaseLetters = /[A-Z]/g; // : Fill in the regular experssion for upperCaseLetters
        var numbers = /[0-9]/g; // : Fill in the regular experssion for digits
        var minLength = 8;
        // : Change the minimum length to what what it needs to be in the question 
        /* TODO: Question 1.1: Ends here */
        

        if (myInput.value.match(lowerCaseLetters)) {
            letter.classList.remove("invalid");
            letter.classList.add("valid");
        } else {
            letter.classList.remove("valid");
            letter.classList.add("invalid");
        }

        // Validate capital letters        
        if (myInput.value.match(upperCaseLetters)) {
            capital.classList.remove("invalid");
            capital.classList.add("valid");
        } else {
            capital.classList.remove("valid");
            capital.classList.add("invalid");
        }

        // Validate numbers        
        if (myInput.value.match(numbers)) {
            number.classList.remove("invalid");
            number.classList.add("valid");
        } else {
            number.classList.remove("valid");
            number.classList.add("invalid");
        }

        // Validate length

        if (myInput.value.length >= minLength) {
            length.classList.remove("invalid");
            length.classList.add("valid");
        } else {
            length.classList.remove("valid");
            length.classList.add("invalid");
        }
        enableButton(letter, capital, number, length, match, lengthUser, emailval);
        /* TODO: Question 1.2:  Ends here */
    }

    /* TODO Question 1.3: Starts here */
    confirmMyInput.onkeyup = function () {
        // Validate password and confirmPassword
        var passEqualsConfPass = (myInput.value == confirmMyInput.value); // TODO: Change this to the condition that needs to be checked so that the text entered in password equals the text in confirm password
        if (passEqualsConfPass) {
            match.classList.remove("invalid");
            match.classList.add("valid");
        } else {
            match.classList.remove("valid");
            match.classList.add("invalid");
        }
        /* TODO Question 1.3: Starts here */

        // Disable or Enable the button based on the elements in classList
        enableButton(letter, capital, number, length, match, lengthUser, emailval);
    }

}

function enableButton(letter, capital, number, length, match, lengthUser, emailval) {
    // TODO: Clear this function for students to implement    
    var button = document.getElementById('my_submit_button');
    var checker=false;
    var a=letter.classList.item(1);
    var b=capital.classList.item(1);
    var c=number.classList.item(1);
    var d=length.classList.item(1);
    var e=match.classList.item(1);
    var f=lengthUser.classList.item(1);
    var g=emailval.classList.item(1);
  
    if(a=="valid" && b=="valid" && c=="valid" && d=="valid" && e=="valid" && f=="valid" && g=="valid"){
        checker=true;
    }
    var condition = (checker); // TODO: Replace false with the correct condition
    if(condition) {       
            button.disabled = false;
    }else{
            button.disabled = true;
    }
}    
