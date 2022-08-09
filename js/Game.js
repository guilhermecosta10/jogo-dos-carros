class Game 
{
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leaderboardTitle = createElement("h2");
    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");

    this.playerMoving = false;
    this.leftKeyActive = false;
  }

  //tela inicial de cadastro do jogador
  start() 
  {
    form = new Form();
    form.display();
    player = new Player();
    playerCount = player.getCount();

    //criação dos sprites dos carros
    carro1 = createSprite(width/2-50,height-100);
    carro1.addImage("car1", carro1Img);
    carro1.scale = 0.07;

    carro2 = createSprite(width/2+100,height-100);
    carro2.addImage("car2", carro2Img);
    carro2.scale = 0.07;

    //matriz dos carros
    carros = [carro1,carro2];
    //          0       1

    //criação dos grupos de sprites
    fuels = new Group();
    powerCoins = new Group();
    obstaclesGroup = new Group();


    var obstaclesPositions = [
      { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
      { x: width / 2, y: height - 2800, image: obstacle2Image },
      { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
      { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
      { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
      { x: width / 2, y: height - 5300, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 5500, image: obstacle2Image }
    ];


    //adicionando os sprites
    this.addSprites(fuels,9,fuelsImg,0.02);
    this.addSprites(powerCoins,13,powerCoinsImg,0.08);
    this.addSprites(obstaclesGroup, obstaclesPositions.length, obstacle2Image, 0.04, obstaclesPositions);
  }

  //transição de telas
  handleElements(){
    form.hide();
    form.titleImg.position(40,50);
    form.titleImg.class("gameTitleAfterEffect");

    this.resetTitle.html("Reiniciar Jogo");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width/2 + 200, 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width/2 + 230, 100);

    this.leaderboardTitle.html("Placar");
    this.leaderboardTitle.class("leadersText");
    this.leaderboardTitle.position(width/3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width/3 - 50, 80);

    this.leader2.class("leadersText");
    this.leader2.position(width/3 - 50, 130);

  }

  //função para exibir o placar
  showLeaderboard(){
    var leader1, leader2;
    var players = Object.values(allPlayers);
    if((players[0].rank === 0 && players[1].rank === 0) || players[0].rank === 1){

      leader1 = 
      players[0].rank + 
      "&emsp;" + 
      players[0].name + 
      "&emsp;" + 
      players[0].score;

      leader2 = 
      players[1].rank + 
      "&emsp;" + 
      players[1].name + 
      "&emsp;" + 
      players[1].score;
    }

    if(players[1].rank === 1){
      leader1 = 
      players[1].rank + 
      "&emsp;" + 
      players[1].name + 
      "&emsp;" + 
      players[1].score;

      leader2 = 
      players[0].rank + 
      "&emsp;" + 
      players[0].name + 
      "&emsp;" + 
      players[0].score;
    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);

  }

  //jogo começa
  play()
  {
    this.handleElements();
    Player.getPlayersInfo(); // função estática
    player.getCarsAtEnd();
    this.buttonReset();
    
    if(allPlayers != undefined){
      //mostra a pista
      image(pista,0, -height*5, width, height*6);
      //mostra o placar
      this.showLeaderboard();
      //mostrar barra de vidas
      this.showLife();
      //mostrar barra de combustível
      this.showFuel();
      
      var index = 0;
      for(var plr in allPlayers){
        index = index + 1;
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        carros[index-1].position.x = x;
        carros[index-1].position.y = y;

        if(index == player.index) 
        {
          fill("#ff0000");
          stroke(10);
          ellipse(x,y,60);
          camera.position.y = carros[index-1].position.y;
          this.collectFuels(index);
          this.collectCoins(index);
          this.obstaclesCollision(index);
        }
      }

      this.playerControl();

      //verificar se os carros passaram pela linha de chegada
      const finishLine = height*6 - 100;
      if(player.positionY > finishLine){
        player.rank += 1;
        Player.updateCarsAtEnd(player.rank);
        player.update();
        gameState = 2;
        this.showRank();
      }

      //mostra os sprites
      drawSprites();
    }

  }

  //exibir a barra de vida
  showLife()
  {
    push();
    image(lifeImg, width/2 - 130, height -  player.positionY - 400, 20,20);
    fill("white");
    rect(width/2 - 100, height -  player.positionY - 400, 185, 20);
    fill("red");
    rect(width/2 - 100, height -  player.positionY - 400, player.life, 20);
    pop();
  }
 

  //exibir a barra de combustíveis
  showFuel()
  {
    push();
    image(fuelsImg, width/2 - 130, height -  player.positionY - 350, 20,20);
    fill("white");
    rect(width/2 - 100, height -  player.positionY - 350, 185, 20);
    fill("yellow");
    rect(width/2 - 100, height -  player.positionY - 350, player.fuel, 20);
    pop();
  }
  

  //sweet alert se cruzar a linha de chegada
  showRank(){
    swal({
      title: `Incrível! ${"\n"}Rank ${"\n"} ${player.rank}º Lugar`,
      text: "Você alcançou a linha de chegada",
      imageUrl: "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "Ok",
    });
  }

  //adicionar os sprites no jogo
  addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = [])
  {
    //laço de repetição para criar vários sprites
    for(var i=0; i < numberOfSprites; i++)
    {
      //posições aleatórias
      var x,y;

      if(positions.length > 0) 
      {
        x = positions[i].x;
        y = positions[i].y;
        spriteImage = positions[i].image;
      }

      else
      {
        x = random(width/2 - 150, width/2 + 150);
        y = random(-height*4.5, height - 400);
      }

      //criação do sprite
      var sprite = createSprite(x,y);
      //adicionando a image
      sprite.addImage("sprite", spriteImage);
      //definindo o tamanho
      sprite.scale = scale;
      //adicionando no grupo
      spriteGroup.add(sprite);

    }
  }

  //mover o carro
  playerControl(){
    if(keyIsDown(UP_ARROW))
    {
      player.positionY +=10;
      player.update();
      this.playerMoving = true;
    }

    if(keyIsDown(LEFT_ARROW) && player.positionX > width/3 -50)
    {
      this.leftKeyActive = true;
      player.positionX -= 10;
      player.update();
    }

    if(keyIsDown(RIGHT_ARROW) && player.positionX < width/2 +300)
    {
      this.leftKeyActive = false;
      player.positionX += 10;
      player.update();
    }

  }

  //colisão com obstáculos
  obstaclesCollision(index){
    if(carros[index-1].collide(obstaclesGroup)){
      if(this.leftKeyActive){
        player.positionX +=100;
      }
      else{
        player.positionX -=100;
      }
      if(player.life > 0){
        player.life -= 185/4;
      }
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


  //configuração do botão de reset
  buttonReset() 
  {
    this.resetButton.mousePressed(()=>{
      database.ref("/").set({
        gameState : 0,
        playerCount : 0,
        players : {}, 
        carsAtEnd: 0,
      });
      window.location.reload();
    });
  }

  //coletar combustível
  collectFuels(index)
  {
    carros[index -1].overlap(fuels, function(collector, collected){
      player.fuel = 80
      collected.remove();
    })

    if(player.fuel > 0 && this.playerMoving) 
    {
      player.fuel -= 10;
    }

  }
  
  //coletar moedas
  collectCoins(index) 
  {
    carros[index -1].overlap(powerCoins, function(collector, collected){
      player.score += 5
      collected.remove();
      player.update();
    })
  }


}



