# Turn Tracker

Turn Tracker is an online tool built to help users keep their board game night on track. It is designed to assist users in choosing a first player, establishing a turn order, and keeping track of whose turn it is at a given moment. Turn Tracker also has a stopwatch feature to encourage players to take their turns promptly, preventing board games from taking longer than they should to finish.

![am i responsive screenshot](/documentation/testing/am_i_responsive_test.png)

## User Stories

 - As a user i want to be able to use turn tracker to quickly and randomly select a first player, 
 - As a user I want turn tracker to function as a handy visual reference for whose turn it is, by utilising a player specific color scheme.
 - As a user I want to keep track of how much time players are spending on their turns, in order to encourage quick play.

## UX 

When considering the design of the site, it was decided to break the user experience into discrete stages, so as not to overwhelm the user, or give a false impression of the complexity of the tool. Stage 1 asks the user for the number of players, stage 2 asks for the turn-order “type” they wish to use, and stage 3 asks for players to enter their names and choose a color that will refer to them. Subsequent stages are “staged” so that the user does not need to scroll or navigate through the site while using the tool. This way, the device being used to display the site doesn’t need to be interacted with any further than pressing the buttons to start and end the game, as well as to pause/unpause, and end player turns. In removing unnecessary user interaction, the aim is to ensure that Turn Tracker is and aid to the game being played, and not a distraction 

### Colour Scheme

To ensure that the minimalist visual design of the site wasn’t boring, it was decided that a color other than white should be chosen as a background color. The default colors of the site, before any player colors are displayed, was inspired by the color scheme adopted by Airbnb. I knew from my experience with Airbnb that this shade was attractive to the eye. This pink-red shade was deemed suitable as it is visually distinct from the player color red, as well as because white text contrasts well with it as in the Airbnb scheme. 
Dev tools warned that color contrast was insufficient for readability, however this contradicted the experience of the developer, as well as that of “test-users” who vouched for its readability, both on Turn Tracker and Airbnb. This issue was further investigated using the color tool from material.io, and Juicy Studio's Luminosity Color Contrast Ratio Analyser. Both tools suggested that large bold text would make this color combination suitably legible. Screenshots of this testing process may be found in TESTING.md
The player colors were chosen to match the colors of the circle emojis from the dropdown menus. The text colors used when the background is set to the current player's color are black and white, used according to which offers better legibility.

### Typography 

Roboto slab (bold 700) was chosen to maximize legibility because of it’s line thickness All text used other than headings was increased to 14pt, which was the size recommended by Juicy Studio’s Luminosity Colour Contrast Ratio Analyser. H1 headings were increased to 26pt, and h3 headings to 19pt, in order to maintain a similar size ratio between text types.

### Wireframes 

![wireframe 1](/documentation/wireframes/turn_tracker_wireframe1.png)
![wireframe 2](/documentation/wireframes/turn_tracker_wireframe2.png)
![wireframe 3](/documentation/wireframes/turn_tracker_wireframe3.png)
![wireframe 4](/documentation/wireframes/turn_tracker_wireframe4.png)
![wireframe 5](/documentation/wireframes/turn_tracker_wireframe5.png)

## Features

### Existing Features

#### Stage 1

![Stage 1](/documentation/stage_1.png)

The Turn Tracker function can accommodate 2-9 players. This limit was set according to the number of color circle emojis available for use in the dropdown menu. This number is submitted via a form in stage 1 which will prevent the user from proceeding if a number outside of this range is entered.

#### Stage 2
![stage 2](/documentation/stage_2.png)

The second stage of the process involves players choosing whether they want the player order generated by Turn Tracker to be completely random, or whether it follows a clockwise order based on the current arrangement of the players, and beginning with a randomly selected first player. This stage ends when the user clicks one of these two buttons.

#### Stage 3

![stage 3](/documentation/stage_3.png)

In Stage 3, the players are presented with a form that asks for a name and player color to be selected for each player. The text inputs and color selection elements are grouped in pairs so that players can easily distinguish which inputs are associated with each other, and players will only be presented with as many of these pairs as the number they entered in the “number of players” input from stage 1, ensuring that no extra players can be accidentally added. This stage ends once the user clicks the “Generate turn order” button at the bottom of the form, which begins stage 4. Turn Tracker will only proceed to this next stage when the user/s have entered text into every “player name” input, and once a distinct color has been selected for each player, otherwise they will be prompted to do this once the “Generate turn order” button is clicked. If the user/s selected “clockwise” in stage 2, they will be instructed to enter their names in descending order through the form, as they appear in clockwise order around the table.

#### Stage 4

![stage 4](/documentation/stage_4.png)

In Stage 4 the user/s are presented with a randomly generated turn order based on their “order-type”  selection from stage 2. If random was selected, the Knuth-Fisher-Yates algorithm is used to shuffle the array of player detail dictionaries into a random order. If clockwise was selected, a random number integer between 0 (the first index of the array), and the final index of the player details array. This number is used to set the player with the corresponding index as the first player, whereupon any dictionaries with an index less than that of the first player are “sliced” from the array and reinserted at the end, thereby maintaining the clockwise order. This order is presented to the players in a cardinally numbered list i.e. “First Player: John, Second Player: Mary, … Nth player: Joe”. The users are also presented with a button which they are told will start the first player’s turn.

#### Stage 5

![stage 5](/documentation/stage_5_all_buttons.png)

Players' turns are dealt with in Stage 5, where the user/s will be presented with large text on a background that matches the current player’s player color. Alongside the background color, this text serves to remind the current player that it is their turn. Underneath this reminder, there is a stopwatch running that starts as soon as the current turn is initiated, whether by starting the game, or by ending the previous player’s turn. This stopwatch can be paused in the case that there are any breaks in the playing of the game that players agree shouldn’t count towards the current players turn-time. Clicking this button changes its text to read unpause, and upon a second press the game will be unpaused. 
If white is chosen as a player's color, on this player’s turns the white buttons in stage 5 will have red-pink borders that match the Turn Tracker default color. On other players’ turns this border will be removed so as not to clash with any of the other 8 background colors. 
Stage 5 also features a button to end the current player’s turn. Ending the current player's turn will record their current turn time recorded from their stopwatch, and added to their total.  Pressing the end turn button also immediately changes the color scheme to match that of the new current player, as well as resetting the stopwatch to 00:00 for the new player's turn. 
Upon pressing the end game button, the user/s will be asked to confirm that they are ending the game. This feature is designed to ensure that the user/s don't accidentally end the game when they are merely trying to end their own turn. The end game button has a double line border as well as underlined text to make it stand out from the other buttons for this same reason.

#### Stage 6

![stage 6](/documentation/stage_6.png)

Once the game is ended, stage 6 is initiated which presents the players with a list of the total time they took on their turns across the whole game. If the total time is more than 1 hour, they will be given another figure in minutes, to facilitate a quicker and more intuitive comparison with other players’ total-turn-times. 
The site’s header is a link to itself, which will refresh the page in case a user wishes to restart the process of setting up the tool.

### Features Left to Implement

A potential future feature is the Screen Wake Lock API. On battery powered devices, one issue with the site is that if players’ turns go on long enough, then the device’s “sleep” function will activate in order to save power. While this sleep function can generally be deactivated quite easily in a device’s settings, it would be preferable if the site could be easily used on such devices without necessitating any tinkering on the part of the user. The Screen Wake lock API offers a simple solution to this issue, in that it “prevents the screen from turning off, dimming or locking”. The unfortunate drawback of this API is that it is unsupported on both Firefox and Safari. If this incompatibility were to change in future, the Screen Wake Lock API would be a very useful addition to Turn Tracker.  

## Technologies Used 

The site was written in HTML, CSS and JavaScript. The IDE used was Gitpod, and Github pages was used for deployment. Wireframes were created using Marvel. Google Fonts was used to provide the “Roboto Slab” font for the project.

## Testing

### Code Validation

All HTML, CSS, and JavaScript code was validated without issue. See TESTING.md for screenshots. 

### Browser Compatibility

Turn Trackers’s browser compatibility was tested across Chrome, Edge and FireFox. It was found to be compatible with all three browsers. Compatibility was tested alongside responsiveness. Screenshots may be found in TESTING.md. 

### Responsiveness

Turn Tracker’s responsiveness was tested across a variety of screen sizes, and was found to perform without issues across all sizes tested. Responsiveness was tested alongside browser compatibility. Screenshots may be viewed in TESTING.md

### Unfixed Bugs

There are no known unfixed bugs

## Deployment

The site was deployed to GitHub pages. The steps to deploy are as follows: * In the GitHub repository, navigate to the Settings tab. * From the Settings tab, scroll down until you see the 'Pages' button on the left. * From the Source section drop-down menu, select the Main branch. * Once the Main branch has been selected, the page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment.

The live link can be found here - https://cillian-g.github.io/Turn_Tracker/

### Local Deployment

To make a local copy of this project, you can clone it by typing the following in your IDE terminal:

git clone - https://Cillian-G.github.io/Turn_Tracker.git  

Alternatively, if using Gitpod, you can click the green Gitpod button, or use this link
https://gitpod.io/#https://github.com/Cillian-G/daragh_goan_portfolio

## Credits

 - The legibility of the site's color scheme was investigated using Juicy Studio’s Luminosity Colour Contrast Ratio Analyser, and material.io’s Color Tool. https://juicystudio.com/services/luminositycontrastratio.php https://material.io/resources/color/
 - Random turn order generation was achieved through use of Knuth-Fisher-Yates shuffle algorithm https://blog.codinghorror.com/the-danger-of-naivete/
 - Stopwatch functionality was based on a codepen creation by Cathy Dutton. https://codepen.io/cathydutton/pen/GBcvo

### Media

 - Sand Timer icon from icons-for-free.com https://icons-for-free.com/clock+sand+time+icon-1320168051171757895/

### Acknowledgements
 - This README is baed on a template from CodeInsititute 
