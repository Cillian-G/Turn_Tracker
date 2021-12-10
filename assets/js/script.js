/**
 * continue-button clockwise-selection, random-selection, 
 * generate-player-order, start-game, pause-turn, end-turn, end-game
 * **/

document.addEventListener("DOMContentLoaded", function(){
    console.log("Hello world")
    let nameAndColor = "";

    for(i = 0; i < 9; i++) {
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

    /**
     * The button on the welcome page that hides the welcome/explanation text
     *  and presents players with order selection buttons. currently holding placeholder javascript
     */
    document.getElementById("continue-button").addEventListener("click", function(){
        console.log("")
    })

    document.getElementById("random")
})