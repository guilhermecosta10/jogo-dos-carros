class Game 
{
  constructor() {}

  //tela inicial de cadastro do jogador
  start() 
  {
    form = new Form();
    form.display();
    player = new Player();
    playerCount = player.getCount();

    carro1 = createSprite(width/2-50,height-100);
    carro1.addImage("car1", carro1Img);
    carro1.scale = 0.07;

    carro2 = createSprite(width/2+100,height-100);
    carro2.addImage("car2", carro2Img);
    carro2.scale = 0.07;

    carros = [carro1,carro2];
    //          0       1

  }

  //transição de telas
  handleElements(){
    form.hide();
    form.titleImg.position(40,50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  //jogo começa
  play(){

    this.handleElements();
    Player.getPlayersInfo();
    
    if(allPlayers != undefined){
      //mostra a pista
      image(pista,0, -height*5, width, height*6);

      var index = 0;
      for(var plr in allPlayers){
        index = index + 1;
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        carros[index-1].position.x = x;
        carros[index-1].position.y = y;
      }

      this.playerControl();

      //mostra os sprites
      drawSprites();
    }

   
  }

  //mover o carro
  playerControl(){
    if(keyIsDown(UP_ARROW)){
      player.positionY +=10;
      player.update();
    }
  }

  //atualizar o game state
  updateState(state)
  {
    database.ref("/").update({
      gameState : state   
    });
  }

  //trazer a informação do gameState do banco de dados para o VSCode
  getState()
  {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data){
    gameState = data.val();
    })
  }


}
