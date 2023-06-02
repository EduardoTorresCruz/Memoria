class Title extends Phaser.Scene {
    constructor() {
        super('title')
    }

    preload() {
        this.load.path = '../assets/'
        this.load.image('title', 'Names/Title.png')
        this.load.image('start', 'Buttons/Start button.png')
        this.load.image('options', 'Buttons/Options button.png')
    }

    create() {
        this.cameras.main.setBackgroundColor('#444')

        this.title = this.add.image(game.config.width/2, game.config.height/3, 'title')
            .setScale(0.5)
            .setOrigin(0.5)

        this.start = this.add.image(game.config.width/2, game.config.height/2.75, 'start')
            .setScale(0.5)
            .setOrigin(0.5)

        this.startinter = this.add.text(game.config.width/2, game.config.height/2.3, '       ')
            .setOrigin(0.5)
            .setFontSize(50)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.start.setScale(0.6))
            .on('pointerout', () => this.start.setScale(0.5))
            .on('pointerdown', () => {
                this.cameras.main.fade(1000, 0, 0, 0)
                this.time.delayedCall(1000, () => this.scene.start('test'))
            })
        
        this.options = this.add.image(game.config.width/2, game.config.height/2.5, 'options')
            .setScale(0.5)
            .setOrigin(0.5)

        this.optionsinter = this.add.text(game.config.width/2, game.config.height/1.8, '       ')
            .setOrigin(0.5)
            .setFontSize(50)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.options.setScale(0.55))
            .on('pointerout', () => this.options.setScale(0.5))
            .on('pointerdown', () => {
                this.time.delayedCall(75, () => this.scene.start('settings'))
            })
    }
}