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
                this.cameras.main.fade(1000, 0, 0, 0);
                this.time.delayedCall(1000, () => this.scene.start('title'))
            });
    }
}

class Title extends Phaser.Scene {
    constructor() {
        super('title')
    }

    preload() {

    }

    create() {
        this.add.text(game.config.width/2, game.config.height/2, 'title will go here\nalso click to continue to next scene')
            .setFontSize(50)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.cameras.main.fade(1000, 0, 0, 0);
                this.time.delayedCall(1000, () => this.scene.start('test'))
            });
    }
}

class Test extends GameScene {
    constructor() {
        super('test', 'Test');
    }

    preload() {

    }

    onEnter() {
        this.add.text(game.config.width/2, game.config.height/2, 'click here to go back to intro')
            .setFontSize(50)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => this.gotoScene('intro'))
    }
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1900,
        height: 1000
    },
    type: Phaser.AUTO,
    scene: [Intro, Title, Test],
    title: "Final Project",
});
