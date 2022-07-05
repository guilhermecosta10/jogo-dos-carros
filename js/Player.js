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
  updateCount(count){
    database.ref("/").update({
      playerCount: count   
    });
  }

  //trazer a informação do playerCount do banco de dados para o VSCode
  getCount(){
    
  }


}
