"use strict";

var config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 656,
  scene: [PreloadGame, PlayGame]
};
var game = new Phaser.Game(config);