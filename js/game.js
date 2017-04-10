var Game = {
    init: function () {
        var parent = document.getElementById("place-canvas")
        var canvas1 = document.createElement('canvas');
        canvas1.id = "bg1-canvas";
        canvas1.width = 800;
        canvas1.height = 480;
        parent.appendChild(canvas1);

        var canvas2 = document.createElement('canvas');
        canvas2.id = "fg-canvas";
        canvas2.width = 800;
        canvas2.height = 480;
        parent.appendChild(canvas2);
      
        var bg1Canvas = document.getElementById("bg1-canvas");
        var fgCanvas = document.getElementById("fg-canvas");

        var canvas = {
            bg1Canvas: bg1Canvas,
            
            fgCanvas: fgCanvas,
            bg1Ctx: bg1Canvas.getContext("2d"),
            
            fgCtx: fgCanvas.getContext("2d")
        };

        
        var spriteSheet1 = new Image();
        spriteSheet1.src = "img/JnRLayer1.png";

        var spriteSheet2 = new Image();
        spriteSheet2.src = "img/JnRLayer2.png";

        var spriteSheet3 = new Image();
        spriteSheet3.src = "img/JnRLayer3.png";
        var spriteSheet4 = new Image();
        spriteSheet4.src = "img/JnRLayer4.png";

        var spriteSheetDimonds = new Image();
        spriteSheetDimonds.src = "img/dimonds.gif";

        var spriteSheetMariya = new Image();
        spriteSheetMariya.src = "img/mariya.gif";

        var spriteSheetTiles = new Image();
        spriteSheetTiles.src = "img/JnRTiles.png";

        var spriteSheetFire = new Image();
        spriteSheetFire.src = "img/fire.png" 

        var spriteSheetHydrant = new Image();
        spriteSheetHydrant.src = "img/fire-hydrant-water.gif";

        var spriteSheetWaterDrop = new Image();
        spriteSheetWaterDrop.src = "img/magicdrop.png";

        var spriteFinish = new Image();
        spriteFinish.src = "img/finish.png";

        var spriteSheetVolume = new Image();
        spriteSheetVolume.src = "img/volume.gif";

       spriteSheet1.addEventListener("load", function () {
            var spriteSheet1 = this;

            var data = {
                animationFrame: 0,
                spriteSheet1: spriteSheet1,
                spriteSheet2: spriteSheet2,
                spriteSheet3: spriteSheet3,
                spriteSheet4: spriteSheet4,
                spriteSheetDimonds: spriteSheetDimonds,
                spriteSheetMariya: spriteSheetMariya, 
                spriteSheetTiles: spriteSheetTiles,
                spriteSheetFire: spriteSheetFire,
                spriteSheetHydrant: spriteSheetHydrant,
                spriteSheetWaterDrop: spriteSheetWaterDrop,
                spriteFinish:  spriteFinish,
                spriteSheetVolume: spriteSheetVolume,
                canvas: canvas
            };
            Game.backgroundMusic.loop = true;

            Game.backgroundMusic.play();

            Input.init(data);
            Entities.init(data);
            Render.init(data);
            Game.run(data);
        });
    },
    backgroundMusic: new Audio("audio/underground_theme.mp3"), 

    getToTheFinalMusic : new Audio("audio/chearing.mp3"),


    fps: 1000,

    endPoint: 7500,

    dropMagic: false,

    run: function(data){
        
        var loop = function(){
            Game.input(data);
            Game.update(data);
            Game.render(data);

            data.animationFrame++;


            if(data.entities.tilesArray[data.entities.tilesArray.length-1][data.entities.tilesArray[data.entities.tilesArray.length-1].length-1].x < data.entities.mariya.x + 450
            && data.entities.lives.value > 0 && data.entities.mariya.realCoordinate < Game.endPoint - 1200){

                var minX = data.entities.tilesArray[data.entities.tilesArray.length-1][data.entities.tilesArray[data.entities.tilesArray.length-1].length-1].x + 90;
                var maxX = data.entities.tilesArray[data.entities.tilesArray.length-1][data.entities.tilesArray[data.entities.tilesArray.length-1].length-1].x + 120;
                var minY = data.entities.tilesArray[data.entities.tilesArray.length-1][0].y - 100;

                if(minY < 300) {
                    minY = 300
                }

                var maxY = data.entities.tilesArray[data.entities.tilesArray.length-1][0].y + 100;
                if(maxY > 450) maxY = 450

                data.entities.makeTiles(minX,maxX, minY, maxY, 0, 10);

                }
       
            if (data.entities.mariya.realCoordinate > Game.endPoint - 1200&& 
                data.entities.tilesArray[data.entities.tilesArray.length-1].length < 15 ) {

                var minX = data.entities.tilesArray[data.entities.tilesArray.length-1][data.entities.tilesArray[data.entities.tilesArray.length-1].length-1].x + 90;
                var maxX = data.entities.tilesArray[data.entities.tilesArray.length-1][data.entities.tilesArray[data.entities.tilesArray.length-1].length-1].x + 120;
                 var minY = data.entities.tilesArray[data.entities.tilesArray.length-1][0].y - 100;

                if(minY < 200) {
                    minY = 200
                }

                var maxY = data.entities.tilesArray[data.entities.tilesArray.length-1][0].y + 100;
                if(maxY > 420) maxY = 420

                
                data.entities.makeTiles(minX, maxX, minY, maxY, 40, 40);
          
                data.entities.coinsArray.pop();
                data.entities.fireArray.pop() ;
                data.entities.hydrantArray.pop() ;
                data.entities.waterDropArray.pop();
            

         //   data.entities.mariya.y = data.entities.tilesArray[0][0].y - data.entities.mariya.h;        

}
                if(data.entities.tilesArray[0][data.entities.tilesArray[0].length - 1].x < -60){
                    data.entities.tilesArray.shift();
                }
                if(data.entities.coinsArray[0] && data.entities.coinsArray[0].x < -10){
                    data.entities.coinsArray.shift();
                }
                if(data.entities.waterDropArray[0] && data.entities.waterDropArray[0].x < -10){
                    data.entities.waterDropArray.shift();
                }

                if(data.entities.fireArray[0] && data.entities.fireArray[0].x < -50){
                    data.entities.fireArray.shift();
                }

                if(data.entities.hydrantArray[0] && data.entities.hydrantArray[0].x < -50){
                    data.entities.hydrantArray.shift();
                }

                
                    /////////////

                                    if(data.entities.volume.currentState === data.entities.volume.states.volumeOff){
                    Game.backgroundMusic.pause();

                }
                else if(data.entities.lives.sound.paused && data.entities.lives.soundEnd.paused &&
                    Game.getToTheFinalMusic.paused && data.entities.volume.currentState === data.entities.volume.states.volumeOn
                    && data.entities.mariya.x < data.canvas.w ){
                    Game.backgroundMusic.play();}

                var elem = document.getElementById('fg-canvas');
                if (elem){
                var elemLeft = elem.offsetLeft;
                var elemTop = elem.offsetTop;
                   
             // Add event listener for `click` events.
                elem.addEventListener('click', function(event) {
                var x = event.pageX - elemLeft,
                    y = event.pageY - elemTop;
     
        if (y > 0 && y < 5 + 35 && x > 735 && x < 740 + 45) {

            if(data.entities.volume.currentState === data.entities.volume.states.volumeOff){
                data.entities.volume.currentState = data.entities.volume.states.volumeOn
            } else{
                data.entities.volume.currentState = data.entities.volume.states.volumeOff
            }
        }
  

}, false);

}

                    ////////////
                
           setTimeout(function() {
            window.requestAnimationFrame(loop);
            }, 1000 / Game.fps);
     
        };

        loop();


    },
    input: function(data) {
        Input.update(data);

    },
    update: function(data) {
        Animation.update(data);
        Movement.update(data);
        Physics.update(data);

    },
    render:function(data) {
        Render.update(data);
    }

};

//Game.init();
