

var estadoGameOver = {
	 create: function () {
        var gameoverLabel = stateText = game.add.text(500, 300, ' ', {font: '50px Arial', fill: '#F2F2F2'});
        stateText.anchor.setTo(1.1, 0.2);
    },

    update: function () {
      
            stateText.text = " PUNTOS: "+$("#score-text").text()+" \n MOVIMIENTOS: "+$("#movimientos-text").text();
            stateText.visible = true;

    }
};

