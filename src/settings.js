class Settings extends Phaser.Scene {
    constructor() {
        super('settings')
    }

    preload() {
        this.load.path = '../assets/'
        this.load.image('exit', 'Buttons/Exit button.png')
        this.load.audio('page', 'sounds/page.mp3')
    }

    create() {
        this.cameras.main.setBackgroundColor('#444')

        this.page = this.sound.add('page').setVolume(0.25)

        this.musicToggle = this.add.text(game.config.width/2, game.config.height/2.1, "Toggle sound 🔈")
            .setColor(0xFFFFFF)
            .setOrigin(0.5)
            .setStyle({ fontSize: 50 })
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.musicToggle.setFontSize(55))
            .on('pointerout', () => this.musicToggle.setFontSize(50))
            .on('pointerdown', () => {
                if (game.sound.mute) {
                    game.sound.mute = false
                    this.musicToggle.setText("Toggle sound 🔈")
                } else {
                    game.sound.mute = true
                    this.musicToggle.setText("Toggle sound 🔇")
                }
            });
        
        this.exit = this.add.image(game.config.width/2, game.config.height/3.5, 'exit')
            .setOrigin(0.5)
            .setScale(0.5)

        this.exitinter = this.add.text(game.config.width/2, game.config.height/1.75, '     ')
            .setOrigin(0.5)
            .setFontSize(50)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.exit.setScale(0.55))
            .on('pointerout', () => this.exit.setScale(0.5))
            .on('pointerdown', () => {
                this.page.play()
                this.time.delayedCall(75, () => this.scene.start('title'))
            })
    }
}