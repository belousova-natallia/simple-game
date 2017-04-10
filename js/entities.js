var Entities = {
    init: function (data) {
        var background1 = {
            sprite: new Entities.helpers.Sprite(data.spriteSheet1, 0, 0, 400, 240),
            x: 0,
            y: 0,
            w: 800,
            h:480
        };

        var background2 = new Entities.helpers.Backgroung(data.spriteSheet2, 0, 0, 800, 480);
        var background2Extend = new Entities.helpers.Backgroung(data.spriteSheet2, 800, 0, 800, 480);
        
        var background3 = new Entities.helpers.Backgroung(data.spriteSheet3, 0, 0, 800, 480);
        var background3Extend = new Entities.helpers.Backgroung(data.spriteSheet3, 800, 0, 800, 480);

        var background4 = new Entities.helpers.Backgroung(data.spriteSheet4, 0, 0, 800, 480);
        var background4Extend = new Entities.helpers.Backgroung(data.spriteSheet4, 800, 0, 800, 480);

        

        var mariya = new Entities.helpers.Mariya(data.spriteSheetMariya,  60, 0, 60, 80);

        var score = new Entities.helpers.Score(50, 30);

        var lives = new Entities.helpers.Lives(250, 30);
        var volume = new Entities.helpers.Volume(data.spriteSheetVolume, 740, 5, 40, 25 )


        var wallLocations = [[0, 480, 800, 480],
                             [800, 0, 1, 480]   ];

        var coinLocations = [];


        data.entities = {};
        data.entities.volume = volume;
        data.entities.background1 = background1;
        data.entities.background2 = background2;
        data.entities.background2Extend = background2Extend;
        data.entities.background3 = background3;
        data.entities.background3Extend = background3Extend;
        data.entities.background4 = background4;
        data.entities.background4Extend = background4Extend;

        data.entities.score = score;
        data.entities.lives = lives;
        data.entities.mariya = mariya;
        data.entities.wallArray = [];
        data.entities.coinsArray = [];
        data.entities.fireArray = [];
        data.entities.hydrantArray = [];
        data.entities.waterDropArray = [];

        wallLocations.forEach(function(location) {
            data.entities.wallArray.push(new Entities.helpers.Wall(location[0], location[1], location[2], location[3]));
        });

        

        data.entities.tilesArray = [];

        data.entities.makeTiles = function(minX, maxX, minY, maxY, numMiddleMin, numMiddleMax){

//        Math.round(min - 0.5 + Math.random() * (max - min + 1))

        var tilesBeginLocation = [Math.round(minX - 0.5 + Math.random() * (maxX - minX + 1)), Math.round(minY - 0.5 + Math.random() * (maxY - minY + 1))];
       
        var numMiddle = Math.round(numMiddleMin - 0.5 + Math.random() * (numMiddleMax - numMiddleMin + 1));
      
        var tilesMiddleLocation = [];
        
        for(var i = 0; i < numMiddle; i++){
            tilesMiddleLocation.push([tilesBeginLocation[0] + 50*i + 50 , tilesBeginLocation[1] ] )

        }    

        var tilesEndLocation = [tilesBeginLocation[0] + 50*numMiddle + 50, tilesBeginLocation[1]];

        
        var thisTile = [];

        thisTile.push(new Entities.helpers.TilesBegin(data.spriteSheetTiles, tilesBeginLocation[0], tilesBeginLocation[1], 50, 50));

        
     //   data.entities.coinsArray.push(new Entities.helpers.Coin(data.spriteSheetDimonds, tilesBeginLocation[0] + 20, tilesBeginLocation[1] - 120, 22, 25 ));


        tilesMiddleLocation.forEach(function(location, i){
//coins
         thisTile.push(new Entities.helpers.TilesMiddle(data.spriteSheetTiles, location[0], location[1], 50, 50)); 
         if(location[1] > 150){
         data.entities.coinsArray.push(new Entities.helpers.Coin(data.spriteSheetDimonds, location[0] + 20, location[1] - 170, 22, 25 ))
     };

//fires
         if(tilesMiddleLocation.length > 4 && i===3 && data.entities.lives.value > 0 ){
            var fireX = Math.round(50 - 0.5 + Math.random() * (120 - 50 + 1));
            var fireY  = Math.round(30 - 0.5 + Math.random() * (90 - 30 + 1))
            data.entities.fireArray.push(new Entities.helpers.Fire(data.spriteSheetFire, location[0] - 20, location[1] - fireY, fireX, fireY))

         }
// fire hydrants
         if(tilesMiddleLocation.length > 4 && i===1 && data.entities.lives.value > 0 ){


          data.entities.hydrantArray.push(new Entities.helpers.FireHydrant(data.spriteSheetHydrant, location[0] - 20, location[1] - 76, 230, 80))  
         }
  
        
        })
        thisTile.push(new Entities.helpers.TilesEnd(data.spriteSheetTiles, tilesEndLocation[0], tilesBeginLocation[1], 50, 50));

       
 //       data.entities.coinsArray.push(new Entities.helpers.Coin(data.spriteSheetDimonds, tilesEndLocation[0] + 20, tilesEndLocation[1] - 120, 22, 25 ));

// water drops

       
        if(thisTile.length > 8){

            data.entities.fireArray[data.entities.fireArray.length - 1].currentState = data.entities.fireArray[data.entities.fireArray.length - 1].states.moving;
            data.entities.waterDropArray.push(new Entities.helpers.MagicDrop(data.spriteSheetWaterDrop, tilesEndLocation[0] - 100, tilesEndLocation[1] - 270, 20, 30 ));        

            }
        data.entities.tilesArray.push(thisTile);

                    }

         data.entities.makeTiles(50,50, 300,300, 1, 10);
                mariya.x = 50;
                mariya.y = 300 - mariya.h;

        /// dimonds   

    },

    helpers: {
        Sprite:function(img,srcX, srcY, srcW, srcH) {
            this.img = img;
            this.srcX = srcX;
            this.srcY = srcY;
            this.srcW = srcW;
            this.srcH = srcH;
        },
        Mariya: function (img, x,y,w,h) {
            var self = this;

            this.jumpSound = new Audio('audio/smb_jump-small.wav');
            this.sprite = new Entities.helpers.Sprite(img, 10, 10, 69, 85)
            this.spriteAnimations = {
                walkRight: {
                    frames : [new Entities.helpers.Sprite(img, 10, 105, 73, 85),
                              new Entities.helpers.Sprite(img, 81, 105, 73, 85),
                              new Entities.helpers.Sprite(img, 165, 105, 73, 85),
                              new Entities.helpers.Sprite(img, 240, 105, 73, 85),
                              new Entities.helpers.Sprite(img, 320, 105, 73, 85),
                              new Entities.helpers.Sprite(img, 400, 105, 73, 85),

                              ],
                    currentFrame: 0
                },
                walkLeft: {
                    frames : [new Entities.helpers.Sprite(img, 10, 215, 77, 85),
                              new Entities.helpers.Sprite(img, 90, 215, 77, 85),
                              new Entities.helpers.Sprite(img, 168, 215, 75, 85),
                              new Entities.helpers.Sprite(img, 245, 215, 75, 85),
                              new Entities.helpers.Sprite(img, 330, 215, 75, 85),
                              new Entities.helpers.Sprite(img, 407, 215, 75, 85),
                              ],
                    currentFrame: 0
                },
                standRight: new Entities.helpers.Sprite(img, 10, 10, 69, 85),
                standLeft: new Entities.helpers.Sprite(img, 320, 10, 69, 85),
                jumpLeft: new Entities.helpers.Sprite(img, 400, 10, 60, 92),
                jumpRight: new Entities.helpers.Sprite(img, 90, 10, 60, 92)

            };

            this.states = {
                jumping: {
                    movement: function(data) {
                        if(self.velY === 0){
                            var jumpSound = self.jumpSound.cloneNode();
                            jumpSound.play();
                            self.velY -=23;
                        }
                    },
                    animation: function(data) {
                        if(self.direction ==="right"){
                            self.sprite = self.spriteAnimations.jumpRight;
                        } else {
                            self.sprite = self.spriteAnimations.jumpLeft;
                        }
                    }
                },
                 standing: {
                    movement: function(data) {
                        return;
                    },
                    animation: function(data) {
                        if(self.direction ==="right"){
                            self.sprite = self.spriteAnimations.standRight;
                        } else {
                            self.sprite = self.spriteAnimations.standLeft;
                        }
                    }
                },
                 walking: {
                    movement: function(data) {
                        if(self.direction === "right"){
                            self.x += self.velX;
                        } else {
                            self.x -= self.velX;
                        }
                    },
                    animation: function(data) {
                        if(self.direction === "right") {
                            if(data.animationFrame % 5 === 0){
                                self.sprite = self.spriteAnimations.walkRight.frames[self.spriteAnimations.walkRight.currentFrame]
                                self.spriteAnimations.walkRight.currentFrame++;

                                if(self.spriteAnimations.walkRight.currentFrame > 5){
                                    self.spriteAnimations.walkRight.currentFrame = 0;
                                }
                            }

                            } else {
                                 if(data.animationFrame % 5 === 0){
                                self.sprite = self.spriteAnimations.walkLeft.frames[self.spriteAnimations.walkLeft.currentFrame];
                                self.spriteAnimations.walkLeft.currentFrame++;

                                if(self.spriteAnimations.walkLeft.currentFrame > 5){
                                    self.spriteAnimations.walkLeft.currentFrame = 0;
                                } 
                            }
                        }

                    }
                },

            };
            this.currentState = self.states.standing;
            this.direction = "right";
            this.velY = 0;
            this.velX = 3.8;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.realCoordinate = this.x;

        },

        TilesBegin: function(img, x, y, w, h){
            this.sprite = new Entities.helpers.Sprite(img, 65, 0, 26, 32);
            
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.type = 'tile';

        },
        TilesMiddle: function(img, x, y, w, h){
            this.sprite = new Entities.helpers.Sprite(img, 320, 0, 30, 32)
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.type = 'tile';

        },
        TilesEnd: function(img, x, y, w, h){
            this.sprite = new Entities.helpers.Sprite(img, 255, 0, 32.5, 32);
           
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.type = 'tile';

        },



        Backgroung: function(img, x,y,w,h){
            this.sprite = new Entities.helpers.Sprite( img, 0, 0, 400, 240)
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.velX = 1.7;
            var self = this;
            this.states = {
                standing: {
                    movement: function(data) {
                        return;
                    }
                },
                walking: {
                    movement: function(data) {
                        if(self.direction === "right"){
                            self.x -= self.velX;
                        } else if (self.direction === "left"){
                            self.x += self.velX;
                        }
                    },

                    }
                };

                this.currentState = self.states.standing;
                this.direction = "right";
            },

        Coin: function (img, x,y, w, h) {
            var self = this;
            this.type = "coin";
            this.sound = new Audio('audio/smb_coin.wav');
            this.sprite = new Entities.helpers.Sprite(img, 0, 0, 110, 111);
            this.spriteAnimations = {
                spin: {
                    frames: [new Entities.helpers.Sprite(img, 0, 0, 112, 111), 
                    new Entities.helpers.Sprite(img, 112, 0, 112, 111),
                    new Entities.helpers.Sprite(img, 224, 0, 112, 111)
                   // new Entities.helpers.Sprite(img, 147, 0, 10, 14)],
                    ],
                    currentFrame:0
                }
            };
            this.states = {
                spinning:{
                    animation: function (data){
                        if(data.animationFrame % 13 === 0) {
                            self.sprite = self.spriteAnimations.spin.frames[self.spriteAnimations.spin.currentFrame];
                            self.spriteAnimations.spin.currentFrame++;

                            if(self.spriteAnimations.spin.currentFrame > 2) {
                                self.spriteAnimations.spin.currentFrame = 0;
                            }
                        }
                    }
                }
            }
            this.currentState = self.states.spinning;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        },
        Wall: function(x, y, w, h){
            this.type = 'wall';
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        },

        Score: function (x, y) {
            this.value = 0;
            this.x = x;
            this.y = y;
            this.size = "25px";
            this.font = "PixelEmulator";
            this.color = "MediumVioletRed";
            this.text = "Score:";
        },
        Lives: function(x, y){
            this.value = 3;
            this.x = x;
            this.y = y;
            this.size = "25px";
            this.font = "PixelEmulator";
            this.color = "MediumVioletRed";
            this.text = "Lives:";
            this.sound = new Audio('audio/Evil_Laugh.mp3');
            this.soundEnd = new Audio('audio/smb_gameover.wav');
        },

        Fire: function(img, x, y, w, h) {
            var self = this;
            this.sprite = new Entities.helpers.Sprite(img, 15, 30, 50, 80);
            this.spriteAnimations = {
                fires: {
                    frames: [new Entities.helpers.Sprite(img, 15, 30, 60, 80), 
                    new Entities.helpers.Sprite(img, 80, 30, 60, 80),
                    new Entities.helpers.Sprite(img, 145, 30, 60, 80),
                    new Entities.helpers.Sprite(img, 208, 30, 60, 80),
                    new Entities.helpers.Sprite(img, 272, 30, 60, 80),
                   new Entities.helpers.Sprite(img, 337, 30, 60, 80),
                   new Entities.helpers.Sprite(img, 402, 30, 60, 80),

                    ],
                    currentFrame:0
                }
            };
            this.states = {
                burning:{
                    animation: function (data){
                        if(data.animationFrame % 6 === 0) {
                            self.sprite = self.spriteAnimations.fires.frames[self.spriteAnimations.fires.currentFrame];
                            self.spriteAnimations.fires.currentFrame++;

                            if(self.spriteAnimations.fires.currentFrame > 6) {
                                self.spriteAnimations.fires.currentFrame = 0;
                            }
                        }
                    },

                    movement: function(data) {
                        return;
                    }
                },
                moving:{
                    animation: function (data){
                        if(data.animationFrame % 6 === 0) {
                            self.sprite = self.spriteAnimations.fires.frames[self.spriteAnimations.fires.currentFrame];
                            self.spriteAnimations.fires.currentFrame++;

                            if(self.spriteAnimations.fires.currentFrame > 6) {
                                self.spriteAnimations.fires.currentFrame = 0;
                            }
                        }
                    },

                    movement: function(data) {

                        if(self.direction === "right" && self.len < 101){
                            self.x += self.velX;
                            self.len += self.velX;
                        } 
                        if(self.len > 100 && self.len < 200){
                            self.direction === "left";
                            self.x -= self.velX;
                             self.len += self.velX;


                        }
                        if(self.len === 200){
                          self.direction === "right";
                           self.len = 0;  
                           self.x -= self.velX;

                            
                        }
                        
                    },



                }
            }
            this.direction = "right";
            this.currentState = self.states.burning;
            this.type = 'fire';
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.velX = 0.5;
            this.len = 0;
        },

        FireHydrant: function(img, x, y, w, h) {
            var self = this;
            this.sprite = new Entities.helpers.Sprite(img, 765, 128, 255, 103);
            this.spriteAnimations = {
                water: {
                    frames: [
                    new Entities.helpers.Sprite(img, 0, 0, 255, 103), 
                    new Entities.helpers.Sprite(img, 255, 0, 255 , 103),
                    new Entities.helpers.Sprite(img, 510, 0, 255, 103),
                    new Entities.helpers.Sprite(img, 765, 0, 255, 103),
                    new Entities.helpers.Sprite(img, 0, 128, 255, 103),
                    new Entities.helpers.Sprite(img, 255, 128, 255, 103),
                    new Entities.helpers.Sprite(img, 510, 128, 255, 103),
                    new Entities.helpers.Sprite(img, 255, 128, 255, 103),
                    new Entities.helpers.Sprite(img, 0, 128, 255, 103),
                    new Entities.helpers.Sprite(img, 765, 0, 255, 103),
                    new Entities.helpers.Sprite(img, 510, 0, 255, 103),
                    new Entities.helpers.Sprite(img, 255, 0, 255 , 103),
                    new Entities.helpers.Sprite(img, 0, 0, 255, 103),

                   // new Entities.helpers.Sprite(img, 147, 0, 10, 14)],
                    ],
                    currentFrame:0
                },

                stand:  new Entities.helpers.Sprite(img, 765, 128, 255, 103),

            };

            this.states = {
                watering:{
                    animation: function (data){
                        if(data.animationFrame % 5 === 0) {
                            self.sprite = self.spriteAnimations.water.frames[self.spriteAnimations.water.currentFrame];
                            self.spriteAnimations.water.currentFrame++;
                            if(self.spriteAnimations.water.currentFrame > 12){
                                    self.sprite = self.spriteAnimations.stand;
                                    self.currentState = self.states.standing;

                                } 
                        }
                    }
                },

                standing:{ 
                    animation : function(data) {

                    self.sprite = self.spriteAnimations.stand;

                }
            }
        }
            this.currentState = self.states.standing;
            this.type = "fire hydrant";
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
    },
    MagicDrop: function (img, x,y, w, h) {
            var self = this;
            this.type = "MagicDrop";
            this.sound = new Audio('audio/smb_coin.wav');
            this.sprite = new Entities.helpers.Sprite(img, 0, 0, 58.6, 83);
            this.spriteAnimations = {
                spin: {
                    frames: [
                    new Entities.helpers.Sprite(img, 0, 0, 58.6, 83),
                    new Entities.helpers.Sprite(img, 58.6, 0, 58.6, 83),
                    new Entities.helpers.Sprite(img, 117.2, 0, 58.6, 83),
                    new Entities.helpers.Sprite(img, 175.8, 0, 58.6, 83),
                    new Entities.helpers.Sprite(img, 234.4, 0, 58.6, 83),
                    new Entities.helpers.Sprite(img, 0, 96, 58.6, 83),
                    new Entities.helpers.Sprite(img, 58.6, 96, 58.6, 83),
                    new Entities.helpers.Sprite(img, 117.2, 96, 58.6, 83),
                    new Entities.helpers.Sprite(img, 175.8, 96, 58.6, 83),
                    new Entities.helpers.Sprite(img, 234.4, 96, 58.6, 83),
                    new Entities.helpers.Sprite(img, 0, 190, 58.6, 83),
                    new Entities.helpers.Sprite(img, 58.6, 190, 58.6, 83),
                    new Entities.helpers.Sprite(img, 117.2, 190, 58.6, 83),
                    new Entities.helpers.Sprite(img, 175.8, 190, 58.6, 83),
                    new Entities.helpers.Sprite(img, 234.4, 190, 58.6, 83),
                    new Entities.helpers.Sprite(img, 0, 186, 58.6, 83),
                    new Entities.helpers.Sprite(img, 58.6, 186, 58.6, 83),
                    new Entities.helpers.Sprite(img, 117.2, 186, 58.6, 83),
                    new Entities.helpers.Sprite(img, 175.8, 186, 58.6, 83),
                    new Entities.helpers.Sprite(img, 234.4, 186, 58.6, 83),
                    ],
                    currentFrame:0
                }
            };
            this.states = {
                spinning:{
                    animation: function (data){
                        if(data.animationFrame % 15 === 0) {
                            self.sprite = self.spriteAnimations.spin.frames[self.spriteAnimations.spin.currentFrame];
                            self.spriteAnimations.spin.currentFrame++;

                            if(self.spriteAnimations.spin.currentFrame > 19) {
                                self.spriteAnimations.spin.currentFrame = 0;
                            }
                        }
                    }
                }
            }
            this.currentState = self.states.spinning;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.type = "magic drop";
        },

    Volume:function (img, x,y, w, h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            var self = this;
            this.spriteAnimations = {
                on: new Entities.helpers.Sprite(img, 120, 0, 85, 65),
                off: new Entities.helpers.Sprite(img, 0, 0, 85, 65) 

            }
            this.states = {
                volumeOn: {
                    animation: function(data) {
                self.sprite = self.spriteAnimations.on;
            }
                },
                volumeOff: {
                    animation: function(data) {
                self.sprite = self.spriteAnimations.off;
            }
                },
             }
            this.currentState = self.states.volumeOn;
}

}
}
