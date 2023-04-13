var foo; // variable for clearInterval() function
var seconds = document.getElementById("counter").innerHTML;
;

function redirect() {
    document.location.href = './index.html';
}

function updateSecs() {
    document.getElementById("counter").innerHTML = seconds;
    seconds--;
    if (seconds == -1) {
        clearInterval(foo);
        redirect();
    }
}

function countdownTimer() {
    foo = setInterval(function () {
        updateSecs()
    }, 1000);
}

countdownTimer();