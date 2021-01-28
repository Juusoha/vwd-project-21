// Variables for mouse tracking.
let drawflag = false;
let prevXCoord, prevYCoord, currXCoord, currYCoord = 0;

// Timeout variable for debouncing events.
let timeout;

// Hue.
let hue = 0;

// Game based variables.
let frames = 0;
let score = 0;
let gamespeed = 2;


// Get the Canvas element and the 2D context for rendering.
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;

// Number of particles drawn at a time.
let numberOfparticles = (canvas.width * canvas.height) / 500;

let spacePressed = false;

// Add evenlisteners to canvas.
canvas.addEventListener("mousemove", function(e){
    findMouseCoordinates("move", e)
    // If there's a timer, cancel it
    if (timeout) {
        window.cancelAnimationFrame(timeout);
    }

    // Setup the new requestAnimationFrame()
    timeout = window.requestAnimationFrame(function () {
        // Run our scroll functions
        console.log( 'debounced' );
    });
});
canvas.addEventListener("mousedown", function(e){
    findMouseCoordinates("down", e)
    // If there's a timer, cancel it
    if (timeout) {
        window.cancelAnimationFrame(timeout);
    }

    // Setup the new requestAnimationFrame()
    timeout = window.requestAnimationFrame(function () {
        // Run our scroll functions
        console.log( 'debounced' );
    });
});
canvas.addEventListener("mouseup", function(e){
    findMouseCoordinates("up", e)
    // If there's a timer, cancel it
    if (timeout) {
        window.cancelAnimationFrame(timeout);
    }

    // Setup the new requestAnimationFrame()
    timeout = window.requestAnimationFrame(function () {
        // Run our scroll functions
        console.log( 'debounced' );
    });
});
canvas.addEventListener("mouseout", function(e){
    findMouseCoordinates("out", e)
    // If there's a timer, cancel it
    if (timeout) {
        window.cancelAnimationFrame(timeout);
    }

    // Setup the new requestAnimationFrame()
    timeout = window.requestAnimationFrame(function () {
        // Run our scroll functions
        console.log( 'debounced' );
    });
});

// Background for game.
const background = new Image();
background.src = "./game_background.png";
const BackGround = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}

// Function to handle background draw.
function handleBackGround(){
    if(BackGround.x1 <= -BackGround.width + gamespeed){
        BackGround.x1 = BackGround.width;
    }
    else{
        BackGround.x1 -= gamespeed;
    }
    if(BackGround.x2 <= -BackGround.width + gamespeed){
        BackGround.x2 = BackGround.width;
    }
    else{
        BackGround.x2 -= gamespeed;
    }
    ctx.drawImage(background, BackGround.x1, BackGround.y, BackGround.width, BackGround.height);
    ctx.drawImage(background, BackGround.x2, BackGround.y, BackGround.width, BackGround.height);
    ctx.font = "25px Sans";
    ctx.fillStyle = "white";
    ctx.strokeText(score, 450, 70);
    ctx.fillText(score, 450, 70);
}

// Main function for animating game scene.
function animate(){

    // Clear canvas.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background.
    handleBackGround();

    // Draw character model and update it.
    character.draw();
    character.update();

    // Call new particle initialization for character effect and drawing.
    handleParticlesCharacter();
    handleParticlesDraw();

    // Handle collectibles generation.
    handleCollectibles();

    // Handle collisions.
    handleCollisions();

    // Add hue for nice rainbow color effect on draw.
    hue+=2;

    // Add frame.
    frames++;

    // Request new animation frame and call recursively.
    window.requestAnimationFrame(animate);
    
}

// Function to find current mouse coordinates and do actions based on the mouse event.
function findMouseCoordinates(response, e) {

    // Mousedown event.
    if (response == 'down') {
        prevXCoord = currXCoord;
        prevYCoord = currYCoord;
        currXCoord = e.clientX - canvas.getBoundingClientRect().left;
        currYCoord = e.clientY - canvas.getBoundingClientRect().top;
        drawflag = true;        
    }

    // Mouseup or Mouseout event.
    if (response == 'up' || response == "out") {
        drawflag = false;
    }

    // Mousemove event.
    if (response == 'move') {
        console.log(e.clientX, e.clientY);
        // If draw flag is set, allow drawing.
        if (drawflag) {
            prevXCoord = currXCoord;
            prevYCoord = currYCoord;
            currXCoord = e.clientX - canvas.getBoundingClientRect().left;
            currYCoord = e.clientY - canvas.getBoundingClientRect().top;
            moveCharacter();
        }
    }
}

// Function to move character.
function moveCharacter(){
    character.x = currXCoord - character.width;
    character.y = currYCoord - character.height;
}

// Create collision effect.
const collisionSprite = new Image();
collisionSprite.src = "";

// Function for collision detection with collectibles.
function handleCollisions(){
    // For each drawn collectible.
    for(let i = 0; i < collectiblesArray.length; i++){  
        if(collectiblesArray[i].x < character.x + character.width && 
            collectiblesArray[i].x + collectiblesArray[i].width > character.x &&
            collectiblesArray[i].y < character.y + character.height &&
            collectiblesArray[i].y + collectiblesArray[i].height > character.y){
            // Collision.
            //ctx.drawImage(collisionSprite, character.x, character.y, 50,50);
            collectiblesArray.pop(collectiblesArray[i]);
            score++;
            return true;
        }
    }
}
