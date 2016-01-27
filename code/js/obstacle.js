//by BACHARA - DIOP

// constructor function for obstacles
//https://openclassrooms.com/courses/dynamisez-vos-sites-web-avec-javascript/l-element-canvas

    function Obstacle(x, y, w, h, sx, sy, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speedX = sx;
        this.speedY = sy;
        this.color=color;

        this.draw = function (ctx) {
            ctx.save();
            ctx.beginPath();
            /*ctx.strokeStyle=this.color;
            ctx.lineCap = 'round';
            ctx.lineWidth="25";
            ctx.moveTo(this.x, this.y);
            if(this.w > this.h)
                ctx.lineTo(this.x + this.w  , this.y);
            else
                ctx.lineTo(this.x , this.y + this.h);
            ctx.stroke();*/

            var image = new Image();
            image.src = './img/obstacle.jpg'; 
            ctx.drawImage(image,this.x,this.y,this.w,this.h);
            ctx.fill(); 

            ctx.restore();  
        };

        this.move = function (delta) {
            // add horizontal increment to the x pos
            // add vertical increment to the y pos

            this.x += calcDistanceToMove(delta, this.speedX);
            this.y += calcDistanceToMove(delta, this.speedY);
        };
    }