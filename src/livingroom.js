class LivingRoom extends GameScene {
    constructor() {
        super('livingroom', 'LivingRoom')
    }

    preload() {
        this.load.path = '/assets/' // <- for local
        // this.load.path = '/CMPM-Final-Project/assets/' // <- for github
        this.load.image('lighton', 'Buttons/Light switch on.png')
        this.load.image('lightoff', 'Buttons/Light switch off.png')
        this.load.image('bg', 'Background/Background.png')
        this.load.image('Delilah', 'Delilah.png')
        this.load.image('Mother', 'Mother.png')
        this.load.image('RoomOn', 'LivingRoom/LivingRoomLightON.png')
        this.load.image('RoomOff', 'LivingRoom/LivingRoomLightOFF.png')
        this.load.image('doorVert', 'Bathroom/Bathroom door.png')
        this.load.image('doorHori', 'Door.png')
        this.load.audio('switchon', 'sounds/LIGHT SWITCH ON SOUND.mp3')
        this.load.audio('switchoff', 'sounds/LIGHT SWITCH OFF SOUND.mp3')
        this.load.audio('page', 'sounds/page.mp3')
        this.load.audio('bgm', 'sounds/ambience.wav')
        this.load.audio('cry', 'sounds/mom crying.mp3')
        this.load.audio('creak', 'sounds/creak.mp3')
    }

    onEnter() {
        this.roomOn = this.add.image(game.config.width/2-208, game.config.height/2, 'RoomOn').setScale(0.5)
        this.roomOff = this.add.image(game.config.width/2-208, game.config.height/2, 'RoomOff')
            .setScale(0.5)
            .setVisible(false)

        this.yardDoor = this.add.image(game.config.width/1.34, game.config.height/1.84, 'doorVert').setScale(0.5)
        this.bedroomDoor = this.add.image(game.config.width/6.1, game.config.height/1.84, 'doorVert').setScale(0.5)
        this.bathroomDoor1 = this.add.image(game.config.width/7.05, game.config.height/1.85, 'doorHori').setScale(0.5)
        this.bathroomDoor2 = this.add.image(game.config.width/6.1, game.config.height/1.42, 'doorHori').setScale(0.5)

        this.frameMsg = 'A picture of a family of 4. They seem so happy.'
        this.frame = this.add.text(game.config.width/2.07, 50, '            \n            \n            \n            ')
            .setFontSize(40)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('A family portrait'))
            .on('pointerdown', () => this.showMessage(this.frameMsg))

        // this.tvMsg = ''
        // this.tv = 

        // this.yard = this.add.text(game.config.width)

        // this.bathroom1 = 

        // this.bathroom2 = 

        // this.bedroom = 

        this.add.text(200, 700, 'go to test 1')
            .setFontSize(50)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => this.gotoScene('test1'))

        this.lightOn = this.add.image(this.w-4*this.s, this.h-6*this.s, 'lighton').setScale(0.1)
        this.lightOff = this.add.image(this.w-2*this.s, this.h-6*this.s, 'lightoff').setScale(0.1)

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
                    this.roomOn.setVisible(false)
                    this.roomOff.setVisible(true)
                    this.frameMsg = "A picture of a family of 4. The father's and baby's eyes are crossed out."
                } else {
                    this.switchOn.play()
                    this.lightOff.setVisible(false)
                    this.lightOn.setVisible(true)
                    this.light = 1
                    this.screenTint.setVisible(false)
                    this.roomOff.setVisible(false)
                    this.roomOn.setVisible(true)
                    this.frameMsg = 'A picture of a family of 4. They seem so happy.'
                }
            });
    }
}
