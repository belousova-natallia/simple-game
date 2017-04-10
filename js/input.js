var Input = {
    init: function(data) {
        var self = this;

        window.addEventListener("keydown", function(event){
            self.helpers.down[event.keyCode] = true;
        });

       window.addEventListener('keyup', function() {
            delete self.helpers.down[event.keyCode];
            delete self.helpers.pressed[event.keyCode];
        });

    },
    update: function (data) {
        var mariya = data.entities.mariya;
        var background4 = data.entities.background4;
        var background4Extend = data.entities.background4Extend;
        var background3 = data.entities.background3;
        var background3Extend = data.entities.background3Extend;
        var background2 = data.entities.background2;
        var background2Extend = data.entities.background2Extend;

        if(!Input.helpers.isDown(37) && !Input.helpers.isDown(39)  && !Input.helpers.isDown(38) ){
            mariya.currentState = mariya.states.standing;
        }
 if(data.entities.mariya.x > 500 && data.entities.mariya.realCoordinate > Game.endPoint) {
                    data.entities.mariya.currentState = data.entities.mariya.states.walking;
                    data.entities.mariya.direction = "right";
                    Game.backgroundMusic.pause();
                    if(mariya.x < background4.w + background4.w/1.2){
                    Game.getToTheFinalMusic.play();}
                    else{
                    Game.getToTheFinalMusic.pause();
                }




                }

        //Left Arrow
        if(Input.helpers.isDown(37) && data.entities.lives.value !== 0) {
             
            mariya.direction = "left";

            
             if(mariya.x <=  background4.w/11 ){
                mariya.x = background4.w/11;
               mariya.currentState = mariya.states.walking;

            }
                mariya.currentState = mariya.states.walking;
                background2.currentState = background2.states.standing;
                background2Extend.currentState = background2Extend.states.standing;
                
                background2.x += 0;
                background2Extend.x += 0;
                background3.currentState = background3.states.standing;
                background3Extend.currentState = background3Extend.states.standing;
                background3.x += 0;
                background3Extend.x += 0;
                background4.currentState = background4.states.standing;
                background4Extend.currentState = background4Extend.states.standing;
                background4.x += 0;
                background4Extend.x += 0;
         
                mariya.x -= mariya.velX ;
            

                data.entities.coinsArray.forEach(function(coin) {
                coin.x += 0;
                });
                data.entities.waterDropArray.forEach(function(drop) {
                    drop.x -= 0;
                });

                data.entities.hydrantArray.forEach(function(hydrant) {
                    hydrant.x += 0;
                });


               data.entities.tilesArray.forEach(function(tile) {
                tile.forEach(function(thisTile){
                   thisTile.x += 0;
                  
                })});


           
            //  if(background4Extend.x >= background4.w){
            //     background4Extend.x = background4.x + 2 - background4.w;
            // }
            // if(background4.x >= background4.w){
            //     background4.x = background4Extend.x + 15 - background4.x;
            // }
            //  if(background3Extend.x >= background3.w){
            //     background3Extend.x = background3.x + 2 - background3.w;
            // }
            // if(background3.x >= background3.w){
            //     background3.x = background3Extend.x + 15 - background3.x;
            // }
            //  if(background2Extend.x >= background2.w){
            //     background2Extend.x = background2.x + 2 - background2.w;
            // }
            // if(background2.x >= background2.w){
            //     background2.x = background2Extend.x + 15 - background2.x;
            // }




        }
        //Right Arrow
       if (Input.helpers.isDown(39) && data.entities.lives.value !== 0) {

         if(mariya.x <  background4.w/11 ){
                mariya.x = background4.w/11;

                background4.currentState = background4.states.standing;
                background4Extend.currentState = background4Extend.states.standing;

                background3.currentState = background3.states.standing;
                background3Extend.currentState = background3Extend.states.standing;

                background2.currentState = background2.states.standing;
                background2Extend.currentState = background2Extend.states.standing;
                mariya.currentState = mariya.states.standing;
            }


           else{ 
            if(mariya.x > background4.w/2 && mariya.realCoordinate < Game.endPoint){
                mariya.x = background4.w/2
            }

            if(mariya.realCoordinate < Game.endPoint){
                background4.currentState = background4.states.walking;
                background4Extend.currentState = background4Extend.states.walking;

                background4.x -= mariya.velX/2;
                background4Extend.x -= mariya.velX/2;

                background3.currentState = background3.states.walking;
                background3Extend.currentState = background3Extend.states.walking;
                background3.x -= mariya.velX/3;
                background3Extend.x -= mariya.velX/3;

                background2.currentState = background2.states.walking;
                background2Extend.currentState = background2Extend.states.walking;
                background2.x -= mariya.velX/7;
                background2Extend.x -= mariya.velX/7;

                mariya.realCoordinate += mariya.velX;
             //   console.log(mariya.realCoordinate)

                data.entities.coinsArray.forEach(function(coin) {
                    coin.x -= mariya.velX;
                });

                data.entities.waterDropArray.forEach(function(drop) {
                    drop.x -= mariya.velX;
                });

                data.entities.fireArray.forEach(function(fire) {
                    fire.x -= mariya.velX;
                });
                data.entities.hydrantArray.forEach(function(hydrant) {
                    hydrant.x -= mariya.velX;
                });

               
                data.entities.tilesArray.forEach(function(tile) {
                tile.forEach(function(thisTile){
                   thisTile.x -= mariya.velX;
                })
                     
                });

            } 
            if ( mariya.realCoordinate > Game.endPoint && mariya.x + mariya.w > background4.w + background4.w/1.2 + mariya.w) {
                mariya.x = background4.w + background4.w/1.2;
                Game.getToTheFinalMusic.pause(); 
            }


            } 

            if(mariya.velY === 0) {
                mariya.currentState = mariya.states.walking;
                

            } else {
                mariya.x += mariya.velX ;

            } 
            mariya.direction = "right"; 
            background4.direction = "right";
            background4Extend.direction = "right";

            background3.direction = "right";
            background3Extend.direction = "right";

            background2.direction = "right";
            background2Extend.direction = "right";

             if(background4.x + background4.w <= 0){
                background4.x = background4Extend.x + background4.w;
            }
            if(background4Extend.x + background4.w <= 0){
                background4Extend.x = background4.x + background4.w;
            }
            if(background3.x + background3.w <= 0){
                background3.x = background3Extend.x + background3.w;
            }
            if(background3Extend.x + background3.w <= 0){
                background3Extend.x = background3.x + background3.w;
            }

            if(background2.x + background2.w <= 0){
                background2.x = background2Extend.x + background2.w;
            }
            if(background2Extend.x + background2.w <= 0){
                background2Extend.x = background2.x + background2.w;
            }

      

        }
        // Up Arrow
        if(Input.helpers.isPressed(38) && data.entities.lives.value !== 0){
            mariya.currentState = mariya.states.jumping;

            background4.currentState = background4.states.standing;
            background4Extend.currentState = background4Extend.states.standing;
            background3.currentState = background3.states.standing;
            background3Extend.currentState = background3Extend.states.standing;
            background2.currentState = background2.states.standing;
            background2Extend.currentState = background2Extend.states.standing;
            
        }

        if(!Input.helpers.isDown(37) && !Input.helpers.isDown(39) ){
           background4.currentState = background4.states.standing; 
           background4Extend.currentState = background4Extend.states.standing; 
           background3.currentState = background3.states.standing; 
           background3Extend.currentState = background3Extend.states.standing; 
           background2.currentState = background2.states.standing; 
           background2Extend.currentState = background2Extend.states.standing; 
        }

    },

    helpers: {
        isDown: function(code){
            return Input.helpers.down[code];
        },

        isPressed: function(code) {
            if(Input.helpers.pressed[code]) {
                return false;
            } else if(Input.helpers.down[code]) {
                return Input.helpers.pressed[code] = true;
            }
            return false;

        },

        down:{},
        pressed:{}
    }

};
