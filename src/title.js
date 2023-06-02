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