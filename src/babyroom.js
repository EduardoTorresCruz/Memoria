class BabyRoom extends GameScene {
    constructor() {
        super('babyroom', 'BabyRoom')
    }

    preload() {
        this.load.path = '/assets/' // <- for local
        // this.load.path = '/CMPM-Final-Project/assets/' // <- for github
        this.load.image('BabyRoomOn', 'Babyroom/babyRoomOn.png')
        this.load.image('BabyRoomOff', 'Babyroom/babyRoomOFF.png')
        this.load.audio('creak', 'sounds/creak.mp3')

        // this.load.image('lighton', 'Buttons/Light switch on.png')
        // this.load.image('lightoff', 'Buttons/Light switch off.png')
        // this.load.image('player', 'Delilah.png')
        // this.load.image('Mother', 'Mother.png')
        // this.load.image('ClosedDoor', 'Bathroom/Bathroom door.png')
        // this.load.image('Opendoor', 'Door.png')
        // this.load.audio('switchon', 'sounds/LIGHT SWITCH ON SOUND.mp3')
        // this.load.audio('switchoff', 'sounds/LIGHT SWITCH OFF SOUND.mp3')
    }

    interact(player, object) {
        if (object == this.livingroom) {
            this.creak.play()
            this.showMessage('implement go to scene living room')
            this.gotoLivingScene('livingroom', {x:315, y:485})
        }
    }

    onEnter() {
        this.creak = this.sound.add('creak').setVolume(0.25)

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
                    this.frameMsg = "A picture of a family of 4. The father's and baby's eyes are crossed out."
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
                    this.frameMsg = 'A picture of a family of 4. They seem so happy.'
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
    }

    update() {
        this.player.update(this.cursors);
    }
}
