// Adapted from https://p5js.org/examples/interaction-snake-game.html
//

var host = "cpsc484-04.yale.internal:8888";

$(document).ready(function() {
  frames.start();
});

const startButton = document.getElementById('start-button');
startButton.addEventListener("click", () => {
  document.location.href = 'prompt.html';
});

function scale (number, inMin, inMax, outMin, outMax) {
  if (number >= inMax) {
    return outMax;
  }
  else if (number <= inMin) {
    return outMin;
  }
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

var frames = {
  socket: null,

  start: function() {
    var url = "ws://" + host + "/frames";
    frames.socket = new WebSocket(url);
    frames.socket.onmessage = function (event) {
      var command = frames.get_left_wrist_command(JSON.parse(event.data));
      if (command !== null) {
        sendWristCommand(command);
      }
    }
  },

  get_left_wrist_command: function (frame) {
    if (frame.people.length < 1) {
      return null;
    }

    // Normalize by subtracting the root (pelvis) joint coordinates
    var pelvis_x = frame.people[0].joints[0].position.x;
    var pelvis_y = frame.people[0].joints[0].position.y;
    var pelvis_z = frame.people[0].joints[0].position.z;
    var left_wrist_x = (frame.people[0].joints[7].position.x - pelvis_x) * -1;
    var left_wrist_y = (frame.people[0].joints[7].position.y - pelvis_y) * -1;
    var left_wrist_z = (frame.people[0].joints[7].position.z - pelvis_z) * -1;


    // var display_x = left_wrist_x;
    // var display_y = left_wrist_y;
    var display_x = scale(left_wrist_x, -650, 400, 0, window.innerWidth);
    var display_y = scale(left_wrist_y, -100, 900, 0, window.innerHeight);
    

    return {display_x, display_y};
  }
};

var twod = {
  socket: null,

  start: function() {
    var url = "ws://" + host + "/twod";
    twod.socket = new WebSocket(url);
    twod.socket.onmessage = function(event) {
      twod.show(JSON.parse(event.data));
    }
  },

  show: function(twod) {
    $('.twod').attr("src", 'data:image/pnjpegg;base64,'+twod.src);
  }
};

const mean = array => array.reduce((a, b) => a + b) / array.length;

const cursor = document.getElementById("cursor");
const coords = document.getElementById("coords");
const hover = document.getElementById("hover");
let cursor_x = [];
let cursor_y = [];
const buffer_length = 5;
let hover_count = 0;
const hover_threshold = 15;

const contains = function (x, y, domrect) {
  return domrect.x <= x && x <= domrect.x + domrect.width &&
         domrect.y <= y && y <= domrect.y + domrect.height;
}

// Get start button element coordinates
var startButtonRect = startButton.getBoundingClientRect();

function sendWristCommand(command) {
  if (command === null) {
    console.log('no person');
  }
  else {
    // console.log(`left wrist: ${command.display_x}, ${command.display_y}`);

    if (cursor_x.length === 0) {
      cursor_x.push(command.display_x);
    }
    else if (cursor_x.length <= buffer_length) {
      cursor_x.push(command.display_x);
    }
    else {
      cursor_x.shift();
      cursor_x.push(command.display_x);
    }

    if (cursor_y.length === 0) {
      cursor_y.push(command.display_y);
    }
    else if (cursor_y.length <= buffer_length) {
      cursor_y.push(command.display_y);
    }
    else {
      cursor_y.shift();
      cursor_y.push(command.display_y);
    }

    // console.log(`left wrist avg: ${mean(cursor_x)}, ${window.innerHeight-mean(cursor_y)}`);

    cursor.style.left = mean(cursor_x) + "px";
    cursor.style.top = (window.innerHeight-mean(cursor_y)) + "px";

    coords.innerHTML = `(${mean(cursor_x)}, ${window.innerHeight-mean(cursor_y)})`;
    // change color
    coords.style.color = "white";
    // increase font size
    coords.style.fontSize = "20px";

    hover.innerHTML = `hover: ${hover_count}`;
    // change color
    hover.style.color = "white";
    // increase font size
    hover.style.fontSize = "20px";

    if (contains(mean(cursor_x), window.innerHeight-mean(cursor_y), startButtonRect)) {
      hover_count++;
      if (hover_count === hover_threshold) {
        startButton.click();
      }
    }
    else {
      hover_count = 0;
    }
  }
}

