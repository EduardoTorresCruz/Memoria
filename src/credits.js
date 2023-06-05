class Credits extends Phaser.Scene {
    constructor() {
        super('credits')
    }

    create() {
        this.cameras.main.fadeIn(1000);
        this.add.text(game.config.width/2, game.config.height/2, 'Thank You For Playing!\n\n       Credits:\n     Julian Lara\n Elyzza Joyce Marquez\n      Xing Zhong\n Eduardo Torres Cruz')
            .setFontSize(100)
            .setOrigin(0.5)
    }
}