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
    //playerCount
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
