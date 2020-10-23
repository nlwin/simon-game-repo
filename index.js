var gameState = { states: [], currentState: 0, currentMaxLevel: 1, status: false}

var buttons = ['red', 'blue', 'green', 'yellow']

$(document).keydown(() => {
    if (gameState.status === false) {
        $('#level-title').text(`Level ${gameState.currentMaxLevel}`);
        gameState.status = true;
        gameStart();
    }
})

buttons.forEach(buttonsRegister);

function buttonsRegister(value) {
    $(`#${value}`).on("click", function() {
        // while game is not started, pressed button will reset gameover
        if(gameState.status === false) {
            gameOver();
        } else {
            // if button currently pressed is the same as currentTurn in states
            if(getCurrentStateValue() === value) {
                makeAnimation(value);
                makeSound(value);
                setTimeout(updateLevel, 400);
            } else {
                gameOver();
            }
        }
    })
}


function gameStart() {
        let rIndex = Math.floor(Math.random() * buttons.length)
        gameState.states.push(buttons[rIndex]);
        makeSound(buttons[rIndex]);
        makeAnimation(buttons[rIndex]);
}


function gameOver() {
    resetState();
    makeSound("wrong");
    $('body').addClass('game-over');
    $('#level-title').text("GameOver Press Any Key to Restart");
    setTimeout(function() {
        $('body').removeClass('game-over');
    }, 100)
}


function getCurrentStateValue() {
     return gameState.states[gameState.currentState++];
}

function updateLevel() {
    if (gameState.currentState === gameState.states.length) {
        gameState.currentMaxLevel += 1;
        gameState.currentState = 0;
        $('#level-title').text(`Level ${gameState.currentMaxLevel}`);

        // advance to next level
        let rIndex = Math.floor(Math.random() * buttons.length)
        gameState.states.push(buttons[rIndex]);
        makeSound(buttons[rIndex]);
        makeAnimation(buttons[rIndex]);
    }
}

function resetState() {
    gameState.states = [];
    gameState.currentState = 0;
    gameState.currentMaxLevel = 1;
    gameState.status = false;
}

function makeSound(key) {
    switch(key) {
        case 'red':
            new Audio('./sounds/red.mp3').play();
            break;
        case 'blue':
            new Audio('./sounds/blue.mp3').play();
            break;
        case 'green':
            new Audio('./sounds/green.mp3').play();
            break;
        case 'yellow':
            new Audio('./sounds/yellow.mp3').play();
            break;
        default:
            new Audio('./sounds/wrong.mp3').play();
    }
}


function makeAnimation(key) {
    $(`#${key}`).addClass('pressed')
    setTimeout(function(){
        $(`#${key}`).removeClass('pressed')
    }, 50);
}
