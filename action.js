let direction = 'forward';
let moveInterval;
let path = [];
let clockInterval;
let clockTime = 0;

// Display the clock as 00:00:00 initially
document.getElementById('clock').innerText = "00:00:00";

function startClock() {
    // Only start the clock if it's not already running
    if (!clockInterval) {
        clockInterval = setInterval(() => {
            clockTime++;
            let seconds = Math.floor((clockTime) % 60),
                minutes = Math.floor((clockTime / 60) % 60),
                hours = Math.floor((clockTime / 3600) % 24);

            seconds = (seconds < 10) ? "0" + seconds : seconds;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            hours = (hours < 10) ? "0" + hours : hours;

            document.getElementById('clock').innerText = `${hours}:${minutes}:${seconds}`;
        }, 1000);
    }
}

function stopClock() {
    // Pause the clock by clearing the interval
    clearInterval(clockInterval);
    clockInterval = null; // Set the interval ID to null when the clock is paused
}

document.getElementById('start').addEventListener('click', function() {
    moveInterval = setInterval(move, 1000);
    startClock();
});

document.getElementById('stop').addEventListener('click', function() {
    clearInterval(moveInterval);
    stopClock();
});

document.getElementById('left').addEventListener('click', function() {
    direction = 'left';
    setTimeout(() => {
        direction = 'forward';
    }, 5000);
});

document.getElementById('right').addEventListener('click', function() {
    direction = 'right';
    setTimeout(() => {
        direction = 'forward';
    }, 5000);
});

function move() {
    let object = document.getElementById('object');
    let top = parseInt(getComputedStyle(object).top);
    let left = parseInt(getComputedStyle(object).left);

    switch(direction) {
        case 'forward':
            top -= 10;
            break;
        case 'left':
            left -= 10;
            break;
        case 'right':
            left += 10;
            break;
    }

    object.style.top = `${top}px`;
    object.style.left = `${left}px`;

    path.push({ top, left });

    drawPath();
}

function drawPath() {
    let pathElement = document.getElementById('path');
    pathElement.innerHTML = '';

    for(let point of path) {
        let div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.top = `${point.top}px`;
        div.style.left = `${point.left}px`;

        pathElement.appendChild(div);
    }
}
