/**
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

    /**
     * The button that gives the text content "random" to a hidden HTML element
     *  before hiding this section of HTML and presenting the user with the player details form
     */
    document.getElementById("random-button").addEventListener("click", function(){
        document.getElementById("selected-order").innerHTML = "random";
    })

    /**
     * The button that gives the text content "clockwise" to a hidden HTML element
     * before hiding this section of HTML and presenting the user with the player details form
     */
    document.getElementById("clockwise-button").addEventListener("click", function(){
        document.getElementById("selected-order").innerHTML = "clockwise";
    })
    
    document.getElementById("generate-player-order").addEventListener("click", generatePlayerOrder())
})


function numberSubmit(event) {
    event.preventDefault();

    let numberOfPlayers = document.getElementById("number-selection-form").elements['number'].value;
    console.log(numberOfPlayers)

    let nameAndColor = "";

    for(i = 0; i < numberOfPlayers; i++) {
        nameAndColor += `<div>
                <label for="name${[i]}"></label>        
                <input type="text" name="name" id="name${[i]}" required>
                <label for id="colors${[i]}">Player color</label>
            <select name="color" id="colors${[i]}">
                <option value="orange">Orange🟠</option>
                <option value="purple">Purple🟣</option>
                <option value="black">Black⚫</option>
                <option value="blue">Blue🔵</option>
                <option value="yellow">Yellow🟡</option>
                <option value="brown">Brown🟤</option>
                <option value="white">White⚪</option>
                <option value="green">Green🟢</option>
                <option value="red">Red🔴</option>
            </select>
        </div>`; 
    }
    console.log(nameAndColor)
    document.getElementById("player-details-form").innerHTML = nameAndColor

}

function generatePlayerOrder() {
    console.log("generatePlayerOrder")
}