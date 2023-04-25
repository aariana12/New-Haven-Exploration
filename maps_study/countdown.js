// adapted from https://stackoverflow.com/questions/12498209/redirect-10-second-countdown

function countdown() {
    var i = document.getElementById('counter');
    if (parseInt(i.innerHTML)<=0) {
        location.href = '../qr.html';
    }
    if (parseInt(i.innerHTML)!=0) {
        i.innerHTML = parseInt(i.innerHTML)-1;
    }
}

setInterval(function(){ countdown(); },1000);
