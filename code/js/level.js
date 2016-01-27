//by BACHARA - DIOP


	function createBalls(nbBalls, ballArray, prince2, prince, canvas){		
		for (var i = 0; i < nbBalls; i++) {
			// Create a ball with random position and speed. 
			// You can change the radius
			var ball = new Ball(canvas.width * Math.random(),
				canvas.height * Math.random(),
				(2 * Math.PI) * Math.random(),
				(80 * Math.random()),
				30);
			// Do not create a ball on the player. We augmented the ball radius 
			// to sure the ball is created far from the monster. 
			if (!circRectsOverlap(prince2.x, prince2.y,
				prince2.width, prince2.height,
				ball.x, ball.y, ball.radius * 3) && 
				!circRectsOverlap(prince.x, prince.y,
				prince.width, prince.height,
				ball.x, ball.y, ball.radius * 3)) {
				// Add it to the array
				ballArray[i] = ball;
			} else {
				i--;
			}
		}
	}
	
	function createPoints(nbpoint, points, prince2, prince, canvas){		
		for (var i = 0; i < nbpoint; i++) {
			// Create a ball with random position and speed. 
			// You can change the radius
			var point = new Point(canvas.width * Math.random(),
				canvas.height * Math.random(),25, 0, 2 * Math.PI);
			// Do not create a ball on the player. We augmented the ball radius 
			// to sure the ball is created far from the monster. 
			if (!circRectsOverlap(prince2.x, prince2.y,
				prince2.width, prince2.height,
				point.x, point.y, point.radius * 3) && 
				!circRectsOverlap(prince.x, prince.y,
				prince.width, prince.height,
				point.x, point.y, point.radius * 3)) {
				// Add it to the array
				points[i] = point;
			} else {
				i--;
			}
		}
	}

//Creation of levels
function Level(x, exit, obstacles, ballArray,points, canvas, prince2,prince){
	var y = Math.floor(Math.random() * canvas.height) + 1;
	if(y+exit.height>canvas.height){
		exit.y = y-exit.height;
	}else{
		exit.y=y;
	}
	//All levels of game
	//Chaque niveau avec ses obtacles, ses points et son fond personnnalisé
	switch (x){
            case 1:
				exit.y = 250;
				exit.color = "yellow";	
				var obstacle1 = new Obstacle(500, 400, 15, 200, 0, 0, "SaddleBrown");
				obstacles.push(obstacle1);

				var obstacle2 = new Obstacle(200, 0, 15, 200, 0, 0, "SaddleBrown");
				obstacles.push(obstacle2);			
				createPoints(5, points, prince2,prince, canvas);
				document.getElementById("myCanvas").style.backgroundImage = "url('./img/fond1.jpg')";
				
				break;

            case 2:
				// x, y, hauteur, largeur, vitesses    
				var obstacle1 = new Obstacle(500, 400, 15, 200, 0, 0, "Bisque");
				obstacles.push(obstacle1);

				var obstacle2 = new Obstacle(200, 0, 15, 200, 0, 0, "Bisque");
				obstacles.push(obstacle2);

				var obstacle3 = new Obstacle(350, 150, 15, 200, 0, 0, "Bisque");
				obstacles.push(obstacle3);

				var obstacle4 = new Obstacle(650, 0, 15, 200, 0, 0, "Bisque");
				obstacles.push(obstacle4);
				createPoints(5, points, prince2,prince, canvas);
				document.getElementById("myCanvas").style.backgroundImage = "url('./img/fond2.jpg')";

            break;

            case 3:
				var obstacle1 = new Obstacle(100, 0, 15, 100, 50, 10, "Silver");
				obstacles.push(obstacle1);
		
				var obstacle2 = new Obstacle(400, 400, 15, 400, 0, 50, "Silver");
				obstacles.push(obstacle2);

				var obstacle3 = new Obstacle(200, 0, 15, 200, 0, 0, "Silver");
				obstacles.push(obstacle3);

				var obstacle4 = new Obstacle(0, 300, 200, 15, 0, 0, "Silver");
				obstacles.push(obstacle4);

				var obstacle5 = new Obstacle(600, 150, 15, 200, 0, 0, "Silver");
				obstacles.push(obstacle5);
				nbBalls = 2;
				createBalls(nbBalls, ballArray, prince2,prince, canvas);
				createPoints(7, points, prince2,prince, canvas);
				document.getElementById("myCanvas").style.backgroundImage = "url('./img/fond3.jpg')";
			
            break;

            case 4:
				//celui qui bouge + augmentation vitesse
				var obstacle1 = new Obstacle(100, 0, 15, 100, 150, 50, "Black");
				obstacles.push(obstacle1);
		
				var obstacle2 = new Obstacle(300, 150, 15, 350, 0, 50, "Black");
				obstacles.push(obstacle2);
				
				var obstacle3 = new Obstacle(150, 0, 15, 200, 0, 0, "Black");
				obstacles.push(obstacle3);
				
				var obstacle4 = new Obstacle(600, 400, 15, 400, 0, 50, "Black");
				obstacles.push(obstacle4);
				
				var obstacle5 = new Obstacle(450, 0, 15, 200, 0, 0, "Black");
				obstacles.push(obstacle5);
				nbBalls = 2;
				createBalls(nbBalls, ballArray, prince2,prince, canvas);
				createPoints(7, points, prince2,prince, canvas);
				document.getElementById("myCanvas").style.backgroundImage = "url('./img/fond4.jpg')";

            break;

            case 5:
				var obstacle6 = new Obstacle(100, 0, 15, 100, 50, 10, "Khaki");
				obstacles.push(obstacle6);
		
				var obstacle1 = new Obstacle(100, 0, 15, 100, 50, 10, "Khaki");
				obstacles.push(obstacle1);
		
				var obstacle2 = new Obstacle(400, 400, 15, 400, 0, 0, "Khaki");
				obstacles.push(obstacle2);

				var obstacle3 = new Obstacle(200, 0, 15, 200, 0, 0, "Khaki");
				obstacles.push(obstacle3);

				var obstacle4 = new Obstacle(0, 300, 200, 15, 50, 0, "Khaki");
				obstacles.push(obstacle4);

				var obstacle5 = new Obstacle(550, 150, 15, 200, 0, 0, "Khaki");
				obstacles.push(obstacle5);

				var obstacle7 = new Obstacle(650, 0, 15, 200, 0, 0, "Khaki");
				obstacles.push(obstacle7);
				
				//on ajoute 2 balles
				nbBalls = 2;
				createBalls(nbBalls, ballArray, prince2,prince, canvas);		
				createPoints(9, points, prince2,prince, canvas);
				document.getElementById("myCanvas").style.backgroundImage = "url('./img/fond1.jpg')";
	
            break;

            case 6:
				var obstacle6 = new Obstacle(100, 0, 15, 100, 50, 10, "Black");
				obstacles.push(obstacle6);
		
				var obstacle1 = new Obstacle(100, 0, 15, 100, 50, 10, "Black");
				obstacles.push(obstacle1);

				var obstacle8 = new Obstacle(200, 0, 15, 300, 50, 10, "Black");
				obstacles.push(obstacle8);
		
				var obstacle2 = new Obstacle(400, 400, 15, 250, 0, 0, "Black");
				obstacles.push(obstacle2);

				var obstacle3 = new Obstacle(200, 0, 15, 200, 0, 0, "Black");
				obstacles.push(obstacle3);

				var obstacle4 = new Obstacle(0, 300, 200, 15, 70, 0, "Black");
				obstacles.push(obstacle4);

				var obstacle5 = new Obstacle(400, 0, 15, 150, 0, 0, "Black");
				obstacles.push(obstacle5);

				var obstacle7 = new Obstacle(650, 0, 15, 200, 0, 0, "Black");
				obstacles.push(obstacle7);

				var obstacle9 = new Obstacle(650, 400, 15, 200, 0, 0, "Black");
				obstacles.push(obstacle9);
				
				//on ajoute 3 balles
				nbBalls = 3;
				createBalls(nbBalls, ballArray, prince2,prince, canvas);
				createPoints(9, points, prince2,prince, canvas);
				document.getElementById("myCanvas").style.backgroundImage = "url('./img/fond2.jpg')";
            break;

            case 7:
				var obstacle6 = new Obstacle(100, 0, 15, 100, 50, 10, "GoldenRod");
				obstacles.push(obstacle6);
		
				var obstacle1 = new Obstacle(100, 0, 15, 100, 50, 10, "GoldenRod");
				obstacles.push(obstacle1);

				var obstacle8 = new Obstacle(200, 0, 15, 300, 50, 10, "GoldenRod");
				obstacles.push(obstacle8);
		
				var obstacle2 = new Obstacle(400, 400, 15, 250, 0, 0, "GoldenRod");
				obstacles.push(obstacle2);

				var obstacle3 = new Obstacle(200, 400, 15, 150, 0, 0, "GoldenRod");
				obstacles.push(obstacle3);

				var obstacle4 = new Obstacle(0, 250, 200, 15, 0, 0, "GoldenRod");
				obstacles.push(obstacle4);

				var obstacle5 = new Obstacle(400, 0, 15, 150, 0, 0, "GoldenRod");
				obstacles.push(obstacle5);

				var obstacle7 = new Obstacle(650, 0, 15, 300, 0, 0, "GoldenRod");
				obstacles.push(obstacle7);

				var obstacle9 = new Obstacle(650, 400, 15, 100, 0, 0, "GoldenRod");
				obstacles.push(obstacle9);
				
				//on ajoute 3 balles
				nbBalls = 3;
				createBalls(nbBalls, ballArray, prince2,prince, canvas);
				createPoints(10, points, prince2,prince, canvas);
				document.getElementById("myCanvas").style.backgroundImage = "url('./img/fond3.jpg')";
            break;

            case 8:
				var obstacle6 = new Obstacle(100, 0, 15, 100, 50, 10, "LightSkyBlue");
				obstacles.push(obstacle6);
		
				var obstacle1 = new Obstacle(100, 0, 15, 100, 50, 10, "LightSkyBlue");
				obstacles.push(obstacle1);

				var obstacle8 = new Obstacle(200, 0, 15, 300, 50, 10, "LightSkyBlue");
				obstacles.push(obstacle8);
		
				var obstacle2 = new Obstacle(400, 400, 15, 400, 0, 50, "LightSkyBlue");
				obstacles.push(obstacle2);

				var obstacle3 = new Obstacle(200, 0, 15, 200, 0, 50, "LightSkyBlue");
				obstacles.push(obstacle3);

				//l'obstacle verticale
				var obstacle4 = new Obstacle(0, 300, 200, 15, 0, 50, "LightSkyBlue");
				obstacles.push(obstacle4);

				//le flottant
				var obstacle5 = new Obstacle(550, 150, 15, 200, 0, 0, "LightSkyBlue");
				obstacles.push(obstacle5);

				var obstacle7 = new Obstacle(650, 0, 15, 200, 0, 0, "LightSkyBlue");
				obstacles.push(obstacle7);

				var obstacle9 = new Obstacle(650, 400, 15, 200, 0, 0, "LightSkyBlue");
				obstacles.push(obstacle9);
				
				//on ajoute 3 balles
				nbBalls = 4;
				createBalls(nbBalls, ballArray, prince2,prince, canvas);
				createPoints(10, points, prince2,prince, canvas);
				document.getElementById("myCanvas").style.backgroundImage = "url('./img/fond4.jpg')";
            break;
            
}


}


