class Game 
{
  constructor() {}

  //tela inicial de cadastro do jogador
  start() 
  {
    form = new Form();
    form.display();
    player = new Player();
    //playerCount
  }

  //trazer a informação do gameState do banco de dados para o VSCode
  getState(){
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data){
      gameState = data.val();
    })
  }


}
