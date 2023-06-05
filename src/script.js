class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
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

class Title extends Phaser.Scene {
    constructor() {
        super('title')
    }

    preload() {
        this.load.path = '/assets/' // local
        // this.load.path = '/CMPM-Final-Project/assets/' // github
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
        this.load.path = '/assets/' // local
        // this.load.path = '/CMPM-Final-Project/assets/' // github
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

class Test1 extends GameScene {
    constructor() {
        super('test1', 'Test1')
    }

    preload() {
        this.load.path = '/assets/' // <- for local
        // this.load.path = '/CMPM-Final-Project/assets/' // <- for github
        this.load.image('lighton', 'Buttons/Light switch on.png')
        this.load.image('lightoff', 'Buttons/Light switch off.png')
        this.load.audio('switchon', 'sounds/LIGHT SWITCH ON SOUND.mp3')
        this.load.audio('switchoff', 'sounds/LIGHT SWITCH OFF SOUND.mp3')
    }

    onEnter() {
        this.add.text(game.config.width/2, game.config.height/2, 'click here to go to test 2')
            .setFontSize(50)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => this.gotoScene('test2'))

        this.lightOn = this.add.image(this.w-4*this.s, this.h-6*this.s, 'lighton')
            .setScale(0.1)

        this.lightOff = this.add.image(this.w-2*this.s, this.h-6*this.s, 'lightoff')
            .setScale(0.1)

        this.switchOn = this.sound.add('switchon').setVolume(0.25)
        this.switchOff = this.sound.add('switchoff').setVolume(0.25)

        if(this.screenTint.setVisible(false)) {
            this.lightOff.setVisible(false)
        }
        else {
            this.lightOn.setVisible(false)
        }

        this.light = 1

        this.lightSwitchinter = this.add.text(this.w-3*this.s, this.h-8*this.s, '  \n  ')
            .setFontSize(`${(2 * this.s) - 10}px`)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('Toggle light switch?'))
            .on('pointerdown', () => {
                if (this.light == 1) {
                    this.switchOff.play()
                    this.lightOn.setVisible(false)
                    this.lightOff.setVisible(true)
                    this.light = 0
                    this.screenTint.setVisible(true)
                } else {
                    this.switchOn.play()
                    this.lightOff.setVisible(false)
                    this.lightOn.setVisible(true)
                    this.light = 1
                    this.screenTint.setVisible(false)
                }
            });
    }
}

class Test2 extends GameScene {
    constructor() {
        super('test2', 'Test2')
    }

    preload() {
        this.load.path = '/assets/' // local
        // this.load.path = '/CMPM-Final-Project/assets/' // github
        this.load.image('lighton', 'Buttons/Light switch on.png')
        this.load.image('lightoff', 'Buttons/Light switch off.png')
        this.load.audio('switchon', 'sounds/LIGHT SWITCH ON SOUND.mp3')
        this.load.audio('switchoff', 'sounds/LIGHT SWITCH OFF SOUND.mp3')
    }

    onEnter() {
        this.add.text(game.config.width/2, game.config.height/2, 'click here to go to intro')
            .setFontSize(50)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => this.gotoScene('intro'))

        this.lightOn = this.add.image(this.w-4*this.s, this.h-6*this.s, 'lighton')
            .setScale(0.1)

        this.lightOff = this.add.image(this.w-2*this.s, this.h-6*this.s, 'lightoff')
            .setScale(0.1)

        this.light;

        if(this.screenTint.setVisible(false)) {
            this.lightOff.setVisible(false)
            this.light = 1
        }
        else {
            this.lightOn.setVisible(false)
            this.light = 0
        }

        this.lightSwitchinter = this.add.text(this.w-3*this.s, this.h-8*this.s, '  \n  ')
            .setFontSize(`${(2 * this.s) - 10}px`)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('Toggle light switch?'))
            .on('pointerdown', () => {
                if (this.light == 1) {
                    this.lightOn.setVisible(false)
                    this.lightOff.setVisible(true)
                    this.light = 0
                    this.screenTint.setVisible(true)
                } else {
                    this.lightOff.setVisible(false)
                    this.lightOn.setVisible(true)
                    this.light = 1
                    this.screenTint.setVisible(false)
                }
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
    scene: [BabyRoom, Intro, Title, Settings, LivingRoom, BathRoom, Test1, Test2],
    title: "Final Project",
});
