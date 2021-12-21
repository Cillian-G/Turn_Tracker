/* jshint esversion: 8 */

/**
 * BUTTON NAME REFERENCE LIST
 * start-button clockwise-selection, random-selection, 
 * generate-player-order, start-game, pause-turn, end-turn, end-game
 * **/



document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("number-selection-form").addEventListener("submit", numberSubmit);


    /**
     * The button on the welcome page that hides the welcome/explanation text
     *  and presents players with order selection buttons. Currently holding placeholder javascript
     */

    // document.getElementById("start-button").addEventListener("click", function(){
    //     console.log("")
    // }) REMOVE THIS CODE

    /*The button that gives the text content "random" to a hidden HTML element*/

    document.getElementById("random-button").addEventListener("click", function () {
        orderType = "random";
        stageThreeStyle();
    });

    /*The button that gives the text content "clockwise" to a hidden HTML element */

    document.getElementById("clockwise-button").addEventListener("click", function () {
        orderType = "clockwise";
        stageThreeStyle();
    });

    document.getElementById("player-details-form").addEventListener("submit", generatePlayerOrder);

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
let totalGameTime = 0;
let groupTotalTally

function numberSubmit(event) {
    event.preventDefault();

    numberOfPlayers = document.getElementById("number-selection-form").elements.number.value;
    // document.getElementById("number-of-players").textContent = numberOfPlayers;

    let nameAndColor = "";

    for (let i = 0; i < numberOfPlayers; i++) {
        let playerNumber = i + 1;
        nameAndColor += `
            <div class="form-padding">
                <label for="name${[i]}"></label>        
                <input type="text" name="name" id="name${[i]}" placeholder="Player ${playerNumber} name" required>
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

function generatePlayerOrder(event) {
    event.preventDefault();
    console.log("generateplayerorder");

    console.log(numberOfPlayers);
    console.log(playerDetails);


    let colorSelection = [];

    for (let i = 0; i < numberOfPlayers; i++) {
        colorSelection.push(document.getElementById("player-details-form").elements[`colors-id${[i]}`].value);
    }

    if (hasDuplicates(colorSelection)) {
        alert("Each player must have a unique color");
    } else {
        playerDetails = []; /* this allows for easier testing, prevents playerDetails from repeatedly adding details */
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
        console.log(playerDetails);

        if (orderType === "random") {
            shuffle(playerDetails);
            console.log(orderedPlayerDetails);

        } else if (orderType === "clockwise") {
            let randomNumberRange = playerDetails.length;
            let firstPlayerIndex = Math.floor(Math.random() * randomNumberRange);
            if (firstPlayerIndex === 0) {
                console.log("its just a coincidence!!");
                console.log(playerDetails);
                orderedPlayerDetails = playerDetails;
            } else {
                let playerDetailsSlice = playerDetails.slice(0, firstPlayerIndex);
                console.log(playerDetailsSlice);
                playerDetails.splice(0, firstPlayerIndex);
                console.log(playerDetails);
                console.log(playerDetailsSlice);
                orderedPlayerDetails = playerDetails.concat(playerDetailsSlice);
                console.log(orderedPlayerDetails);
            }

        } else {
            alert("You havent chosen a invalid order type, please refresh to start again");
        }
        stageFourStyle();

        buildOrderList(orderedPlayerDetails);
    }
}


function hasDuplicates(colorSelection) {
    return (new Set(colorSelection)).size !== colorSelection.length;
}

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

function buildOrderList(orderedPlayerDetails) {
    console.log(orderedPlayerDetails);
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

// this function will commence the first players turn
function startTurn() {
    document.getElementById("start-game").setAttribute("disabled", "");
    if (orderedPlayerDetails[roundTracker].Name.endsWith("s")) {
        document.getElementById("current-player").innerHTML = `${orderedPlayerDetails[roundTracker].Name}'`;

    } else {
        document.getElementById("current-player").innerHTML = `${orderedPlayerDetails[roundTracker].Name}'s`;
    }
    startStopwatch();
    console.log(orderedPlayerDetails);
    stageFiveStyle();
    document.getElementsByTagName("body")[0].setAttribute("class", `${orderedPlayerDetails[roundTracker].Color}`);
    let whiteCheck = orderedPlayerDetails[roundTracker].Color;
    if (whiteCheck === "white") {
        document.getElementsByClassName("game-button")[0].classList.add("white-button")
        document.getElementsByClassName("game-button")[1].classList.add("white-button")
        document.getElementsByClassName("game-button")[2].classList.add("white-button")
    } else {
        document.getElementsByClassName("game-button")[0].classList.remove("white-button")
        document.getElementsByClassName("game-button")[1].classList.remove("white-button")
        document.getElementsByClassName("game-button")[2].classList.remove("white-button")
    }
    console.log(whiteCheck);
    console.log(orderedPlayerDetails[roundTracker].Color);
}

// this function will effectively just pause the stopwatch on the current players turn
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

// this function will end a players turn, and call the startTurn function to start the next player's turn
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
    console.log(orderedPlayerDetails);
}

// this function will end the game and present the user with each players total "turn-time"
function endGame() {
    endTurn();
    console.log("end game");
    document.getElementsByTagName("body")[0].removeAttribute("class");
    stageSixStyle();
    showResults();
}

function showResults() {
    let results = "";

    for (let i = 0; i < orderedPlayerDetails.length; i++) {
        let secondsTally = orderedPlayerDetails[i].seconds;
        let secondsResult = secondsTally % 60;
        let secondsToMinutes = Math.floor(secondsTally / 60);
        let minutesTally = orderedPlayerDetails[i].minutes + secondsToMinutes;
        let minutesResult = minutesTally % 60;
        let minutesToHours = Math.floor(minutesTally / 60);
        groupTotalTally += minutesTally;

        // minutesTally 
        if (minutesTally === 0) {
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
                minutesResult = `${minutesResult} minute, `;
            } else {
                minutesResult = `${minutesResult} minutes, `;
            }
        }
        // secondsResult
        if (secondsResult === 0) {
            secondsResult = ".";
        } else {
            if (secondsResult === 1) {
                secondsResult = `${secondsResult} second.`;
            } else {
                secondsResult = `${secondsResult} seconds.`;
            }
        }

        console.log(orderedPlayerDetails[i].Color);
        results += `<p>
                        ${orderedPlayerDetails[i].Name} took
                        ${minutesToHours} ${minutesResult}${secondsResult}
                        ${minutesTally}
                    </p>`;
    }
    console.log(groupTotalTally);
    let groupHours = Math.floor(groupTotalTally / 60);
    let groupMinutes = groupTotalTally % 60;

    // if (groupHours === 0) {
    //     groupHours = "";
    // } else {
    //     if (groupHours === 1) {
    //         groupHours = `${groupHours} hour`;
    //     } else {
    //         groupHours = `${groupHours} seconds. `;
    //     }
    // }

    document.getElementById("results").innerHTML = results;
}

// starts stopwatch and sets interval to one second 
function startStopwatch() {
    clearInterval(Interval);
    Interval = setInterval(runStopwatch, 1000);
}

// clear interval and stops stopwatch
function stopStopwatch() {
    clearInterval(Interval);
    stopped = true;
}

function resetStopwatch() {
    clearInterval(Interval);
    seconds = "00";
    minutes = "00";
    appendSeconds.innerHTML = seconds;
    appendMinutes.innerHTML = minutes;
}

function runStopwatch() {
    seconds++;

    if (seconds <= 9) {
        appendSeconds.innerHTML = "0" + seconds;
    }

    if (seconds > 9) {
        appendSeconds.innerHTML = seconds;

    }


    if (seconds > 60) {
        console.log("minutes");
        minutes++;
        appendMinutes.innerHTML = "0" + minutes;
        seconds = 0;
        appendSeconds.innerHTML = "0" + 0;
    }

    if (minutes > 9) {
        appendMinutes.innerHTML = minutes;
    }
}

//These functions hide and display each "stage" of the site as they are required
function stageTwoStyle() {
    document.getElementById("stage-one").classList.add("hidden");
    document.getElementById("stage-two").classList.remove("hidden");
}

function stageThreeStyle() {
    document.getElementById("stage-two").classList.add("hidden");
    document.getElementById("stage-three").classList.remove("hidden");
}

function stageFourStyle() {
    document.getElementById("stage-three").classList.add("hidden");
    document.getElementById("stage-four").classList.remove("hidden");
}

function stageFiveStyle() {
    document.getElementById("stage-four").classList.add("hidden");
    document.getElementById("stage-five").classList.remove("hidden");
}

function stageSixStyle() {
    document.getElementById("stage-five").classList.add("hidden");
    document.getElementById("stage-six").classList.remove("hidden");
}