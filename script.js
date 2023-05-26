class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }

    preload() {

    }

    create() {

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
    scene: [Intro],
    title: "Final Project",
});
