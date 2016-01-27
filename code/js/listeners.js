function addListeners(inputStates, canvas) {
	    //add the listener to the main, window object, and update the states
        window.addEventListener('keydown', function (event) {
            //fleche de gauche ou touche Q
            if (event.keyCode === 37 ) {
                inputStates.left = true;
            }
            //fleche du haut ou touche A 
            else if (event.keyCode === 38 ) {
                inputStates.up = true;
            } 
            //fleche de droite et touche S    
            else if (event.keyCode === 39 ) {
                inputStates.right = true;
            } 
            //fleche du bas et touche Z    
            else if (event.keyCode === 40 ) {
                inputStates.down = true;
            } 
            if (event.keyCode===83) {
                inputStates.down2 = true;
            }
            //fleche du haut ou touche A 
            else if (event.keyCode===65) {
                inputStates.left2 = true;
            } 
            //fleche de droite et touche S    
            else if (event.keyCode===69) {
                inputStates.right2 = true;
            } 
            //fleche du bas et touche Z    
            else if (event.keyCode===90) {
                inputStates.up2 = true;
            } 
            else if (event.keyCode === 32) {
                inputStates.space = true;
            }
            else if (event.keyCode === 27) {
                inputStates.echap = true;
            }else if (event.keyCode === 13) {
                inputStates.enter = true;
            }
            else if (event.keyCode === 49 || event.keyCode===97) {
                inputStates.un = true;
            }
            else if (event.keyCode === 50 || event.keyCode===98) {
                inputStates.deux = true;
            }
            
        }, false);

        //if the key will be released, change the states object 
        window.addEventListener('keyup', function (event) {
            if (event.keyCode === 37) {
                inputStates.left = false;
            } else if (event.keyCode === 38 ) {
                inputStates.up = false;
            } else if (event.keyCode === 39 ) {
                inputStates.right = false;
            } else if (event.keyCode === 40 ) {
                inputStates.down = false;
            } else if (event.keyCode===83) {
                inputStates.down2 = false;
            } else if (event.keyCode===65) {
                inputStates.left2 = false;
            } else if (event.keyCode===69) {
                inputStates.right2 = false;
            } else if (event.keyCode===90) {
                inputStates.up2 = false;
            }
             else if (event.keyCode === 32) {
                inputStates.space = false;
            } else if (event.keyCode === 27) {
                inputStates.echap = false;
            } else if (event.keyCode === 13) {
                inputStates.enter = false;
            }else if (event.keyCode === 49) {
                inputStates.un = false;
            } else if (event.keyCode === 50) {
                inputStates.deux = false;
            }
        }, false);

        // Mouse event listeners
        canvas.addEventListener('mousemove', function (evt) {
            inputStates.mousePos = getMousePos(evt, canvas);
        }, false);

        canvas.addEventListener('mousedown', function (evt) {
            inputStates.mousedown = true;
            inputStates.mouseButton = evt.button;
        }, false);

        canvas.addEventListener('mouseup', function (evt) {
            inputStates.mousedown = false;
        }, false);
}

function getMousePos(evt, canvas) {
    // necessary to take into account CSS boudaries
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
