class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }

    preload() {

    }

    create() {
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.scene.start('title'))
        });
    }
}

class Title extends Phaser.scene {
    constructor() {
        super('title')
    }

    preload() {

    }

    create() {
        this.add.text(game.config.width/2, game.config.height/2, 'title will go here')
    }
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    type: Phaser.AUTO,
    scene: [Intro, Title],
    title: "Final Project",
});
