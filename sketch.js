var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount;
var gameState;
var pista;
var carro1
var carro2;
var carro1Img;
var carro2Img;

function preload() 
{
  backgroundImage = loadImage("./assets/planodefundo.png");
  pista = loadImage ("./assets/track2.png");
  carro1Img = loadImage("./assets/car1.png");
  carro2Img = loadImage("./assets/car2.png");
}

function setup() 
{
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

}

function draw() 
{
  background(backgroundImage);
  if (playerCount == 2) 
  {
    game.updateState(1);
  }

  if (gameState == 1) 
  {
    console.log ("gameState 1")
  }
}

function windowResized() 
{
  resizeCanvas(windowWidth, windowHeight);
}


