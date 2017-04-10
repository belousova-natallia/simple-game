var Physics = {

update: function (data) {
    Physics.helpers.gravity(data.entities.mariya);
    Physics.collisionDetection(data);

},

collisionDetection:function (data){
    var mariya = data.entities.mariya;

    var fireArray = data.entities.fireArray;
    var hydrantArray = data.entities.hydrantArray;

    

var fireHydrantDetection = function (hydrant){

    
        fireArray.forEach(function(fire){
            if(hydrant.x < fire.x + fire.w &&
        hydrant.x + hydrant.w > fire.x &&
        hydrant.y < fire.y + fire.h &&
        hydrant.h + hydrant.y > fire.y){
        //Collision orrured
        Physics.handleFireHydrantCollision(hydrant, fire);
    }
       
    })
}

var entityCollisionCheck = function (entity) {
    if(mariya.x < entity.x + entity.w &&
        mariya.x + mariya.w > entity.x &&
        mariya.y < entity.y + entity.h &&
        mariya.h + mariya.y > entity.y){
        //Collision orrured
        Physics.handleCollision(data, entity);
    }
};

var hydrantCollisionCheck = function (entity) {
    if (mariya.x < entity.x + entity.w - 194 &&
        mariya.x + mariya.w > entity.x &&
        mariya.y < entity.y + entity.h &&
        mariya.h + mariya.y > entity.y ){
        //Collision orrured
        Physics.handleHydrantCollision(data, entity);
}
}

data.entities.wallArray.forEach(function (wall) {
    entityCollisionCheck(wall);
});
data.entities.coinsArray.forEach(function (coin) {
    entityCollisionCheck(coin);
});
data.entities.waterDropArray.forEach(function (drop) {
    entityCollisionCheck(drop);
});
data.entities.fireArray.forEach(function (fire) {
    entityCollisionCheck(fire);
});
data.entities.hydrantArray.forEach(function (hydrant) {
    hydrantCollisionCheck(hydrant);
    fireHydrantDetection (hydrant);

});

data.entities.tilesArray.forEach(function(tilesArr){
    tilesArr.forEach(function(thistile){
          entityCollisionCheck(thistile)
    })
    }) ;

},

handleFireHydrantCollision: function(hydrant, fire ) {
if(hydrant.currentState === hydrant.states.watering){

    setTimeout(function() {
               fire.h = 0 ;
               fire.w = 0;
               fire.x = 0;
               fire.y = 0;
                }, 700 );
    
}
},


handleHydrantCollision: function (data, entity) {
        var mariya = data.entities.mariya;
       if(entity.type === "fire hydrant")   {

            if (mariya.y < entity.y && (mariya.x + mariya.w) > entity.x + 10 &&
                mariya.x < (entity.x + entity.w) - 194 - 10 && mariya.velY >= 0 )  {            
                              
                mariya.y = entity.y - mariya.h + 10;
                mariya.velY = 0;
                if ( Game.dropMagic === true){
                entity.currentState = entity.states.watering;
             
            Game.dropMagic = false; 

            }    
        }

                  //Left Side Wall Collision
           else if (mariya.x < entity.x && mariya.y >= entity.y) {
                mariya.x = entity.x - mariya.w;
            }

            else if (mariya.x < entity.x && mariya.y < entity.y) {
                mariya.x = entity.x - mariya.w;
            }
            //Right Side Wall Collision
           else if (mariya.x > entity.x - 194) {
                mariya.x = entity.x + entity.w - 194;
            }
    }    

}, 

handleCollision: function (data, entity) {
    var mariya = data.entities.mariya;

    if(entity.type === "coin") {
        var coinsArray = data.entities.coinsArray;
        var coinSound = entity.sound.cloneNode();
        var index = coinsArray.indexOf(entity);

        data.entities.score.value += 1;

        coinSound.play();
        coinsArray.splice(index, 1);

        if(data.entities.score.value % 40 === 0) {
                    data.entities.lives.value += 1
                }
    }

if(entity.type === "magic drop") {
        var waterDropArray = data.entities.waterDropArray;
        var magicSound = entity.sound.cloneNode();
        var index = waterDropArray.indexOf(entity);
        magicSound.play();
        waterDropArray.splice(index, 1);
        
            Game.dropMagic = true;
    }



if(entity.type === "fire" && data.entities.lives.value > 0){

    if( ((mariya.x + mariya.w) > entity.x + 30 && mariya.x < entity.x && mariya.y + mariya.h > entity.y + entity.h - 10)
        || (mariya.x < entity.x + entity.w - 30 && mariya.x > entity.x && mariya.y + mariya.h > entity.y + entity.h -10)
         ) {

                Game.backgroundMusic.pause();
                    
                data.entities.tilesArray = [];
                data.entities.fireArray = [];
                data.entities.coinsArray = [];
                data.entities.hydrantArray = [];
                data.entities.waterDropArray = [];
                mariya.currentState = mariya.states.standing;
                data.entities.makeTiles(50,50, 300,300, 2, 10);
              
                mariya.x = 50;
                mariya.y = 300 - mariya.h;

                mariya.velY = 0;
                data.entities.lives.value -= 1;
                if( data.entities.lives.value > 0){
                data.entities.lives.sound.play();
                Game.fps = 0.18

                setTimeout(function() {
                Game.fps = 1000;
               Game.backgroundMusic.play();
                }, 1000 / Game.fps);
     
                    }
                else data.entities.lives.soundEnd.play();

            }

}

if (entity.type === "tile") {
            
 //Top of Wall Collision
            if (mariya.y < entity.y && (mariya.x + mariya.w) > entity.x + 20 &&
                mariya.x < (entity.x + entity.w) - 20 && mariya.velY >= 0)  {            
                              
                mariya.y = entity.y - mariya.h;
                mariya.velY = 0;



            }
        
        }

if (entity.type === "wall") {

            //falled from tile
            if (mariya.y < entity.y && (mariya.x + mariya.w) > entity.x + 10 &&
                mariya.x < (entity.x + entity.w) - 10 && mariya.velY >= 0) {
            //    mariya.currentState = mariya.states.standing;
                Game.backgroundMusic.pause();

                data.entities.tilesArray = [];
                data.entities.fireArray = [];
                data.entities.coinsArray = [];
                data.entities.hydrantArray = [];
                data.entities.waterDropArray = [];

               data.entities.makeTiles(50,50, 300,300, 2, 10);
              
                mariya.x = 50;
                mariya.y = 300 - mariya.h;
                mariya.currentState = mariya.states.standing;

                mariya.velY = 0;
                data.entities.lives.value -= 1;
                if( data.entities.lives.value > 0){
                data.entities.lives.sound.play();
                Game.fps = 0.18

                setTimeout(function() {
                Game.fps = 1000;
                Game.backgroundMusic.play();
                }, 1000 / Game.fps);
     
                    } else data.entities.lives.soundEnd.play();              
}             
            }

    
},

helpers: {
    gravity: function (entity) {
        entity.velY +=1.2;
        entity.y += entity.velY;
    }
}
};
