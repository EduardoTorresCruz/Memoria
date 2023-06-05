class Title extends Phaser.Scene {
    constructor() {
        super('title')
    }

    preload() {
        //this.load.path = '/assets/' // local
        this.load.path = 'Memoria/assets/' // github
        this.load.image('title', 'Names/Title.png')
        this.load.image('start', 'Buttons/Start button.png')
        this.load.image('options', 'Buttons/Options button.png')
        this.load.audio('page', 'sounds/page.mp3')
    }

    create() {
        this.cameras.main.setBackgroundColor('#444')

        this.page = this.sound.add('page').setVolume(0.25)

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
                this.page.play()
                this.time.delayedCall(100, () => this.scene.start('livingroom'))
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
                this.page.play()
                this.time.delayedCall(100, () => this.scene.start('settings'))
            })
    }
}

class Settings extends Phaser.Scene {
    constructor() {
        super('settings')
    }

    preload() {
        //this.load.path = '/assets/' // local
        this.load.path = '/Memoria/assets/' // github
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

        if (game.sound.mute) {
            this.musicToggle.setText("Toggle sound 🔇")
        }
        
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

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1900,
        height: 1000
    },
    physics: {
        default: 'arcade'
    },
    type: Phaser.AUTO,
    scene: [Title, Settings, LivingRoom, BathRoom, BabyRoom, Credits],
    title: "Final Project",
});
