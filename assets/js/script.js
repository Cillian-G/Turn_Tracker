/* jshint esversion: 8 */

/**
 * BUTTON NAME REFERENCE LIST
 * start-button clockwise-selection, random-selection, 
 * generate-player-order, start-game, pause-turn, end-turn, end-game
 * **/



document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("number-selection-form").addEventListener("submit", numberSubmit)

    /**
     * The button on the welcome page that hides the welcome/explanation text
     *  and presents players with order selection buttons. Currently holding placeholder javascript
     */
    document.getElementById("start-button").addEventListener("click", function(){
        console.log("")
    })

    /*The button that gives the text content "random" to a hidden HTML element*/

    document.getElementById("random-button").addEventListener("click", function(){
        document.getElementById("selected-order").innerHTML = "random";
        orderType = "random";

    })

    /*The button that gives the text content "clockwise" to a hidden HTML element */
     
    document.getElementById("clockwise-button").addEventListener("click", function(){
        document.getElementById("selected-order").innerHTML = "clockwise";
        orderType = "clockwise"
    })
    
    document.getElementById("player-details-form").addEventListener("submit", generatePlayerOrder);
})

let numberOfPlayers = 0;
let orderType = ""; 
let playerDetails = new Array
let orderedPlayerDetails = new Array
console.log(playerDetails)

function numberSubmit(event) {
    event.preventDefault();

    numberOfPlayers = document.getElementById("number-selection-form").elements['number'].value;
    document.getElementById("number-of-players").textContent = numberOfPlayers;

    let nameAndColor = "";

    for(i = 0; i < numberOfPlayers; i++) {
        nameAndColor += `
            <label for="name${[i]}"></label>        
            <input type="text" name="name" id="name${[i]}" required>
            <label for id="colors${[i]}">Player color</label>
            <select name="color" id="colors-id${[i]}" required>
                <option value="" disabled selected>Choose color</option>
                <option value="orange">🟠Orange</option>
                <option value="purple">🟣Purple</option>
                <option value="black">⚫Black</option>
                <option value="blue">🔵Blue</option>
                <option value="yellow">🟡Yellow</option>
                <option value="brown">🟤Brown</option>
                <option value="white">⚪White</option>
                <option value="green">🟢Green</option>
                <option value="red">🔴Red</option>
            </select>
            <br>`; 
    }
    document.getElementById("player-details-div").innerHTML = nameAndColor;
}

function generatePlayerOrder(event) {
    event.preventDefault();
    console.log("generateplayerorder");

    console.log(numberOfPlayers);
    console.log(playerDetails);


    
    let colorSelection = new Array;
    
    for (i = 0; i < numberOfPlayers; i++) {
       colorSelection.push(document.getElementById("player-details-form").elements[`colors-id${[i]}`].value)
    }


    if (hasDuplicates(colorSelection)) {
        alert ("Each player must have a unique color");
    } else { 
        playerDetails = [] /* this allows for easier testing, prevents playerDetails from repeatedly adding details */
        for (i=0; i < numberOfPlayers; i++) {
            let playerName = "";
            let playerColor = "";
            let player = {};
            playerName = document.getElementById("player-details-form").elements[`name${[i]}`].value;
            playerColor = document.getElementById("player-details-form").elements[`colors-id${[i]}`].value;
            player =  { Name: playerName , Color:playerColor , Time: 0 };
            playerDetails.push(player);
        }
        console.log(playerDetails)

        if (orderType === "random") {
            shuffle(playerDetails);
            console.log(orderedPlayerDetails);

        } else if (orderType === "clockwise") {
            let randomNumberRange = playerDetails.length;
            let firstPlayerIndex = Math.floor(Math.random() * randomNumberRange);
                if (firstPlayerIndex === 0) {
                    console.log("its just a coincidence!!");
                    console.log(playerDetails);
                } else {
                    let playerDetailsSlice = playerDetails.slice(0, firstPlayerIndex);
                    console.log(playerDetailsSlice);
                    playerDetails.splice(0, firstPlayerIndex);
                    console.log(playerDetails);
                    console.log(playerDetailsSlice)
                    orderedPlayerDetails = playerDetails.concat(playerDetailsSlice);
                    console.log(orderedPlayerDetails)
                }

        } else { 
            alert("You havent chosen a invalid order type, please refresh to start again")
        }
        buildOrderList(orderedPlayerDetails)
    }
}


function hasDuplicates(colorSelection) {
    return (new Set(colorSelection)).size !== colorSelection.length;
}

function shuffle(playerDetails) {
    let m = playerDetails.length, t, i;

    while (m) {
        i = Math.floor(Math.random() * m--);
        t = playerDetails[m];
        playerDetails[m] = playerDetails[i]
        playerDetails[i] = t;
    }
    orderedPlayerDetails = playerDetails
    return orderedPlayerDetails;
}

function buildOrderList(orderedPlayerDetails) {
    console.log(orderedPlayerDetails)
    let players = ""
    let orderList = document.getElementById("turn-order")
    let cardinalArray = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth"]
    //my object keys are capitalised i.e. "Name", should they be?
    for(i = 0; i < orderedPlayerDetails.length; i++) {
        players += `
                    <div id="${orderedPlayerDetails[i].Color}">
                           <p>${cardinalArray[i]} player: ${orderedPlayerDetails[i].Name}</p>
                    </div>`
    }
    orderList.innerHTML = players;
}

function startGame(){
    console.log("start game")
}

function pauseGame(){
    console.log("start game")
}

function endTurn(){
    console.log("start game")
}

function endGame(){
    console.log("start game")
}