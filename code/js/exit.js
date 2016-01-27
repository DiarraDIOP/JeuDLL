// constructor function for exit
    function Princesse(y) {
        this.y = y;
        this.x = 740;
        this.width=40;
        this.height=55;
        this.draw = function (ctx) {
            ctx.save();
            ctx.beginPath();

			var image = new Image();
			image.src = './img/princesse1.png';
			ctx.drawImage(image,this.x,this.y,this.width,this.height);
            ctx.fill();			
            ctx.restore();
        };     
    }

	
	