//constructeur des points de vie (des Princes)

function Point(x, y, angle, v, diameter) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.v = v;
        this.radius = diameter ;
        this.color = 'darkred';

        this.draw = function (ctx) {
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
            this.color = 'darkred';
        };

}