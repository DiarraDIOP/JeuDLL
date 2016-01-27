   // We can add the other collision functions seen in the
   // course here...
   
   // Collisions between rectangle and circle
    function circRectsOverlap(x0, y0, w0, h0, cx, cy, r) {
        var testX = cx;
        var testY = cy;

        if (testX < x0)
            testX = x0;
        if (testX > (x0 + w0))
            testX = (x0 + w0);
        if (testY < y0)
            testY = y0;
        if (testY > (y0 + h0))
            testY = (y0 + h0);

        return (((cx - testX) * (cx - testX) + (cy - testY) * (cy - testY)) < r * r);
    }

    // Collisions between walls and ball
    function testCollisionWithWalls(ball, w, h) {

        // left
        if (ball.x < ball.radius) {
            ball.x = ball.radius;
            ball.angle = -ball.angle + Math.PI;
        }
        // right
        if (ball.x > w - (ball.radius)) {
            ball.x = w - (ball.radius);
            ball.angle = -ball.angle + Math.PI;
        }
        // up
        if (ball.y < ball.radius) {
            ball.y = ball.radius;
            ball.angle = -ball.angle;
        }
        // down
        if (ball.y > h - (ball.radius)) {
            ball.y = h - (ball.radius);
            ball.angle = -ball.angle;
        }
    }
	
	 // Collisions between aligned rectangles
    function rectsOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
      
      if ((x1 > (x2 + w2)) || ((x1 + w1) < x2))
        return false; // No horizontal axis projection overlap
      if ((y1 > (y2 + h2)) || ((y1 + h1) < y2))
        return false; // No vertical axis projection overlap
		
      return true;    // If previous tests failed, then both axis projections
                      // overlap and the rectangles intersect
    }

	// Collisions between wall and obstacle
	function testCollisionObstacleMur(obstacle, canvas) {
		if((obstacle.y + obstacle.h) > canvas.height) {
			obstacle.y = canvas.height-obstacle.h;
			obstacle.speedY = - obstacle.speedY;
		}
		if(obstacle.y < 0 )  {
			obstacle.y = 0;
			obstacle.speedY = - obstacle.speedY;
		}
		if((obstacle.x + obstacle.w) > canvas.width) {
			  obstacle.x = canvas.width -obstacle.w;
			obstacle.speedX = - obstacle.speedX;
		} 
		if(obstacle.x < 0) {
			obstacle.x = 0;
			obstacle.speedX = - obstacle.speedX;
		}
  }
  
  // Collisions between prince and wall
  	function testCollisionPrinceMur(prince, canvas) {
		if((prince.y + prince.height) > canvas.height) {
			prince.y = canvas.height-prince.height;
		}
		if(prince.y < 0 )  {
			prince.y = 0;
		}
		if((prince.x + prince.width) > canvas.width) {
			  prince.x = canvas.width -prince.width;
		} 
		if(prince.x < 0) {
			prince.x = 0;
	}
  }
  
  