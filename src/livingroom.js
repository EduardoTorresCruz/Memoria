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
        this.load.image('player', 'Delilah.png')
        this.load.image('mother', 'Mother.png')
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
        this.bathroomDoor = this.add.image(game.config.width/7.05, game.config.height/1.85, 'doorHori').setScale(0.5)
        this.babyDoor = this.add.image(game.config.width/6.1, game.config.height/1.42, 'doorHori').setScale(0.5)

        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = new Player(this, 750, 1500);
        //this.mom = new Mom(this, 100, 100);
        this.input.on('pointerdown', this.player.movePlayer, this.player);

        this.frameMsg = 'A worn family picture. You and your family seem so happy.'
        // this.frame = this.add.rectangle(game.config.width/2.05, 160, 300, 10, 0xFFFFFF, 0.5)
        // this.physics.add(this.frame)
            // .setInteractive({useHandCursor: true})
            // .on('pointerover', () => this.showMessage('A family portrait'))
            // .on('pointerdown', () => this.showMessage(this.frameMsg))

        this.tvMsg = "The TV seems old and broken. It won't turn on."
        this.tv = this.add.text(game.config.width/1.95, game.config.height/1.675, '   \n   ')
            .setFontSize(25)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('A TV'))
            .on('pointerdown', () => this.showMessage(this.tvMsg))

        this.belt = this.add.text(game.config.width/1.96, game.config.height/2.37, '  ')
            .setFontSize(20)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('A belt'))
            .on('pointerdown', () => this.showMessage("A rolled up belt. For some reason it makes you shudder."))
            .setVisible(false)

        this.bottle = this.add.text(game.config.width/1.94, game.config.height/1.95, '   ')
            .setFontSize(20)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('A bottle'))
            .on('pointerdown', () => this.showMessage("A broken beer bottle. It looks like it may have been used as a weapon."))
            .setVisible(false)

        this.blood1 = this.add.text(game.config.width/2.2, game.config.height/1.9, '   \n   ')
            .setFontSize(30)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('A bloodstain'))
            .on('pointerdown', () => this.showMessage("A pool of blood. The blood seems fresh."))
            .setVisible(false)

        this.blood2 = this.add.text(game.config.width/1.8, game.config.height/2.15, '  \n  ')
            .setFontSize(30)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('A bloodstain'))
            .on('pointerdown', () => this.showMessage("A pool of blood. The blood seems fresh."))
            .setVisible(false)

        this.yard = this.add.text(game.config.width/1.465, game.config.height/2, ' \n \n ')
            .setFontSize(30)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('A door'))
            .on('pointerdown', () => this.gotoScene('masterbedroom'))

        // this.bathroom1 = 

        // this.babyroom = 

        // this.bedroom = 

        

        this.add.text(200, 700, 'go to test 1')
            .setFontSize(50)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => this.gotoScene('test1'))

        this.screenTint = this.add.rectangle(0, 0, this.w-500, this.h, 0x000000, 0.5)
            .setOrigin(0, 0)
            .setVisible(false)

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
                    this.frameMsg = "A much newer looking family picture. Your Father and baby brother are crossed out with blood."
                    this.tvMsg = "The TV is playing a show your baby brother used to love. It hasn't aired in 20 years."
                    this.belt.setVisible(true)
                    this.bottle.setVisible(true)
                    this.blood1.setVisible(true)
                    this.blood2.setVisible(true)
                } else {
                    this.switchOn.play()
                    this.lightOff.setVisible(false)
                    this.lightOn.setVisible(true)
                    this.light = 1
                    this.screenTint.setVisible(false)
                    this.roomOff.setVisible(false)
                    this.roomOn.setVisible(true)
                    this.frameMsg = 'A picture of a family of 4. They seem so happy.'
                    this.tvMsg = "The TV seems old and broken. It won't turn on."
                    this.belt.setVisible(false)
                    this.bottle.setVisible(false)
                    this.blood1.setVisible(false)
                    this.blood2.setVisible(false)
                }
            });
    }

    update() {
        this.player.update(this.cursors);
    }
}
