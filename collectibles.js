const collectiblesArray = [];

const collectibleSprite = new Image();
collectibleSprite.src = "./collectible_pineapple_sprite.png";

// Collectible class.
class Collectible{
    constructor(){
        this.x = canvas.width;
        this.y = canvas.height / 2 * Math.random() + 10;
        this.originalWidth = 512;
        this.originalHeight = 128;
        this.width = this.originalWidth / 4;
        this.height = this.originalHeight;
        this.frameX = 0;
    }
    // Draw collectible.
    draw(){
        ctx.drawImage(collectibleSprite,  this.frameX * this.originalWidth / 4, 0, this.originalWidth / 4, this.originalHeight, this.x, this.y, this.width, this.height); // Character item.
    } 
    // Function to update collectible.
    update(){
        // Move collectibe from the right edge of canvas towards left edge.
        this.x -= gamespeed;

        // Draw new collectible on update -> generates collectibles.
        this.draw();

        // Handle character animation.
        if(this.frameX >= 4){
            this.frameX = 0;
        }
        else if(frames%50 === 0){
            this.frameX++;
        }
    }
}

// Function to handle collectibles generation.
function handleCollectibles(){
    // New collectible on every second frame.
    if(frames%50 === 0){
        collectiblesArray.unshift(new Collectible);
    }

    // Update collectibles.
    for(let i = 0; i < collectiblesArray.length; i++){
        collectiblesArray[i].update();

        // Remove collectible if going off screen.
        if(collectiblesArray[i].x <= -canvas.width){
            collectiblesArray.pop(collectiblesArray[i]);
        }
    }
}