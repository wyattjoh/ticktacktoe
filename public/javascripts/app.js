(function() {

  var app = angular.module('tictactoe', []);

  app.factory('PlayerFactory', function() {
    var Player = function(name, color) {
      this.Name = name;
      this.Color = color;

      this.Style = {
        "background": color,
        "color": "white"
      };
    };

    return Player;
  });

  app.service('PlayersService', function(PlayerFactory) {
    var Player = this;

    Player.players = [];
    Player.currentPlayerIndex = null;

    Player.CreatePlayer = function(name, color) {
      var player = new PlayerFactory(name, color);
      Player.players.push(player);
      return player;
    };

    Player.GetPlayers = function() {
      return Player.players;
    };

    Player.Start = function() {
      if (Math.random() > 0.5) {
        Player.currentPlayerIndex = 0;
      } else {
        Player.currentPlayerIndex = 1;
      }
    };

    Player.GetCurrentPlayer = function() {
      return Player.players[Player.currentPlayerIndex];
    };

    Player.NextTurn = function() {
      Player.currentPlayerIndex = Player.currentPlayerIndex ^ 1;
    }
  });

  app.service('GridService', function(PlayersService) {

  });

  app.controller('GridCtrl', function(GridService, PlayersService) {
    var vm = this;

    vm.Cells = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    vm.Style = [];

    for (var i = 0; i < 9; i++) {
      vm.Style.push({
        "background": "black",
        "color": "white"
      });
    }

    vm.ClickedCell = function(cell) {
      vm.Style[cell - 1] = PlayersService.GetCurrentPlayer().Style;

      PlayersService.NextTurn();
    };
  });

  app.controller('GameCtrl', function(PlayersService) {
    var vm = this;

    vm.IsOn = false;
    vm.CurrentPlayer = null;

    vm.Players = PlayersService.GetPlayers();
    vm.GetCurrentPlayer = PlayersService.GetCurrentPlayer;

    vm.NewPlayer = {
      name: "",
      color: ""
    };

    vm.CreatePlayer = function() {
      PlayersService.CreatePlayer(vm.NewPlayer.name, vm.NewPlayer.color);
      vm.NewPlayer.name = "";
      vm.NewPlayer.color = "";
    };

    vm.createPlayer = function(name, color) {
      vm.NewPlayer = {
        name: name,
        color: color
      };
      vm.CreatePlayer();
    };

    vm.createPlayer("wyatt", "red");
    vm.createPlayer("michal", "blue");

    vm.Start = function() {
      vm.IsOn = true;
      PlayersService.Start();
    };

    vm.CanStart = function() {
      return vm.Players.length == 2;
    }
  });

})();
