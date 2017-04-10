var Render = {
    init: function(data) {
        Render.helpers.drawEntity(data.entities.background1, data.canvas.bg1Ctx);
            } ,
    update: function (data) {
        data.canvas.fgCtx.clearRect(0,0, data.canvas.fgCanvas.width, data.canvas.fgCanvas.height);
        Render.helpers.drawText(data.entities.score, data.canvas.fgCtx);

        Render.helpers.drawText(data.entities.lives, data.canvas.fgCtx);

        Render.helpers.drawEntity(data.entities.background2, data.canvas.fgCtx);
        Render.helpers.drawEntity(data.entities.background2Extend, data.canvas.fgCtx);
        Render.helpers.drawEntity(data.entities.background3, data.canvas.fgCtx);
        Render.helpers.drawEntity(data.entities.background3Extend, data.canvas.fgCtx);
        Render.helpers.drawEntity(data.entities.background4, data.canvas.fgCtx);
        Render.helpers.drawEntity(data.entities.background4Extend, data.canvas.fgCtx);
        Render.helpers.drawEntity(data.entities.volume, data.canvas.fgCtx);

        
        

        data.entities.coinsArray.forEach(function(coin) {
            Render.helpers.drawEntity(coin, data.canvas.fgCtx);
        });
        data.entities.waterDropArray.forEach(function(drop) {
            Render.helpers.drawEntity(drop, data.canvas.fgCtx);
        });

            if(data.entities.mariya.realCoordinate > Game.endPoint){
        data.canvas.fgCtx.drawImage( data.spriteFinish, 0, 0, 140, 172, 600, data.entities.tilesArray[data.entities.tilesArray.length-1][0].y - 239, 140, 240)
       }

                data.entities.tilesArray.forEach(function(tile) {
            tile.forEach(function(thisTile){
                Render.helpers.drawEntity(thisTile, data.canvas.fgCtx);
            })
           
        });
                if(data.entities.mariya.realCoordinate < Game.endPoint){
        data.entities.fireArray.forEach(function(fire) {
            Render.helpers.drawEntity(fire, data.canvas.fgCtx);
        });
            }

        
        data.entities.hydrantArray.forEach(function(hydrant) {
            Render.helpers.drawEntity(hydrant, data.canvas.fgCtx);
        });

        Render.helpers.drawEntity(data.entities.mariya, data.canvas.fgCtx);


    

    if(data.entities.lives.value < 1 && data.entities.mariya.realCoordinate < Game.endPoint + 200){
        data.canvas.fgCtx.rect(0,0, data.canvas.fgCanvas.width, data.canvas.fgCanvas.height);
        data.canvas.fgCtx.fillStyle = 'rgba(100,150,185,0.8)';
        data.canvas.fgCtx.fill();
        data.canvas.fgCtx.font = '70px PixelEmulator';
        data.canvas.fgCtx.fillStyle = "MediumVioletRed";
        data.canvas.fgCtx.fillText("Game over", 160, 200);


        data.canvas.fgCtx.fillStyle = "rgba(100,150,185,1)";
        data.canvas.fgCtx.fillRect(200, 300, 400, 80);

        data.canvas.fgCtx.strokeStyle = "MediumVioletRed";
        data.canvas.fgCtx.strokeRect(200, 300, 400, 80);


        data.canvas.fgCtx.font = '40px PixelEmulator';
        data.canvas.fgCtx.fillStyle = "MediumVioletRed";
        data.canvas.fgCtx.fillText("Play again", 250, 350);


        var elem = document.getElementById('fg-canvas');
        var elemLeft = elem.offsetLeft;
        var elemTop = elem.offsetTop;
       
        

// Add event listener for `click` events.
    elem.addEventListener('click', function(event) {
    var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;
     
        if (y > 300 && y < 300 + 80 && x > 200 && x < 200 + 400) {

            var bg = document.getElementById('bg1-canvas');
            var fg = document.getElementById('fg-canvas');
            
               bg.remove();
               fg.remove();
        }
  

}, false);

}

if (data.entities.mariya.realCoordinate > Game.endPoint && data.entities.mariya.x > data.entities.background4.w + data.entities.background4.w/2 ){
data.canvas.fgCtx.rect(0,0, data.canvas.fgCanvas.width, data.canvas.fgCanvas.height);
        data.canvas.fgCtx.fillStyle = 'rgba(100,150,185,0.8)';
        data.canvas.fgCtx.fill();

        var pic = new Image();         
        pic.src = 'img/congr.png';  
        data.canvas.fgCtx.drawImage(pic, 100, 0, 600, 300);  
   


        data.canvas.fgCtx.fillStyle = "rgba(100,150,185,1)";
        data.canvas.fgCtx.fillRect(200, 300, 400, 80);

        data.canvas.fgCtx.strokeStyle = "MediumVioletRed";
        data.canvas.fgCtx.strokeRect(200, 300, 400, 80);


        data.canvas.fgCtx.font = '40px PixelEmulator';
        data.canvas.fgCtx.fillStyle = "MediumVioletRed";
        data.canvas.fgCtx.fillText("Play again", 250, 350);


        var elem = document.getElementById('fg-canvas');
        var elemLeft = elem.offsetLeft;
        var elemTop = elem.offsetTop;
       
        

// Add event listener for `click` events.
    elem.addEventListener('click', function(event) {
    var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;
    console.log(x, y);
    
        if (y > 300 && y < 300 + 80 && x > 200 && x < 200 + 400) {
            

           var bg = document.getElementById('bg1-canvas');
           
            var fg = document.getElementById('fg-canvas');
            
               bg.remove();
               fg.remove();
         }
  
}, false);
}


    
    data.canvas.bg1Ctx.fillStyle = "MediumVioletRed";
    data.canvas.bg1Ctx.strokeStyle = "MediumVioletRed";
    data.canvas.bg1Ctx.strokeRect(450, 13, Game.endPoint/30 + 8, 9);
    data.canvas.bg1Ctx.fillRect(449 + data.entities.mariya.realCoordinate/30, 13, 10, 10)

},

    helpers: {

        drawEntity: function(entity, ctx) {
            ctx.drawImage(entity.sprite.img,
                entity.sprite.srcX, entity.sprite.srcY,
                entity.sprite.srcW, entity.sprite.srcH,
                entity.x, entity.y,
                entity.w, entity.h);
        },

        drawText: function(text, ctx) {
            ctx.font = text.size + " " + text.font;
            ctx.fillStyle = text.color;
            ctx.fillText(text.text + " " + text.value, text.x, text.y);



        },

    }
};
