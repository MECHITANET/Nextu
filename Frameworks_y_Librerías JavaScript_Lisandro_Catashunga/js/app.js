//Evento inicial
$(document).ready(function(){

	//Iniciamos el juego
	$(".btn-reinicio").click(function(){
			startGame();
			
	});
});



//---------Efecto de Cambio de color del Titulo---------
window.setInterval (BlinkIt, 1000);
var color = "red";
function BlinkIt () {
var blink = document.getElementById ("blink");
color = (color == "#ffffff")? "#ffff00" : "#ffffff";
blink.style.color = color;}



//---------INICIAMOS EL JUEGO---------------
function startGame()
{
	$(".btn-reinicio").text("Reiniciar");
	
	$("#timer").text("02:00"); //DEFINIMOS EL TIEMPO DEL JUEGO mm:ss

	startTime(); // iniciamos cuenta regresiva

  	game.state.add('principal', estadoPrincipal); //instanciamos la funcion de inicio el juego
	game.state.add("GameOver", estadoGameOver); //instanciamos la funcion del fin del juego
	game.state.start('principal'); //ejecutamos el juego
}
function GameOver(){
	game.state.start('GameOver'); //ejecutamos fin de juego.
}

