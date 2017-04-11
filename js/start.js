
var elem = document.getElementById('mycanvas'),
    elemLeft = elem.offsetLeft,
    elemTop = elem.offsetTop,
    context = elem.getContext('2d');

        context.rect(0,0, elem.width, elem.height);
        context.fillStyle = 'rgba(100,150,185,0.8)';
        context.fill();
        
        context.fillStyle = "rgba(100,150,185,1)";
        context.fillRect(150, 150, 475, 150);

        context.strokeStyle = "MediumVioletRed";
        context.strokeRect(150, 150, 475, 150);

        context.font = '75px PixelEmulator';
        context.fillStyle = "MediumVioletRed";
        context.fillText("Start the game", 170, 250);


// Add event listener for `click` events.
    elem.addEventListener('click', function(event) {
    var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;
    console.log(x, y);
    
        if (y > 150 && y < 150 + 150 && x > 150 && x < 150 + 475) {
            
            Game.init();
        }
 

}, false);





