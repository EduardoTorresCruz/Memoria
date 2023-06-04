const {Vector2} = Phaser.Math;

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }

    preload() {

    }

    create() {
        this.add.text(game.config.width/2, game.config.height/2, 'click to go to title')
            .setFontSize(50)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.time.delayedCall(75, () => this.scene.start('title'))
            });
    }
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1900,
        height: 1000
    },
    physics: {
        default: 'arcade',
        arcade: {debug: true}
    },
    type: Phaser.AUTO,
    scene: [Intro, Title, Settings, Test, Test2],
    title: "Final Project",
});
