/* jshint esversion: 8 */

/* links buttons to their respective functions */
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("number-selection-form").addEventListener("submit", numberSubmit);

    /* The button that sets the orderType varaible to "random", for later use in generating a random turn order */
    document.getElementById("random-button").addEventListener("click", function () {
        orderType = "random";
        stageThreeStyle();
    });

    /* The button that sets the orderType variable to "clockwise" for later use in creating a clockwise player order */
    document.getElementById("clockwise-button").addEventListener("click", function () {
        orderType = "clockwise";
        stageThreeStyle();
    });

    /* the buttons that generates player order and presents it to the user */
    document.getElementById("player-details-form").addEventListener("submit", generatePlayerOrder);

    /* the game-buttons which are used to start the game, pause, and end player turns, as well as ending the game */
    document.getElementById("start-game").addEventListener("click", startTurn);

    document.getElementById("end-game").addEventListener("click", endGame);

    document.getElementById("pause-game").addEventListener("click", pauseGame);

    document.getElementById("end-turn").addEventListener("click", endTurn);
});

let numberOfPlayers = 0;
let orderType = "";
let playerDetails = [];
let orderedPlayerDetails = [];
let roundTracker = 0;
let minutes = 0;
let seconds = 0;
let appendSeconds = document.getElementById("seconds");
let appendMinutes = document.getElementById("minutes");
let stopped = false;
let Interval;

/**
 * takes the number of players submitted by ther user and generates the player details form
 * according to this number, before hiding the "landing page" and presenting the user with a choice of order type
 */
function numberSubmit(event) {
    event.preventDefault();

    numberOfPlayers = document.getElementById("number-selection-form").elements.number.value;

    let nameAndColor = "";

    for (let i = 0; i < numberOfPlayers; i++) {
        let playerNumber = i + 1;
        nameAndColor += `
            <div class="form-padding">
                <label for="name${[i]}"></label>       
                <input type="text" class="name-input" name="name" id="name${[i]}" placeholder="Player ${playerNumber} name" required>
                <br>
                <label for id="colors${[i]}"></label>
                <select name="color" id="colors-id${[i]}" required>
                    <option value="" disabled selected>Player ${playerNumber}'s color</option>
                    <option class="orange" value="orange">🟠Orange</option>
                    <option class="purple" value="purple">🟣Purple</option>
                    <option class="black" value="black">⚫Black</option>
                    <option class="blue" value="blue">🔵Blue</option>
                    <option class="yellow" value="yellow">🟡Yellow</option>
                    <option class="brown" value="brown">🟤Brown</option>
                    <option class="white" value="white">⚪White</option>
                    <option class="green" value="green">🟢Green</option>
                    <option class="red" value="red">🔴Red</option>
                </select>
                <br>
            </div>`;
    }
    document.getElementById("player-details-div").innerHTML = nameAndColor;
    stageTwoStyle();
}

/**
 * generates a turn order for players based on the details entered in the player details form.
 * First it checks that no color has been selected by more than one player, before creating an array containing
 * a dictionary for each players details. Then, depending on the users earlier choice, it generates a clockwise
 * or random player order by re-arranging the order of these dictionaries within their array, and calls on a function
 * to hide the player details form and display the player order it has generated.  
 */
function generatePlayerOrder(event) {
    event.preventDefault();

    let colorSelection = [];

    for (let i = 0; i < numberOfPlayers; i++) {
        colorSelection.push(document.getElementById("player-details-form").elements[`colors-id${[i]}`].value);
    }

    if (hasDuplicates(colorSelection)) {
        alert("Each player must have a unique color");
    } else {
        playerDetails = [];
        for (let i = 0; i < numberOfPlayers; i++) {
            let playerName = "";
            let playerColor = "";
            let player = {};
            playerName = document.getElementById("player-details-form").elements[`name${[i]}`].value;
            playerColor = document.getElementById("player-details-form").elements[`colors-id${[i]}`].value;
            player = {
                Name: playerName,
                Color: playerColor,
                minutes: 0,
                seconds: 0
            };
            playerDetails.push(player);
        }

        if (orderType === "random") {
            shuffle(playerDetails);

        /**
         * this "else if" condition chooses a random first player and then rearranges the array of 
         * "player" dictionaries so that this player is now at index 0, while the clockwise order of the players
         * is maintained.
         */
        } else if (orderType === "clockwise") {
            let randomNumberRange = playerDetails.length;
            let firstPlayerIndex = Math.floor(Math.random() * randomNumberRange);
            if (firstPlayerIndex === 0) {
                orderedPlayerDetails = playerDetails;
            } else {
                let playerDetailsSlice = playerDetails.slice(0, firstPlayerIndex);
                
                playerDetails.splice(0, firstPlayerIndex);

                orderedPlayerDetails = playerDetails.concat(playerDetailsSlice);
            }

        } else {
            alert("You havent chosen a invalid order type, please refresh to start again");
        }
        stageFourStyle();

        buildOrderList(orderedPlayerDetails);
    }
}

/*  checks whether any colors have been selected by more than one player */
function hasDuplicates(colorSelection) {
    return (new Set(colorSelection)).size !== colorSelection.length;
}

/**
*  shuffles the order of the playerDetails array to create a random order, returning the
* orderedPlayerDetails array
*/  
function shuffle(playerDetails) {
    let m = playerDetails.length,
        t, i;

    while (m) {
        i = Math.floor(Math.random() * m--);
        t = playerDetails[m];
        playerDetails[m] = playerDetails[i];
        playerDetails[i] = t;
    }
    orderedPlayerDetails = playerDetails;
    return orderedPlayerDetails;
}

/**
 * creates the turn order listing presented to the user after they click "Generate player order", 
 * by iterating over the orderedPlayerDetails array with another array of cardinal numbers
 */
function buildOrderList(orderedPlayerDetails) {
    let players = "";
    let orderList = document.getElementById("turn-order");
    let cardinalArray = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth"];
    for (let i = 0; i < orderedPlayerDetails.length; i++) {
        players += `
                    <div id="${orderedPlayerDetails[i].Color}">
                           <p>${cardinalArray[i]} player: ${orderedPlayerDetails[i].Name}</p>
                    </div>`;
    }
    orderList.innerHTML = players;
}

/** 
 * commences the next players turn, or the first players turn if called upon by the "start game" button.
 * It will then start the stopwatch for the players turn, set the HTML to display "Its (current player)'(s) turn",
 * set the background color to their player color, and ensure that buttons are legible on white backgrounds
 */
function startTurn() {
    document.getElementById("start-game").setAttribute("disabled", "");
    if (orderedPlayerDetails[roundTracker].Name.endsWith("s")) {
        document.getElementById("current-player").innerHTML = `${orderedPlayerDetails[roundTracker].Name}'`;

    } else {
        document.getElementById("current-player").innerHTML = `${orderedPlayerDetails[roundTracker].Name}'s`;
    }
    startStopwatch();
    stageFiveStyle();
    document.getElementsByTagName("body")[0].setAttribute("class", `${orderedPlayerDetails[roundTracker].Color}`);
    let whiteCheck = orderedPlayerDetails[roundTracker].Color;
    if (whiteCheck === "white") {
        document.getElementsByClassName("game-button")[1].classList.add("white-button");
        document.getElementsByClassName("game-button")[2].classList.add("white-button");
        document.getElementsByClassName("game-button")[3].classList.add("white-button");
        document.getElementsByTagName("h1")[0].classList.add("white-heading");
    } else {
        document.getElementsByClassName("game-button")[1].classList.remove("white-button");
        document.getElementsByClassName("game-button")[2].classList.remove("white-button");
        document.getElementsByClassName("game-button")[3].classList.remove("white-button");
        document.getElementsByTagName("h1")[0].classList.remove("white-heading");
    }
}

/** 
 * pauses and unpauses the stopwatch on the current players turn, and toggles the pause/unpause
 * buttons's text content accordingly
 */  
function pauseGame() {
    if (stopped) {
        stopped = false;
        startStopwatch();
        document.getElementById("pause-game").innerHTML = "Pause turn";
    } else {
        stopStopwatch();
        document.getElementById("pause-game").innerHTML = "Unpause turn";
    }
}

/** 
 *  ends a players turn, adds their stopwatch time to the times recorded in their dictionary,
 *  augments the roundTracker variable accordingly, and calls the startTurn function to start the next player's turn
 */ 
function endTurn() {

    let totalSeconds = orderedPlayerDetails[roundTracker].seconds;
    let totalMinutes = orderedPlayerDetails[roundTracker].minutes;
    let addedSeconds = appendSeconds.innerText;
    let addedMinutes = appendMinutes.innerText;

    totalSeconds = totalSeconds + parseInt(addedSeconds);
    totalMinutes = totalMinutes + parseInt(addedMinutes);

    orderedPlayerDetails[roundTracker].seconds = totalSeconds;
    orderedPlayerDetails[roundTracker].minutes = totalMinutes;

    roundTracker++;
    if (roundTracker === orderedPlayerDetails.length) {
        roundTracker = 0;
    }
    resetStopwatch();
    startTurn();
}

/**
 * ends the current turn, sets the background color back to default,
 * calls the stageSixStyle function, and calls the showResults function
 */ 
function endGame() {
    if(confirm("Are you sure you wish to end your game?")) {
        endTurn();
        document.getElementsByTagName("body")[0].removeAttribute("class");
        stageSixStyle();
        showResults();
    }
}

/**
 * generates a grammatically correct listing of the total time each player spent on their turns,
 * as well as the total duration of the game 
 */
function showResults() {
    let results = "";

    for (let i = 0; i < orderedPlayerDetails.length; i++) {
        let secondsTally = orderedPlayerDetails[i].seconds;
        let secondsResult = secondsTally % 60;
        let secondsToMinutes = Math.floor(secondsTally / 60);
        let minutesTally = orderedPlayerDetails[i].minutes + secondsToMinutes;
        let minutesResult = minutesTally % 60;
        let minutesToHours = Math.floor(minutesTally / 60);

        // minutesTally 
        if (minutesTally === 0 || minutesTally < 60) {
            minutesTally = "";
        } else {
            if (minutesTally === 1) {
                minutesTally = `(That's ${minutesTally} minute)`;
            } else {
                minutesTally = `(That's ${minutesTally} minutes)`;
            }
        }
        // minutesToHours
        if (minutesToHours === 0) {
            minutesToHours = "";
        } else {
            if (minutesToHours === 1) {
                minutesToHours = `${minutesToHours} hour, `;
            } else {
                minutesToHours = `${minutesToHours} hours, `;
            }

        }
        // minutesResult
        if (minutesResult === 0) {
            minutesResult = "";
        } else {
            if (minutesResult === 1) {
                minutesResult = `${minutesResult} minute`;
            } else {
                minutesResult = `${minutesResult} minutes`;
            }
        }
        // secondsResult
        if (secondsResult === 0) {
            secondsResult = ".";
        } else {
            if (secondsResult === 1) {
                secondsResult = `, ${secondsResult} second.`;
            } else {
                secondsResult = `, ${secondsResult} seconds.`;
            }
        }

        results += `<p>
                        ${orderedPlayerDetails[i].Name} took
                        ${minutesToHours} ${minutesResult}${secondsResult}
                        ${minutesTally}
                    </p>`;
    }
    document.getElementById("results").innerHTML = results;
}

/* starts stopwatch and sets interval to one second */
function startStopwatch() {
    clearInterval(Interval);
    Interval = setInterval(runStopwatch, 1000);
}

/*  clears interval and stops stopwatch */
function stopStopwatch() {
    clearInterval(Interval);
    stopped = true;
}

/* sets the stopwatch minutes and seconds variables back to zero */
function resetStopwatch() {
    clearInterval(Interval);
    seconds = "00";
    minutes = "00";
    appendSeconds.innerHTML = seconds;
    appendMinutes.innerHTML = minutes;
}

/** 
 * increases the second counter by 1 every 1000 milliseconds, resets the second counter once it hits 60 
 * and increases the minute counter by 1 each time this happens. 
*/
function runStopwatch() {
    seconds++;

    if (seconds <= 9) {
        appendSeconds.innerHTML = "0" + seconds;
    }

    if (seconds > 9) {
        appendSeconds.innerHTML = seconds;
    }

    if (seconds > 60) {
        minutes++;
        appendMinutes.innerHTML = "0" + minutes;
        seconds = 0;
        appendSeconds.innerHTML = "0" + 0;
    }

    if (minutes > 9) {
        appendMinutes.innerHTML = minutes;
    }
}

/* hides style stage one and displays stage two*/
function stageTwoStyle() {
    document.getElementById("stage-one").classList.add("hidden");
    document.getElementById("stage-two").classList.remove("hidden");
}

/* hides style stage two and displays stage three*/
function stageThreeStyle() {
    document.getElementById("stage-two").classList.add("hidden");
    document.getElementById("stage-three").classList.remove("hidden");
    if (orderType === "clockwise") {
        document.getElementById("clockwise-instructions").classList.remove("hidden");
    }
}

/* hides style stage three and displays stage four*/
function stageFourStyle() {
    document.getElementById("stage-three").classList.add("hidden");
    document.getElementById("stage-four").classList.remove("hidden");
}

/* hides style stage four and displays stage five*/
function stageFiveStyle() {
    document.getElementById("stage-four").classList.add("hidden");
    document.getElementById("stage-five").classList.remove("hidden");
}

/* hides style stage five and displays stage six*/
function stageSixStyle() {
    document.getElementById("stage-five").classList.add("hidden");
    document.getElementsByTagName("h1")[0].classList.remove("white-heading");
    document.getElementById("stage-six").classList.remove("hidden");
}