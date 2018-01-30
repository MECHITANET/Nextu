//var juego =  new Phaser.Game(370, 550, Phaser.Canvas, 'bloque_juego');
//creamos el escenario del juego
var game =  new Phaser.Game(840,840, Phaser.Canvas, 'panel-tablero');
var cantMovimientos = 0;


var estadoPrincipal = {
	preload: function(){
		// carga todos los recursos
		game.load.image('dulce1', 'image/1.png');
    	game.load.image('dulce2', 'image/2.png');
	    game.load.image('dulce3', 'image/3.png');
    	game.load.image('dulce4', 'image/4.png');
	},
	create: function(){
		//mostrar en pantalla
		var me = this;
 
    
    	me.game.stage.backgroundColor = "rgba(0,0,0,.5)";
    	// me.game.stage.backgroundColor = 'rgba(255, 255,255, 0.5)';
 
    	//Declarar activos que serán utilizados como tiles
    	me.tileTypes = [
	        'dulce1',
	        'dulce2',
	        'dulce3',
	        'dulce4'
	    ];
		

    //Mantenga un registro de la puntuación de los usuarios
    me.score = 0;
    cantMovimientos = 0;
 
    //Mantenga un registro de las teselas que el usuario está tratando de intercambiar (si las hay)
    me.activeTile1 = null;
    me.activeTile2 = null;
 
    //Controla si el jugador puede hacer un movimiento o no
    me.canMove = false;
 
    //Agarre el peso y la altura de los azulejos (se supone el mismo tamaño para todos los azulejos)
    me.tileWidth = me.game.cache.getImage('dulce1').width;
    me.tileHeight = me.game.cache.getImage('dulce1').height;


 
    //Esto mantendrá todos los sprites del dulce
    me.tiles = me.game.add.group();
 
    //Inicializar la cuadrícula de mosaico, esta matriz mantendrá las posiciones de las teselas
    //Crea la forma que quieras, para el ejemplo 7x7
    me.tileGrid = [
        [null, null, null, null, null, null,null],
        [null, null, null, null, null, null,null],
        [null, null, null, null, null, null,null],
        [null, null, null, null, null, null,null],
        [null, null, null, null, null, null,null],
        [null, null, null, null, null, null,null],
        [null, null, null, null, null, null,null]
    ];
 
    //Crear un generador de datos aleatorios para usar más tarde
    var seed = Date.now();
    me.random = new Phaser.RandomDataGenerator([seed]);

    me.initTiles();
    me.createScore();

	},
	update:function(){
		//Animamos el juego.
		 var me = this;
 
	    //El usuario actualmente está arrastrando desde un mosaico, así que vamos a ver si se han arrastrado
// sobre la parte superior de un mosaico adyacente
	    if(me.activeTile1 && !me.activeTile2){
	 
	        //Obtener la ubicación de donde está el puntero actualmente
	        var hoverX = me.game.input.x;
	        var hoverY = me.game.input.y;
	 
	        // Descubre qué posición en la grilla se traduce a
	        var hoverPosX = Math.floor(hoverX/me.tileWidth);
	        var hoverPosY = Math.floor(hoverY/me.tileHeight);
	 
	       // Ver si el usuario se ha arrastrado a otra posición en la grilla
	        var difX = (hoverPosX - me.startPosX);
	        var difY = (hoverPosY - me.startPosY);
	 
	       // Asegúrate de que estamos dentro de los límites de la grilla
	        if(!(hoverPosY > me.tileGrid[0].length - 1 || hoverPosY < 0) && !(hoverPosX > me.tileGrid.length - 1 || hoverPosX < 0)){
	 
	           // Si el usuario ha arrastrado un ancho o alto completo en la dirección xo y
// desencadenar un intercambio de teselas
	            if((Math.abs(difY) == 1 && difX == 0) || (Math.abs(difX) == 1 && difY ==0)){
	 
	                // Evita que el jugador haga más movimientos mientras la comprobación está en progreso
	                me.canMove = false;
	 
	                // Establecer el segundo mosaico activo (aquel al que el usuario arrastró)
	                me.activeTile2 = me.tileGrid[hoverPosX][hoverPosY];
	 
	                //contamos los movimientos
	                cantMovimientos++; 
	                $("#movimientos-text").text(cantMovimientos);

	               
// Cambiar las dos fichas activas
	                
	                me.swapTiles();
	 
	                // Después de que se haya producido el intercambio, revisa la cuadrícula para ver si hay coincidencias
	                me.game.time.events.add(500, function(){
	                    me.checkMatch();
	                });
	            }
	 
	        }
	 
	    }

	    
		
	},
	initTiles: function(){
 
	    var me = this;
	 
	    // Loop a través de cada columna en la grilla

	 
	    for(var i = 0; i < me.tileGrid.length; i++){
	 
	       // Pasa por cada posición en una columna específica, empezando por la parte superior
	        for(var j = 0; j < me.tileGrid.length; j++){
	 
	 		
	          // Agrega el mosaico al juego en esta posición de cuadrícula
	            var tile = me.addTile(i, j);
	 			
	           // Mantenga un registro de la posición de los mosaicos en nuestro tileGrid
	            me.tileGrid[i][j] = tile;
	 
	        }
	    }
	 
	   // Una vez que las fichas están listas, busca cualquier coincidencia en la grilla
	    me.game.time.events.add(600, function(){
	        me.checkMatch();
	    });
	 
	},
	addTile: function(x, y){
	 
	    var me = this;
	 
	  // Elige un mosaico aleatorio para agregar
	   var tileToAdd = me.tileTypes[me.random.integerInRange(0, me.tileTypes.length - 1)];
	 
	    // Agrega el mosaico en la posición x correcta, pero agrégalo a la parte superior del juego (para que podamos deslizarlo)
	    var tile = me.tiles.create((x * me.tileWidth) + me.tileWidth / 2, 0, tileToAdd);
	 
	 
	   // // Animar la ficha en la posición vertical correcta
	    me.game.add.tween(tile).to({y:y*me.tileHeight+(me.tileHeight/2)}, 500, Phaser.Easing.Linear.In, true)
	 
	   // // Establecer el punto de anclaje de los mosaicos al centro
	    tile.anchor.setTo(0.5, 0.5);
	 
	  
// // Habilitar entrada en el mosaico
	     tile.inputEnabled = true;
	 
	    // // Realizar un seguimiento del tipo de mosaico que se agregó
	     tile.tileType = tileToAdd;
	 
	  // // Activa la función tileDown cada vez que el usuario hace clic o toca en esta ficha
	     tile.events.onInputDown.add(me.tileDown, me);
	 
	    return tile;
	 
	},
	tileDown: function(tile, pointer){
 
	    var me = this;
	 
// Realizar un seguimiento de donde el usuario hizo clic originalmente
	    if(me.canMove){
	        me.activeTile1 = tile;
	 
	        me.startPosX = (tile.x - me.tileWidth/2) / me.tileWidth;
	        me.startPosY = (tile.y - me.tileHeight/2) / me.tileHeight;
	    }
	 
	},
	checkMatch: function(){
	 
	    var me = this;
	 
	    // Llamar a la función getMatches para buscar puntos donde hay
// una corrida de tres o más fichas en una fila
	    var matches = me.getMatches(me.tileGrid);
	 
	   // Si hay coincidencias, elimínelas
	    if(matches.length > 0){
	 
	      // Eliminar las fichas
	        me.removeTileGroup(matches);
	 
	       // Mueve las fichas actualmente en el tablero a sus nuevas posiciones
	        me.resetTile();
	 
	       // Llene la pizarra con nuevas fichas donde haya un lugar vacío
	        me.fillTile();
	 
	      // Activa el evento tileUp para restablecer las fichas activas
	        me.game.time.events.add(500, function(){
	            me.tileUp();
	        });
	 
	        // Comprueba nuevamente si el reposicionamiento de las teselas provocó nuevas coincidencias
	        me.game.time.events.add(600, function(){
	            me.checkMatch();
	        });
	 
	    }
	    else {
	 
	       
// Sin coincidencia, solo cambia las fichas a su posición original y restablece
	        me.swapTiles();
	        me.game.time.events.add(500, function(){
	            me.tileUp();
	            me.canMove = true;
	        });
	    }
	 
	},
	fillTile: function(){
 
	    var me = this;
	 
	    // Busca espacios en blanco en la cuadrícula y agrega nuevos mosaicos en esa posición
	    for(var i = 0; i < me.tileGrid.length; i++){
	 
	        for(var j = 0; j < me.tileGrid.length; j++){
	 
	            if (me.tileGrid[i][j] == null)
	            {
// Encontré un espacio en blanco, así que vamos a agregar animar un mosaico allí
	                var tile = me.addTile(i, j);
	 
	              // Y también actualiza nuestra grilla "teórica"
	                me.tileGrid[i][j] = tile;
	            }
	 
	        }
	    }
	 
	},
		tileUp: function(){
	 
// Restablece las fichas activas
	    var me = this;
	    me.activeTile1 = null;
	    me.activeTile2 = null;
	 
	},
		swapTiles: function(){
 
	    var me = this;
	 
	 
// Si hay dos fichas activas, intercambia sus posiciones
	    if(me.activeTile1 && me.activeTile2){
	 
	        var tile1Pos = {x:(me.activeTile1.x - me.tileWidth / 2) / me.tileWidth, y:(me.activeTile1.y - me.tileHeight / 2) / me.tileHeight};
	        var tile2Pos = {x:(me.activeTile2.x - me.tileWidth / 2) / me.tileWidth, y:(me.activeTile2.y - me.tileHeight / 2) / me.tileHeight};
	 
	      // Cambiarlos en nuestra grilla "teórica"
	        me.tileGrid[tile1Pos.x][tile1Pos.y] = me.activeTile2;
	        me.tileGrid[tile2Pos.x][tile2Pos.y] = me.activeTile1;
	 
	       // En realidad, moverlos a la pantalla
	        me.game.add.tween(me.activeTile1).to({x:tile2Pos.x * me.tileWidth + (me.tileWidth/2), y:tile2Pos.y * me.tileHeight + (me.tileHeight/2)}, 200, Phaser.Easing.Linear.In, true);
	        me.game.add.tween(me.activeTile2).to({x:tile1Pos.x * me.tileWidth + (me.tileWidth/2), y:tile1Pos.y * me.tileHeight + (me.tileHeight/2)}, 200, Phaser.Easing.Linear.In, true);
	 
	        me.activeTile1 = me.tileGrid[tile1Pos.x][tile1Pos.y];
	        me.activeTile2 = me.tileGrid[tile2Pos.x][tile2Pos.y];
	 
	    }
	 
	},
	resetTile: function(){
 
    var me = this;
 
   // Pasa por cada columna comenzando desde la izquierda
    for (var i = 0; i < me.tileGrid.length; i++)
    {
 
       // Pasa por cada azulejo en columna de abajo hacia arriba
        for (var j = me.tileGrid[i].length - 1; j > 0; j--)
        {
 
            // Si este espacio está en blanco, pero el que está encima no lo está, mueva el que está arriba
            if(me.tileGrid[i][j] == null && me.tileGrid[i][j-1] != null)
            {
               // Mueve el mosaico de arriba hacia abajo uno
                var tempTile = me.tileGrid[i][j-1];
                me.tileGrid[i][j] = tempTile;
                me.tileGrid[i][j-1] = null;
 
                me.game.add.tween(tempTile).to({y:(me.tileHeight*j)+(me.tileHeight/2)}, 200, Phaser.Easing.Linear.In, true);
 
              // Las posiciones han cambiado, así que comienza este proceso nuevamente desde la parte inferior
                // NOTA: Esto no está configurado en me.tileGrid [i] .length - 1 porque se reducirá inmediatamente como
                // estamos al final del ciclo.
                j = me.tileGrid[i].length;
            }
        }
    }
 
},
	getMatches: function(tileGrid){
 
	    var matches = [];
	    var groups = [];
	 
	
// Verificar si hay coincidencias horizontales
	    for (var i = 0; i < tileGrid.length; i++)
	    {
	        var tempArr = tileGrid[i];
	        groups = [];
	        for (var j = 0; j < tempArr.length; j++)
	        {
	            if(j < tempArr.length - 2)
	                if (tileGrid[i][j] && tileGrid[i][j + 1] && tileGrid[i][j + 2])
	                {
	                    if (tileGrid[i][j].tileType == tileGrid[i][j+1].tileType && tileGrid[i][j+1].tileType == tileGrid[i][j+2].tileType)
	                    {
	                        if (groups.length > 0)
	                        {
	                            if (groups.indexOf(tileGrid[i][j]) == -1)
	                            {
	                                matches.push(groups);
	                                groups = [];
	                            }
	                        }
	 
	                        if (groups.indexOf(tileGrid[i][j]) == -1)
	                        {
	                            groups.push(tileGrid[i][j]);
	                        }
	                        if (groups.indexOf(tileGrid[i][j+1]) == -1)
	                        {
	                            groups.push(tileGrid[i][j+1]);
	                        }
	                        if (groups.indexOf(tileGrid[i][j+2]) == -1)
	                        {
	                            groups.push(tileGrid[i][j+2]);
	                        }
	                    }
	                }
	        }
	        if(groups.length > 0) matches.push(groups);
	    }
	 
	
// Verificar si hay coincidencias verticales
	    for (j = 0; j < tileGrid.length; j++)
	    {
	        var tempArr = tileGrid[j];
	        groups = [];
	        for (i = 0; i < tempArr.length; i++)
	        {
	            if(i < tempArr.length - 2)
	                if (tileGrid[i][j] && tileGrid[i+1][j] && tileGrid[i+2][j])
	                {
	                    if (tileGrid[i][j].tileType == tileGrid[i+1][j].tileType && tileGrid[i+1][j].tileType == tileGrid[i+2][j].tileType)
	                    {
	                        if (groups.length > 0)
	                        {
	                            if (groups.indexOf(tileGrid[i][j]) == -1)
	                            {
	                                matches.push(groups);
	                                groups = [];
	                            }
	                        }
	 
	                        if (groups.indexOf(tileGrid[i][j]) == -1)
	                        {
	                            groups.push(tileGrid[i][j]);
	                        }
	                        if (groups.indexOf(tileGrid[i+1][j]) == -1)
	                        {
	                            groups.push(tileGrid[i+1][j]);
	                        }
	                        if (groups.indexOf(tileGrid[i+2][j]) == -1)
	                        {
	                            groups.push(tileGrid[i+2][j]);
	                        }
	                    }
	                }
	        }
	        if(groups.length > 0) matches.push(groups);
	    }
	 
	    return matches;
	 
	},

	removeTileGroup: function(matches){
	 
	    var me = this;
	 
	    // Pasa por todas las coincidencias y elimina las fichas asociadas
	    for(var i = 0; i < matches.length; i++){
	        var tempArr = matches[i];
	 
	        for(var j = 0; j < tempArr.length; j++){
	 
	            var tile = tempArr[j];
	            // Encuentra dónde vive este azulejo en la grilla teórica
	            var tilePos = me.getTilePos(me.tileGrid, tile);
	 
	         // Eliminar el mosaico de la pantalla
	            me.tiles.remove(tile);

	          // Aumenta la puntuación de los usuarios
            	me.incrementScore();
	 
	 			// Eliminar el mosaico de la grilla teórica
	            if(tilePos.x != -1 && tilePos.y != -1){
	                me.tileGrid[tilePos.x][tilePos.y] = null;
	            }
	 
	        }
	    }
	},
	getTilePos: function(tileGrid, tile)
	{
	    var pos = {x:-1, y:-1};
	 
	 // Encuentra la posición de un mosaico específico en la grilla
	    for(var i = 0; i < tileGrid.length ; i++)
	    {
	        for(var j = 0; j < tileGrid[i].length; j++)
	        {
	           // Hay una coincidencia en esta posición, así que devuelve los coords de la grilla
	            if(tile == tileGrid[i][j])
	            {
	                pos.x = i;
	                pos.y = j;
	                break;
	            }
	        }
	    }
	 
	    return pos;
	},
	createScore: function(){
 
	    var me = this;
	    var scoreFont = "100px Arial";
	 
	    me.scoreLabel = me.game.add.text((Math.floor(me.tileGrid[0].length / 2) * me.tileWidth), me.tileGrid.length * me.tileHeight, "0", {font: scoreFont, fill: "#fff"});
	    me.scoreLabel.anchor.setTo(0.5, 0);
	    me.scoreLabel.align = 'center';
	 
	},
	 
	incrementScore: function(){
	 
	    var me = this;
	 
	    me.score += 10;  
	    $("#score-text").text(me.score);     
	 
	},

};

