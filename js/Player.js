class Player 
{
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
  }

  //inserir os players no banco de dados
  addPlayer(){
    var playerIndex = "players/player" + this.index;
    if(this.index === 1){
      this.positionX = width/2 - 100;
    }
    else{
      this.positionX = width/2 + 100;
    }
    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
    });
  }

  //atualizar a contagem dos players
  updateCount(count)
  {
    database.ref("/").update({
      playerCount: count   
    });
  }

  //trazer a informação do playerCount do banco de dados para o VSCode
  getCount()
  {
      var playerCountRef = database.ref("playerCount");
      playerCountRef.on("value", function(data){
        playerCount = data.val();
      })
  }

  //trazer as informações dos players para o jogo, para a variável allPlayers
  static getPlayersInfo(){
    var playerInfoRef = database.ref("players");
    playerInfoRef.on("value", data =>{
      allPlayers = data.val();
    })
  }

  //atualizar a posição do player no banco de dados
  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).update({
      positonX: this.positionX,
      positonY: this.positionY,
    });
  }


}
