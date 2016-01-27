//by BACHARA - DIOP

// Inits
window.onload = function init() {
    var game = new GF();
    game.start();
};

// GAME FRAMEWORK STARTS HERE
var GF = function () {
    // Vars relative to the canvas
    var canvas, canvasscore, ctx, w, h;
	
    // vars for handling inputs
    var inputStates = {};

    // game states
    var gameStates = {
        mainMenu: 0,
        gameRunning: 1,
        gameOver: 2,
        finish:3,
        pause:4,
        gameRunning2:5,
        gameOver2:6,
        gameOverJ1:7,
        gameOverJ2:8,
        finishJ1:9,
        finishJ1:10
    };

    var currentGameState = gameStates.gameRunning;
    var currentLevel = 1;
    var TIME_BETWEEN_LEVELS = 0; // 5 seconds
    var currentLevelTime = TIME_BETWEEN_LEVELS;
    var plopSound; // Sound of a ball exploding

    // Prince object and sprites
    // sprite index corresponding to posture
    var PRINCE2_DIR_RIGHT =   2;
    var PRINCE2_DIR_LEFT = 1;
    var PRINCE2_DIR_DOWN = 0;
    var PRINCE2_DIR_UP = 3;

    var PRINCE_DIR_RIGHT =   3;
    var PRINCE_DIR_LEFT = 1;
    var PRINCE_DIR_DOWN = 2;
    var PRINCE_DIR_UP = 0;
    
    var prince2 = {
      dead:false,
      x:10,
      y:10,
      width:30,
      height:45,
      speed:150, // pixels/s this time !
      changeLevel:false,
      direction: PRINCE2_DIR_RIGHT 
    };

    var prince = {
      dead:false,
      x:10,
      y:50,
      width:35,
      height:45,
      speed:150, // pixels/s this time !
      changeLevel:false,
      direction: PRINCE_DIR_RIGHT 
    };

    var prince2Sprites = [];
    var princeSprites = [];
	// obstacles
    var obstacles = [];
	var exit = new Princesse(250);
    // array of balls to animate
    var ballArray = [];
    var nbBalls = 5;

    var points=[];
    var nbPoints=0;
    var nbJoueur=1;
    var scoreJ1=0;
    var scoreJ2=0;
    
    // We want the object to move at speed pixels/s (there are 60 frames in a second)
    // If we are really running at 60 frames/s, the delay between frames should be 1/60
    // = 16.66 ms, so the number of pixels to move = (speed * del)/1000. If the delay is twice
    // longer, the formula works : let's move the rectangle twice longer!
  var calcDistanceToMove = function(delta, speed) {
    //console.log("#delta = " + delta + " speed = " + speed);
    return (speed * delta) / 1000; 
  };
//son de fond
var song = new Howl({
            urls: ['son/song.mp3'],
            autoplay: true,
            volume: 1,
        }).stop();

//son de passage de niveau
var song2 = new Howl({
            urls: ['son/etincelle.mp3'],
            autoplay: true,
            volume: 1,
        }).stop();


    // clears the canvas content
    function clearCanvas() {
        ctx.clearRect(0, 0, w, h);
    }
    
    var mainLoop = function (time) {
        //main function, called each frame 
        measureFPS(time);

        // number of ms since last frame draw
        delta = timer(time);

        // Clear the canvas
        clearCanvas();
        switch (currentGameState) {
            case gameStates.gameRunning:

                // Draw a prince moving
                if(prince2.speedX==0 && prince2.speedY==0){
                    prince2Sprites[prince2.direction].drawStopped(ctx, prince2.x, prince2.y);
                }else{
                    prince2Sprites[prince2.direction].draw(ctx, prince2.x, prince2.y);
                }

                updatePrince2Position(delta);

                // update and draw balls
                updateBalls(delta);
                updateObstacles(delta);
				updateSortie(delta);
                updatePoints(delta);
				
                // display Score
                displayScore()

                if(currentLevelTime >30000){
                    currentGameState=gameStates.gameOver;
                }

                // decrease currentLevelTime. 
                // When < 0 go to next level
                currentLevelTime += delta;
                
                if (rectsOverlap(prince2.x, prince2.y,
                    prince2.width, prince2.height,
                    exit.x,exit.y, exit.width-4, exit.height-8) ) {
                    // Here, a sound effect greatly improves
                    // the experience!
                    //plopSound.play();
                    scoreJ1=scoreJ1+50;
                    song.stop();
                    song2.play();
                    goToNextLevel();
                }
                if(inputStates.echap){
                    currentGameState=gameStates.pause;
                }

                if (prince2.dead ) {
                    currentGameState = gameStates.gameOver;
                }
           break;
            case gameStates.gameRunning2:

                // Draw a prince2 moving
                if(prince2.speedX==0 && prince2.speedY==0){
                    prince2Sprites[prince2.direction].drawStopped(ctx, prince2.x, prince2.y);
                }else{
                    prince2Sprites[prince2.direction].draw(ctx, prince2.x, prince2.y);
                }

                if(prince.speedX==0 && prince.speedY==0){
                    princeSprites[prince.direction].drawStopped(ctx, prince.x, prince.y);
                }else{
                    princeSprites[prince.direction].draw(ctx, prince.x, prince.y);
                }

                updatePrince2Position(delta);
                updatePrincePosition(delta);

                // update and draw balls
                updateBalls(delta);
                updateObstacles(delta);
                updateSortie(delta);
                updatePoints(delta);
                
                // display Score
                displayScore()

                if(currentLevelTime >30000){
                    currentGameState=gameStates.gameOver2;
                }

                // decrease currentLevelTime. 
                // When < 0 go to next level
                currentLevelTime += delta;
                
                if (rectsOverlap(prince2.x, prince2.y,
                    prince2.width, prince2.height,
                    exit.x,exit.y, exit.width-4, exit.height-8) ) {
                    // Here, a sound effect greatly improves
                    // the experience!
                    //plopSound.play();
                    scoreJ1=scoreJ1+50;
                    song.stop();
                    song2.play();
                    prince2.changeLevel=true;
                    goToNextLevel();
                }
                if (rectsOverlap(prince.x, prince.y,
                    prince.width, prince.height,
                    exit.x,exit.y, exit.width-4, exit.height-8)) {
                    // Here, a sound effect greatly improves
                    // the experience!
                    //plopSound.play();
                    scoreJ2=scoreJ2+50;
                    song.stop();
                    song2.play();
                    prince.changeLevel=true;
                    goToNextLevel();
                }
                if(inputStates.echap){
                    currentGameState=gameStates.pause;
                }

                if (prince2.dead ) {
                    currentGameState = gameStates.gameOverJ1;
                }
                if (prince.dead) {
                    currentGameState = gameStates.gameOverJ2;
                }
                break;
            case gameStates.mainMenu:
                ctx.fillStyle="forestgreen";
                ctx.save();
                prince2Sprites[prince2.direction].drawStopped(ctx, 150, 200);
                princeSprites[PRINCE_DIR_LEFT].drawStopped(ctx, 570, 190);
                ctx.fillRect(0, 0, ctx.width-1, ctx.height-1);
                ctx.restore();
                ctx.fillStyle="black";
                ctx.font = "30px fantasy";
                ctx.fillText("Menu player", 325, 150);
                ctx.font = "20px fantasy";
                ctx.fillText("Press 1 for one player", 325, 200);
                ctx.fillText("or ", 400, 250);
                ctx.fillText("2 for two players", 325, 300); 
                ctx.fillText("Goal: Join as soon as possible the princess to the next level", 175, 350);
                ctx.fillText("Collect life small points to increase your score", 200, 400);

                if(inputStates.un){
                    Level(currentLevel, exit, obstacles, ballArray, points, canvas, prince2, prince);
                    currentGameState=gameStates.gameRunning;
                    nbJoueur=1;
                }else if(inputStates.deux){
                     Level(currentLevel, exit, obstacles, ballArray, points, canvas, prince2, prince);
                    currentGameState=gameStates.gameRunning2;
                    nbJoueur=2;
                }
                break;
            
            case gameStates.gameOver:
            song.stop();
                ctx.font = "50px fantasy";
                ctx.fillStyle="black";
                ctx.fillText("GAME OVER", 100, 100);
                ctx.font = "20px fantasy";
                ctx.fillText("Score J1 : " + scoreJ1, 100, 150);                
                ctx.fillText("Press SPACE to start again", 100, 200);
                ctx.fillText("Move with arrow keys for J1 and A=Up Z=Down Q=Right S=left for J2", 100, 250);
                ctx.fillText("Go faster", 100, 300);
                   
                
                if (inputStates.space) {
                    prince.dead=false;
                    prince2.dead=false;
                    startNewGame();
                }
                break;

            case gameStates.gameOver2:
                song.stop();
                ctx.font = "50px fantasy";
                ctx.fillStyle="black";
                ctx.fillText("GAME OVER", 100, 100);
                ctx.font = "20px fantasy";
                ctx.fillText("Score J1 : " + scoreJ1, 100, 150);
                ctx.fillText("Score J2 : " + scoreJ2, 100, 200);
                ctx.fillText("Press SPACE to start again", 100, 250);
                ctx.fillText("Move with arrow keys for J1 and A=Up Z=Down Q=Right S=left for J2", 100, 300);
                ctx.fillText("Go faster", 100, 350);
                   
                if (inputStates.space) {
                    prince.dead=false;
                    prince2.dead=false;
                    startNewGame();
                }
                break;
            case gameStates.gameOverJ1:
                song.stop();
                    ctx.font = "50px fantasy";
                    ctx.fillStyle="black";
                    ctx.fillText("J2 WIN THE GAME", 100, 100);
                    ctx.font = "20px fantasy";
                    ctx.fillText("Press SPACE to start again", 100, 200);
                    ctx.fillText("Move with arrow keys for J1 and A=Up Z=Down Q=Right S=left for J2", 100, 250);
                    ctx.fillText("Go faster", 100, 300);
                    ctx.font = "20px fantasy";
               
                
                if (inputStates.space) {
                    prince.dead=false;
                    prince2.dead=false;
                    startNewGame();
                }
                break;
            case gameStates.gameOverJ2:
                song.stop();
                    ctx.font = "50px fantasy";
                    ctx.fillStyle="black";
                    ctx.fillText("J1 WIN THE GAME", 100, 100);
                    ctx.font = "20px fantasy";
                    ctx.fillText("Press SPACE to start again", 100, 200);
                    ctx.fillText("Move with arrow keys for J1 and A=Up Z=Down Q=Right S=left for J2", 100, 250);
                    ctx.fillText("Go faster", 100, 300);
                    ctx.font = "20px fantasy";                
                
                if (inputStates.space) {
                    prince.dead=false;
                    prince2.dead=false;
                    startNewGame();
                }
                break;   
            case gameStates.finish:
                song.stop();
                ctx.font = "50px fantasy";
                ctx.fillStyle="black";
                ctx.fillText("Finish", 100, 100);
                ctx.font = "20px fantasy";
                ctx.fillText("Score : " + scoreJ1, 100, 150);
                ctx.fillText("Press SPACE to start again", 100, 200);
                ctx.fillText("Move with arrow keys for player J1 and A=Left Z=Up E=Right S=Down for player J2", 100, 250);
                ctx.fillText("Go faster", 100, 300);
                if (inputStates.space) {
                    startNewGame();
                }
            break;
            case gameStates.finishJ1:
                song.stop();
                ctx.font = "50px fantasy";
                ctx.fillStyle="black";
                ctx.fillText("Finish : J1 WIN THE GAME", 100, 100);
                ctx.font = "20px fantasy";
                ctx.fillText("Score J1 : " + scoreJ1, 100, 150);
                ctx.fillText("Score J2 : " + scoreJ2, 100, 200);
                ctx.fillText("Press SPACE to start again", 100, 250);
                ctx.fillText("Move with arrow keys for player J1 and A=Left Z=Up E=Right S=Down for player J2", 100, 300);
                ctx.fillText("Go faster", 100, 350);
                if (inputStates.space) {
                    startNewGame();
                }
            break;
            case gameStates.finishJ2:
                song.stop();
                ctx.font = "50px fantasy";
                ctx.fillStyle="black";
                ctx.fillText("Finish : J2 WIN THE GAME", 100, 100);
                ctx.font = "20px fantasy";
                ctx.fillText("Score J1 : " + scoreJ1, 100, 150);
                ctx.fillText("Score J2 : " + scoreJ2, 100, 200);
                ctx.fillText("Press SPACE to start again", 100, 250);
                ctx.fillText("Move with arrow keys for player J1 and A=Left Z=Up E=Right S=Down for player J2", 100, 300);
                ctx.fillText("Go faster", 100, 350);
                if (inputStates.space) {
                    startNewGame();
                }
            break;
            case gameStates.pause:
                song.stop();
                ctx.fillStyle="black";
                ctx.font = "20px fantasy";
                ctx.fillText("Press ENTER to continue ", 100, 150);
                ctx.fillText(" Or press SPACE to start again ", 100, 200);
                ctx.fillText("Move with arrow keys for player J1 and A=Left Z=Up E=Right S=Down for player J2", 100, 250);
                
                if (inputStates.space) {
                    startNewGame();
                    song.play();
                }else if(inputStates.enter && nbJoueur==1){
                    currentGameState=gameStates.gameRunning;
                    song.play();
                }else if(inputStates.enter && nbJoueur==2){
                    currentGameState=gameStates.gameRunning2;
                    song.play();
                }
            break;

        }

        // call the animation loop every 1/60th of second
        requestAnimationFrame(mainLoop);
    };

	function updateObstacles(delta) {
		for(var i =0; i < obstacles.length; i++) {
		  var obstacle = obstacles[i];
			  obstacle.move(delta);
			  testCollisionObstacleMur(obstacle, canvas);
			  obstacle.draw(ctx);
		}
	}
	

    function updatePrince2Position(delta) {
      prince2.speedX = prince2.speedY = 0;
    
      
      if (inputStates.left) {
            prince2.speedX = -prince2.speed;
            prince2.direction=PRINCE2_DIR_LEFT;
        }
        if (inputStates.up) {
            prince2.speedY = -prince2.speed;
            prince2.direction=PRINCE2_DIR_UP;
        }
        if (inputStates.right) {
            prince2.speedX = prince2.speed;
            prince2.direction=PRINCE2_DIR_RIGHT;
        }
        if (inputStates.down) {
            prince2.speedY = prince2.speed;
            prince2.direction=PRINCE2_DIR_DOWN;
        }
        if (inputStates.space) {
        }
        if (inputStates.mousePos) {
        }
        if (inputStates.mousedown) {
            prince2.speed = 500;
        } else {
            // mouse up
            prince2.speed = 100;
        }
        

        // collision du prince avec obstacles
      for(var i=0; i < obstacles.length; i++) {
        var o = obstacles[i];
          if(rectsOverlap(o.x, o.y, o.w, o.h, 
                          prince2.x, prince2.y, prince2.width, prince2.height)) {
            
            prince2.speed = 20;
           }
      }
      
        //Eviter au prince de passer à travers les murs
        testCollisionPrinceMur(prince2, canvas);

       prince2.x += calcDistanceToMove(delta, prince2.speedX);
        prince2.y += calcDistanceToMove(delta, prince2.speedY);
    }


    function updatePrincePosition(delta) {
      prince.speedX = prince.speedY = 0;
    
      
      if (inputStates.left2) {
            prince.speedX = -prince.speed;
            prince.direction=PRINCE_DIR_LEFT;
        }
        if (inputStates.up2) {
            prince.speedY = -prince.speed;
            prince.direction=PRINCE_DIR_UP;
        }
        if (inputStates.right2) {
            prince.speedX = prince.speed;
            prince.direction=PRINCE_DIR_RIGHT;
        }
        if (inputStates.down2) {
            prince.speedY = prince.speed;
            prince.direction=PRINCE_DIR_DOWN;
        }
        if (inputStates.space) {
        }
        if (inputStates.mousePos) {
        }
        if (inputStates.mousedown) {
            prince.speed = 500;
        } else {
            // mouse up
            prince.speed = 100;
        }


        

        // collision du prince avec obstacles
      for(var i=0; i < obstacles.length; i++) {
        var o = obstacles[i];
          if(rectsOverlap(o.x, o.y, o.w, o.h, 
                          prince.x, prince.y, prince.width, prince.height)) {
            
            prince.speed = 20;
           }
      }
      
        //Eviter au prince de passer à travers les murs
        testCollisionPrinceMur(prince, canvas);

       prince.x += calcDistanceToMove(delta, prince.speedX);
        prince.y += calcDistanceToMove(delta, prince.speedY);
    }

	function updateSortie(delta){
        exit.draw(ctx);
	}
	
	
    function startNewGame() {
        prince2.x=10;
        prince2.y=10;
        prince.x=10;
        prince.y=10;

        scoreJ1=0;
        scoreJ2=0;

        currentLevelTime = 0;
        currentLevel = 0;
        goToNextLevel();
        song.play();
        currentGameState = gameStates.mainMenu;
    }

    function goToNextLevel() {
        // reset time available for next level
        song2.stop();
        song.play();
        currentLevelTime=0;
        currentLevel++;
        obstacles = [];
        ballArray=[];
        points=[];
        Level(currentLevel, exit, obstacles, ballArray, points, canvas, prince2, prince);
        if(currentLevel==7){
            prince2.x=10;
            prince2.y=350;
             prince.x=30;
            prince.y=350;
            prince2.changeLevel=false;
            prince.changeLevel=false;
        }else{
            if(currentLevel==9){
                if(nbJoueur==1)
                    currentGameState=gameStates.finish;
                if(nbJoueur==2){
                    
                    if(prince2.changeLevel){
                        currentGameState=gameStates.finishJ1;
                    }
                    if(prince.changeLevel){
                        currentGameState=gameStates.finishJ2;
                    }
                }
                prince2.changeLevel=false;
                prince.changeLevel=false;
            }else{
                prince2.x=10;
                prince2.y=10;
                 prince.x=10;
                prince.y=30;
                prince2.changeLevel=false;
                prince.changeLevel=false;
            }
        }
     
    }

    function displayScore() {        
        canvasscore = document.querySelector("#score");
        var context = canvasscore.getContext('2d');
        context.clearRect(0, 0, w, h);
        context.font = "20px fantasy";
        context.save();
        context.fillStyle = 'black';
        context.fillText("Level: " + currentLevel, 100, 20);
        context.fillText("Time: " + (currentLevelTime / 1000).toFixed(1), 250, 20); 
        context.fillText("scoreJ1: " + scoreJ1, 400, 20);  
        if(nbJoueur==2)
            context.fillText("scoreJ2: " + scoreJ2, 600, 20); 

        context.restore();
    }
	   
	
    function updateBalls(delta) {
        // Move and draw each ball, test collisions, 
        for (var i = 0; i < ballArray.length; i++) {
            var ball = ballArray[i];

            // 1) move the ball
            ball.move();

            // 2) test if the ball collides with a wall
            testCollisionWithWalls(ball, w, h);

            // Test if the prince2 collides
            if (circRectsOverlap(prince2.x, prince2.y,
                    prince2.width, prince2.height,
                    ball.x, ball.y, ball.radius)  ) {

                prince2.dead = true;
            }
            if (circRectsOverlap(prince.x, prince.y,
                    prince.width, prince.height,
                    ball.x, ball.y, ball.radius) ) {

                prince.dead = true;
            }

            // 3) draw the ball
            ball.draw(ctx);
        }
    }

    function updatePoints(delta) {
        // Move and draw each ball, test collisions, 
        for (var i = 0; i < points.length; i++) {
            var point = points[i];

            if (circRectsOverlap(prince2.x, prince2.y,
                    prince2.width, prince2.height,
                    point.x, point.y, point.radius)  ) {

                scoreJ1=scoreJ1+10;
                points.splice(i,1);

            }
            if (circRectsOverlap(prince.x, prince.y,
                    prince.width, prince.height,
                    point.x, point.y, point.radius) ) {

                scoreJ2=scoreJ2+10;
                points.splice(i,1);
            }
            // 3) draw the ball
            point.draw(ctx);
        }
    }

	
	function loadAssets(callback) {
        // here we should load the souds, the sprite sheets etc.
        // then at the end call the callback function

        // simple example that loads a sound and then calls the callback. We used the howler.js WebAudio lib here.
        // Load sounds asynchronously using howler.js
        plopSound = new Howl({
            urls: ['http://mainline.i3s.unice.fr/mooc/plop.mp3'],
            autoplay: false,
            volume: 1,
            onload: function () {
                console.log("all sounds loaded");
                // We're done!
                callback();
            }
		});
	}

	  var loadAssets = function(callback) {
      var SPRITESHEET_URL = "img/sprite1.png";
      var SPRITE_WIDTH = 32;
      var SPRITE_HEIGHT = 48;
      var NB_POSTURES=4;
      var NB_FRAMES_PER_POSTURE = 4;
      
      // load the spritesheet
      var spritesheet = new Image();
      spritesheet.src = SPRITESHEET_URL;     

            
    
      // Called when the spritesheet has been loaded
      spritesheet.onload = function() {
             
         // Create prince2 sprites
         for(var i = 0; i < NB_POSTURES; i++) {
            var sprite = new Sprite();
      
            sprite.extractSprites(spritesheet, NB_POSTURES, (i+1), 
                                  NB_FRAMES_PER_POSTURE, 
                                  SPRITE_WIDTH, SPRITE_HEIGHT);
            sprite.setNbImagesPerSecond(15);
            prince2Sprites[i] = sprite;
         }
         // call the callback function passed as a parameter, 
         // we're done with loading assets and building the sprites
         callback();
      };

      var SPRITESHEET_URL2 = "img/sprites3.png";
      var SPRITE_WIDTH2 = 64;
      var SPRITE_HEIGHT2 = 64;
      var NB_POSTURES2 =4;
      var NB_FRAMES_PER_POSTURE2 = 9;
      
      // load the spritesheet
      var spritesheet2 = new Image();
      spritesheet2.src = SPRITESHEET_URL2; 

      // Called when the spritesheet has been loaded
      spritesheet2.onload = function() {
             
         // Create prince2 sprites
         for(var i = 0; i < NB_POSTURES2; i++) {
            var sprite = new Sprite();
      
            sprite.extractSprites(spritesheet2, NB_POSTURES2, (i+1), 
                                  NB_FRAMES_PER_POSTURE2, 
                                  SPRITE_WIDTH2, SPRITE_HEIGHT2);
            sprite.setNbImagesPerSecond(15);
            princeSprites[i] = sprite;
         }
         // call the callback function passed as a parameter, 
         // we're done with loading assets and building the sprites
         callback();
      };
    };


    var start = function () {

        currentGameState=gameStates.mainMenu;
        initFPSCounter();

        // Canvas, context etc.
        canvas = document.querySelector("#myCanvas");

        // often useful
        w = canvas.width;
        h = canvas.height;

        // important, we will draw with this object
        ctx = canvas.getContext('2d');
        // default police for text
        ctx.font = "20px Arial";

        // Create the different key and mouse listeners
        addListeners(inputStates, canvas);

        loadAssets(function () {
            // all assets (images, sounds) loaded, we can start the animation
            requestAnimationFrame(mainLoop);
        });

    };

    //our GameFramework returns a public API visible from outside its scope
    return {
        start: start
    };
};


