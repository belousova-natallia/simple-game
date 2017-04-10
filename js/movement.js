var Movement = {
    update : function (data){
        
        Movement.mariya(data);
        Movement.background4(data);
        Movement.background4Extend(data);
        Movement.background3(data);
        Movement.background3Extend(data);
        Movement.background2(data);
        Movement.background2Extend(data);
        Movement.movingFire(data);

    },
    mariya: function (data) {
        data.entities.mariya.currentState.movement(data);

    },
    background4: function (data) {
        data.entities.background4.currentState.movement(data);

},
    background4Extend: function (data) {
        data.entities.background4Extend.currentState.movement(data);

},
    background3: function (data) {
        data.entities.background3.currentState.movement(data);

},
    background3Extend: function (data) {
        data.entities.background3Extend.currentState.movement(data);

},
    background2: function (data) {
        data.entities.background2.currentState.movement(data);

},
    background2Extend: function (data) {
        data.entities.background2Extend.currentState.movement(data);

},

    movingFire: function (data){
         data.entities.fireArray.forEach(function(f) {
            f.currentState.movement(data);
        });
    }

}
