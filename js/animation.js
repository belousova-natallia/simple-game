var Animation = {
    update: function(data){
        Animation.mariya(data);
        Animation.coins(data);
        Animation.fire(data);
        Animation.water(data);
        Animation.waterdrop(data);
        Animation.volume(data);

    },
    mariya: function (data) {
        data.entities.mariya.currentState.animation(data);
    },
    volume: function (data) {
        data.entities.volume.currentState.animation(data);
    },

    coins: function(data) {
        data.entities.coinsArray.forEach(function(coin) {
            coin.currentState.animation(data);
        });
    },
    waterdrop: function(data) {
        data.entities.waterDropArray.forEach(function(drop) {
            drop.currentState.animation(data);
        });
    },

    fire: function(data) {
        data.entities.fireArray.forEach(function(f) {
            f.currentState.animation(data);
        });
    },
    water: function(data) {
        data.entities.hydrantArray.forEach(function(f) {
            f.currentState.animation(data);
        });
    },
};
