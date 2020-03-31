class PreloadGame extends Phaser.Scene {
    constructor() {
        super('loadGame');
    }

    preload() {
        this.load.image('slotbg', 'assets/images/slotbg.jpg');
        this.load.image('spinbtn', 'assets/images/spinbtn.png');
        this.load.spritesheet('diamonds', 'assets/sprites/diamonds32x24x5.png', { frameWidth: 32, frameHeight: 24 })
        this.load.atlas('lazer', 'assets/sprites/lazer.png', 'assets/sprites/lazer.json');
        this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
    }

    create() {
        this.add.text(550, 300, 'Loading.....', { fontSize: '32px', fill: '#FFF' });

        this.anims.create({
            key: 'blast',
            frames: this.anims.generateFrameNames('lazer', { prefix: 'lazer_', start: 0, end: 22, zeroPad: 2 }),
            repeat: 0,
        });

        this.time.addEvent({
            delay: 200,
            callback: function () {
                this.scene.start('playGame');
            },
            callbackScope: this,
            loop: false
        });
    }
}
