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
    })

    /*The button that gives the text content "clockwise" to a hidden HTML element */
     
    document.getElementById("clockwise-button").addEventListener("click", function(){
        document.getElementById("selected-order").innerHTML = "clockwise";
    })
    
    document.getElementById("player-details-form").addEventListener("submit", generatePlayerOrder);
})

let numberOfPlayers = 0;

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
    //let numberOfPlayers = document.getElementById("number-of-players").textContent.parseInt;
    console.log(numberOfPlayers)
    let playerDetails = new Array(numberOfPlayers.value);
    console.log(playerDetails);

}

// [ {name: , color: , time: } {name: , color: , time: } {name: , color: , time: }]