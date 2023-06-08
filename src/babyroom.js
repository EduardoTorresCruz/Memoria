class BabyRoom extends GameScene {
    constructor() {
        super('babyroom', 'BabyRoom')
    }

    preload() {
        // this.load.path = '/assets/' // <- for local
        this.load.path = '/Memoria/assets/' // <- for github
        this.load.image('BabyRoomOn', 'Babyroom/babyRoomOn.png')
        this.load.image('BabyRoomOff', 'Babyroom/babyRoomOff.png')
        this.load.audio('creak', 'sounds/creak.mp3')
        this.load.audio('lullaby', 'sounds/lullaby.wav')

        // this.load.image('lighton', 'Buttons/Light switch on.png')
        // this.load.image('lightoff', 'Buttons/Light switch off.png')
        // this.load.image('player', 'Delilah.png')
        // this.load.image('Mother', 'Mother.png')
        // this.load.image('ClosedDoor', 'Bathroom/Bathroom door.png')
        // this.load.image('Opendoor', 'Door.png')
        // this.load.audio('switchon', 'sounds/LIGHT SWITCH ON SOUND.mp3')
        // this.load.audio('switchoff', 'sounds/LIGHT SWITCH OFF SOUND.mp3')
        this
    }

    interact(player, object) {
        if (object == this.livingroom) {
            this.creak.play()
            this.lullaby.stop()
            this.gotoLivingScene('livingroom', {x:315, y:485})
        }
        if (object == this.record) {
            this.showMessage(this.recordMsg)
            if (this.light == 0) this.gainItem('Broken Record')
            else this.gainItem('Refurbished Record')
        }
        if (this.hasItem('Baby Crying Clue') && this.hasItem('Broken Record') && this.hasItem('Refurbished Record') && this.hasItem("Mother's Diary")) {
            this.lullaby.stop()
            this.creak.play()
            this.gotoScene('outro')
        }
    }

    onEnter() {
        this.creak = this.sound.add('creak').setVolume(0.25)
        this.lullaby = this.sound.add('lullaby').setVolume(0.15)
        this.lullaby.loop = true
        this.lullaby.play()

        this.roomOn = this.physics.add.sprite(game.config.width/2-208, game.config.height/2, 'BabyRoomOn').setScale(0.7).setImmovable(true);
        this.roomOff = this.physics.add.sprite(game.config.width/2-208, game.config.height/2, 'BabyRoomOff')
            .setScale(0.7)
            .setVisible(false)
            .setImmovable(true);
        
        this.lightOn = this.add.image(this.w-4*this.s, this.h-6*this.s, 'lighton')
            .setScale(0.1)
        this.lightOff = this.add.image(this.w-2*this.s, this.h-6*this.s, 'lightoff')
            .setScale(0.1)

        this.switchOn = this.sound.add('switchon').setVolume(0.25)
        this.switchOff = this.sound.add('switchoff').setVolume(0.25)

        this.record = this.add.rectangle(game.config.width/2.4, game.config.height/2.1, 200, 280, 0xFFFFFF, 0.5)
        this.physics.add.existing(this.record)
        this.record.setVisible(false)

        this.recordinterMsg = "A teddy bear"
        this.recordMsg = "It seems to be a record of your baby brother's favorite lullaby."

        this.recordinter = this.add.text(game.config.width/2.4, game.config.height/2.2, '     \n     \n     \n     ')
            .setFontSize(50)
            .setOrigin(0.5)
            .setInteractive({useHandCursor:true})
            .on('pointerover', () => this.showMessage(this.recordinterMsg))

        this.screenTint = this.add.rectangle(0, 0, this.w-500, this.h, 0x000000, 0.5)
            .setOrigin(0, 0)
            .setVisible(false)

            
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
                    this.roomOn.body.enable = false;
                    this.roomOff.body.enable = true;
                    this.recordinterMsg = "A coffin"
                    this.recordMsg = "There was a hidden record. It seems to have been smashed into pieces."
                    this.lullaby.stop()
                } else {
                    this.switchOn.play()
                    this.lightOff.setVisible(false)
                    this.lightOn.setVisible(true)
                    this.light = 1
                    this.screenTint.setVisible(false)
                    this.roomOff.setVisible(false)
                    this.roomOn.setVisible(true)
                    this.roomOn.body.enable = true;
                    this.roomOff.body.enable = false;
                    this.recordinterMsg = "A teddy bear"
                    this.recordMsg = "There was a hidden record. It seems to be a record of your baby brother's favorite lullaby."
                    this.lullaby.play()
                }
            });
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = new Player(this, 325, 235);
        this.input.on('pointerdown', this.player.movePlayer, this.player);

        this.livingroom = this.add.rectangle(game.config.width/5.85, game.config.height/10, 100, 125, 0xFFFFFF, 0.5)
        this.physics.add.existing(this.livingroom)
        this.livingroom.setVisible(false)
        this.livingroominter = this.add.text(game.config.width/5.85, game.config.height/10, '     ')
            .setFontSize(30)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('Livingroom door'))

        this.physics.add.overlap(this.player, this.livingroom, this.interact, null, this)
        this.physics.add.overlap(this.player, this.record, this.interact, null, this)
    }

    update() {
        this.player.update(this.cursors);
    }
}
