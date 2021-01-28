const catSprite = new Image();
catSprite.src = "./cat_character_sprite.png";

// Character class.
class Character{
    constructor(){
        this.x = 200;
        this.y = 800;
        this.velosityX = 0;
        this.velosityY = 0;
        this.originalWidth = 1152;
        this.originalHeight = 128;
        this.width = this.originalWidth / 9;
        this.height = this.originalHeight;
        this.weigth = 1;
        this.speed = 1;
        this.frameX = 0;
    }
    // Draw character.
    draw(){       
        ctx.drawImage(catSprite,  this.frameX * this.originalWidth / 9, 0, this.originalWidth / 9, this.originalHeight, this.x, this.y, this.width, this.height); // Character item.
    }
    // Function to update character.
    update(){

        // If moving out of canvas on Y-axis.
        if(this.y > canvas.height){
            this.y = canvas.height - (this.height * 3) ;
            this.velosityY = 0;
        }
        // Else increase weigth.
        else{
            this.velosityY += this.weigth;
        }

        // If moving out of canvas on X-axis.
        if(this.x > canvas.width){
            this.x = canvas.width  - (this.width  * 3) + curve;
            this.velosityX = 0;
        }
        // Else increase speed.
        else{
            this.velosityX += this.speed;
        }

        // Handle character not to go beyond canvas limits in Y-axis.
        if(this.y < 0 + this.height){
            this.y = 0 + this.height;
            this.velosityY = 0;
        }

        // Handle character not to go beyond canvas limits in X-axis.
        if(this.x < 0 + this.width){
            this.x = 0 + this.width;
            this.velosityX = 0;
        }

        // Handle character animation.
        if(this.frameX >= 9){
            this.frameX = 0;
        }
        else{
            this.frameX++;
        }
    }
}

// Create constant of character.
const character = new Character();
