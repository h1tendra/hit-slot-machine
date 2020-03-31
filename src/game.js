let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 656,
    scene: [PreloadGame, PlayGame]
};

let game = new Phaser.Game(config);
