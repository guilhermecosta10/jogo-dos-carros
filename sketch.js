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
var carros;
var allPlayers;
var fuels, powerCoins;
var fuelsImg, powerCoinsImg, lifeImg;
var obstacle1Image, obstacle2Image;
var obstaclesGroup;
var explosionImg;

function preload() 
{
  backgroundImage = loadImage("./assets/planodefundo.png");
  pista = loadImage ("./assets/track2.jpg");
  carro1Img = loadImage("./assets/car1.png");
  carro2Img = loadImage("./assets/car2.png");
  fuelsImg = loadImage("assets/fuel.png");
  powerCoinsImg = loadImage("assets/goldCoin.png");
  obstacle1Image = loadImage("assets/obstacle1.png");
  obstacle2Image = loadImage("assets/obstacle2.png");
  lifeImg = loadImage("assets/life.png");
  explosionImg = loadImage("assets/blast.png");
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
    console.log ("gameState 1");
    game.play();
  }

  if(gameState == 2) 
  {
    game.End();
    game.showLeaderboard();
  }
  

}

function windowResized() 
{
  resizeCanvas(windowWidth, windowHeight);
}


