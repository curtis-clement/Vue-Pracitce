new Vue({
  el: '#app',
  data: {
    playersHealth: 100,
    monstersHealth: 100,
    gameRunning: false,
    turns: []
  },
  methods: {
    startGame: function(){
      this.gameRunning = true;
      this.playersHealth = 100;
      this.monstersHealth = 100;
      this.turns = [];
    },
    attack: function() {
      const damage = this.calculateDamage(3, 10)
      this.monstersHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player attacks Monster for ' + damage
      });
      if(this.checkWin()){
        return;
      }
      this.monsterAttack();
    },
    specialAttack: function() {
      const damage = this.calculateDamage(10, 15)
      this.monstersHealth -= damage
      this.turns.unshift({
        isPlayer: true,
        text: 'Player attacks Monster for extra damage - ' + damage
      });
      if(this.checkWin()){
        return;
      }
      this.monsterAttack();
    },
    heal: function() { 
      if(this.playersHealth <= 93){
        this.playersHealth += 7
      } else {
        this.playersHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: 'Player heals for 7'
      });
      this.monsterAttack();
    },
    giveUp: function() {
      this.gameRunning = false;
    },
    monsterAttack: function() {
      const damage = this.calculateDamage(5, 12)
      this.playersHealth -= damage
      this.turns.unshift({
        isPlayer: false,
        text: 'Moster attacks Player for ' + damage
      })
      this.checkWin();
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.ceil(Math.random() * max), min)
    },
    checkWin: function() {
      if(this.monstersHealth <= 0) {
        if(confirm('You won! Play a new game?')) {
          this.startGame();
        } else {
          this.gameRunning = false;
        }
        return true;
      } else if(this.playersHealth <= 0) {
        if(confirm('You lost! Play a new game?')) {
          this.startGame();
        } else {
          this.gameRunning = false;
        }
        return true;
      }
      return false;
    }
  }
})